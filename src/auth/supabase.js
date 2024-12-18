import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://cnifzbgiprcrqtktiuvv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNuaWZ6YmdpcHJjcnF0a3RpdXZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk3MDYzNzgsImV4cCI6MjA0NTI4MjM3OH0.bp2LmZA33jG4gD9VAnbo7cqdvZStiamMn695MUaUJXE";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
