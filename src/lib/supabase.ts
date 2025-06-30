import { createClient } from '@supabase/supabase-js';

// Create Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type definitions for our database
export interface Inquiry {
  id?: string;
  parent_name: string;
  email: string;
  phone: string;
  relationship: string;
  child_name: string;
  date_of_birth: string;
  program: string;
  special_needs?: string;
  previous_school?: string;
  preferred_start_date?: string;
  how_heard?: string;
  message?: string;
  inquiry_id: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export type InquiryInsert = Omit<Inquiry, 'id' | 'created_at' | 'updated_at'>;
export type InquiryUpdate = Partial<Omit<Inquiry, 'id' | 'created_at' | 'updated_at'>>;

// Database helper functions
export async function createInquiry(inquiry: InquiryInsert) {
  const { data, error } = await supabase
    .from('inquiries')
    .insert([inquiry])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getInquiries() {
  const { data, error } = await supabase
    .from('inquiries')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getInquiryById(id: string) {
  const { data, error } = await supabase
    .from('inquiries')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function updateInquiry(id: string, updates: InquiryUpdate) {
  const { data, error } = await supabase
    .from('inquiries')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}