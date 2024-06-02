const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://eugmxxtzlcdlrnosbowy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1Z214eHR6bGNkbHJub3Nib3d5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcwMDQzOTUsImV4cCI6MjAzMjU4MDM5NX0.TsfuVI_CDiXuiObg6GlToOlp37yGtWTLu3opXv_bB34';
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = async (req, res) => {
    // console.log("fetching data for you from supabase");
    const { data, error } = await supabase.from('BudgetEntries').select('*');
    if (error) {
        // console.log("error occured", error.message);
        return res.status(500).json({ error: error.message });
    }
    // console.log("returning data", data);
    res.status(200).json(data);
};

