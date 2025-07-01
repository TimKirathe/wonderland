-- Create inquiries table
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Parent/Guardian Information
  parent_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  relationship VARCHAR(50) NOT NULL,
  
  -- Child Information
  child_name VARCHAR(255) NOT NULL,
  date_of_birth DATE NOT NULL,
  program VARCHAR(50) NOT NULL,
  special_needs TEXT,
  previous_school VARCHAR(255),
  
  -- Additional Information
  preferred_start_date DATE,
  how_heard VARCHAR(50),
  message TEXT,
  
  -- Metadata
  inquiry_id VARCHAR(50) UNIQUE NOT NULL,
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on email for faster lookups
CREATE INDEX idx_inquiries_email ON inquiries(email);

-- Create an index on created_at for sorting
CREATE INDEX idx_inquiries_created_at ON inquiries(created_at);

-- Create an index on status for filtering
CREATE INDEX idx_inquiries_status ON inquiries(status);

-- Add RLS (Row Level Security) policies
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Policy for inserting new inquiries (anyone can submit)
CREATE POLICY "Anyone can insert inquiries" ON inquiries
  FOR INSERT WITH CHECK (true);

-- Policy for reading inquiries (only authenticated users)
CREATE POLICY "Only authenticated users can read inquiries" ON inquiries
  FOR SELECT USING (auth.role() = 'authenticated');

-- Policy for updating inquiries (only authenticated users)
CREATE POLICY "Only authenticated users can update inquiries" ON inquiries
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update the updated_at column
CREATE TRIGGER update_inquiries_updated_at BEFORE UPDATE ON inquiries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create information_requests table
CREATE TABLE IF NOT EXISTS information_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Contact Information
  parent_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  child_age VARCHAR(20) NOT NULL,
  message TEXT,
  
  -- Metadata
  request_id VARCHAR(50) UNIQUE NOT NULL,
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for information_requests
CREATE INDEX idx_information_requests_email ON information_requests(email);
CREATE INDEX idx_information_requests_created_at ON information_requests(created_at);
CREATE INDEX idx_information_requests_status ON information_requests(status);

-- Add RLS (Row Level Security) policies for information_requests
ALTER TABLE information_requests ENABLE ROW LEVEL SECURITY;

-- Policy for inserting new information requests (anyone can submit)
CREATE POLICY "Anyone can insert information requests" ON information_requests
  FOR INSERT WITH CHECK (true);

-- Policy for reading information requests (only authenticated users)
CREATE POLICY "Only authenticated users can read information requests" ON information_requests
  FOR SELECT USING (auth.role() = 'authenticated');

-- Policy for updating information requests (only authenticated users)
CREATE POLICY "Only authenticated users can update information requests" ON information_requests
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Create a trigger to automatically update the updated_at column for information_requests
CREATE TRIGGER update_information_requests_updated_at BEFORE UPDATE ON information_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();