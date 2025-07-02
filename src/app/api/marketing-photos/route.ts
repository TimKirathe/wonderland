import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const photosDirectory = path.join(process.cwd(), 'public', 'marketing-photos');
  
  try {
    const files = fs.readdirSync(photosDirectory);
    
    // Filter for image files and sort them numerically
    const imageFiles = files
      .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file))
      .sort((a, b) => {
        // Extract numbers from filenames for proper sorting
        const numA = parseInt(a.match(/\d+/)?.[0] || '0');
        const numB = parseInt(b.match(/\d+/)?.[0] || '0');
        return numA - numB;
      });
    
    // Return the paths relative to the public directory
    const photos = imageFiles.map(file => `/marketing-photos/${file}`);
    
    return NextResponse.json({ photos });
  } catch (error) {
    console.error('Error reading marketing photos directory:', error);
    return NextResponse.json({ photos: [] }, { status: 500 });
  }
}