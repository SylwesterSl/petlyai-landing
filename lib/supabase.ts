import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://vncvpsobkgvpwcxzvsfr.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZuY3Zwc29ia2d2cHdjeHp2c2ZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzNDg5MTYsImV4cCI6MjA5MTkyNDkxNn0.5Ej8c7x_CNJJ4N_0QbbBSHEqDb4CHD3a1NzsXDpezvM";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: false },
});
