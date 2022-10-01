const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_PROJECT_URL,
  process.env.SUPABASE_PROJECT_ANON_API_KEY
);


module.exports = supabase;
