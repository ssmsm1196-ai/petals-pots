// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://ixiorzfoejbpafjlyysu.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4aW9yemZvZWpicGFmamx5eXN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyMzkyNjksImV4cCI6MjA3NzgxNTI2OX0.caXxhpFkx_ZAGc8_i9L4XBxUaYjMhgN0kibsqiAtWBc";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
