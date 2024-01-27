import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://shahwfhuupmevvymbflq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNoYWh3Zmh1dXBtZXZ2eW1iZmxxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYzNjI3NDgsImV4cCI6MjAyMTkzODc0OH0.Yzw7dHwUrjV3cPPfXnQjxnon_IbMPKZQLcSl3aOyLPU";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
