document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('/api/getJournalEntries');
    const journalData = await response.json();

    if (!journalData) {
        console.error('Failed to fetch journal data.');
        return;
    }

    // Get unique days
    const days = [...new Set(journalData.map(entry => entry.date))];
    
    // Create day navigation
    const dayNav = document.getElementById('dayNav');
    days.forEach(day => {
        const button = document.createElement('button');
        button.textContent = day;
        button.onclick = () => loadEntries(day, journalData);
        dayNav.appendChild(button);
    });

    // Load entries for the first day by default
    if (days.length > 0) {
        loadEntries(days[0], journalData);
    }

    // Load polarity chart
    loadPolarityChart(journalData);
});

function loadEntries(day, journalData) {
    const entriesDiv = document.getElementById('journalEntries');
    entriesDiv.innerHTML = '';

    const entries = journalData.filter(entry => entry.date === day);
    entries.forEach(entry => {
        const entryDiv = document.createElement('div');
        entryDiv.className = 'entry';
        entryDiv.innerHTML = `<h3>${entry.date}</h3><p>${entry.entry}</p><p>Mood: ${entry.mood}</p>`;
        entriesDiv.appendChild(entryDiv);
    });
}

function loadPolarityChart(journalData) {
    const polarityData = journalData.map(entry => ({
        date: entry.date,
        polarity: entry.polarity
    }));

    const ctx = document.getElementById('polarityChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: polarityData.map(data => data.date),
            datasets: [{
                label: 'Polarity',
                data: polarityData.map(data => data.polarity),
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: false,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Date'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Polarity'
                    }
                }
            }
        }
    });
}

