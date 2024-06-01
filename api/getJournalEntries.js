const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://eugmxxtzlcdlrnosbowy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1Z214eHR6bGNkbHJub3Nib3d5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcwMDQzOTUsImV4cCI6MjAzMjU4MDM5NX0.TsfuVI_CDiXuiObg6GlToOlp37yGtWTLu3opXv_bB34';
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = async (req, res) => {
    const { data, error } = await supabase.from('JournalEntries').select('*');
    if (error) {
        return res.status(500).json({ error: error.message });
    }
    res.status(200).json(data);
};

