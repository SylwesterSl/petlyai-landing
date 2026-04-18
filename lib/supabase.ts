import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://mslnptcmvciwyxwqjvmi.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zbG5wdGNtdmNpd3l4d3Fqdm1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQxNzMzMTYsImV4cCI6MjA4OTc0OTMxNn0.8-6sGetqRaub5T-A0M5ttY5-ZKlNt2tCF1GKK85P_XY";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: false },
});
