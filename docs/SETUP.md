# Wonderland School - Setup Guide

## Prerequisites

- Node.js 18+ installed
- Supabase account
- Resend account (for email functionality)

## Database Setup

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Note down your project URL and anon key from Project Settings > API

### 2. Create Database Tables

1. In your Supabase dashboard, go to SQL Editor
2. Copy and run the SQL from `/supabase/schema.sql`
3. This will create:
   - `inquiries` table with all necessary columns
   - Indexes for performance
   - Row Level Security policies
   - Automatic timestamp triggers

### 3. Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your credentials:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

   # Email Configuration (Resend)
   RESEND_API_KEY=your_resend_api_key
   EMAIL_FROM=noreply@your-domain.com
   STAFF_EMAIL=admissions@your-domain.com
   ```

## Email Setup

### 1. Create Resend Account

1. Sign up at [resend.com](https://resend.com)
2. Verify your domain or use their test domain
3. Generate an API key from the dashboard
4. Add the API key to your `.env.local` file

### 2. Configure Email Addresses

- `EMAIL_FROM`: The sender email address (must be verified in Resend)
- `STAFF_EMAIL`: Where staff notifications will be sent

## Running the Application

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000)

## Testing the Inquiry Form

1. Click "Start Your Journey" button on the homepage
2. Fill out the multi-step form:
   - Parent/Guardian Information
   - Child Information
   - Additional Information
3. Submit the form
4. Check:
   - Supabase dashboard for the new inquiry record
   - Parent email for confirmation
   - Staff email for notification

## Production Deployment

### Environment Variables

Make sure to set all environment variables in your production environment:
- Vercel: Project Settings > Environment Variables
- Other platforms: Check their documentation

### Security Notes

1. The Supabase anon key is safe to expose (it's public)
2. Keep your RESEND_API_KEY secret
3. Enable RLS (Row Level Security) on all tables
4. Consider adding authentication for staff access

## Troubleshooting

### Database Connection Issues
- Check your Supabase URL and key are correct
- Ensure your project is not paused (free tier)
- Check network connectivity

### Email Not Sending
- Verify your Resend API key is correct
- Check that sender domain is verified
- Look for errors in the console logs
- Test with Resend's test mode first

### Form Validation Errors
- All required fields must be filled
- Email must be valid format
- Phone must have at least 10 digits
- Child age must be between 2-6 years

## API Endpoints

### POST /api/inquiries
Handles new inquiry submissions:
- Validates all required fields
- Saves to Supabase database
- Sends confirmation email to parent
- Sends notification email to staff
- Returns inquiry reference number

## Support

For issues or questions:
- Check the console for error messages
- Review the Supabase logs
- Check Resend email logs
- Review this documentation