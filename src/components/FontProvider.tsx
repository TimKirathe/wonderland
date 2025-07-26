"use client";

import { useEffect } from 'react';
import { getCurrentFonts, getFontCSSVariables } from '@/lib/fonts';

export default function FontProvider() {
  useEffect(() => {
    const { primary, secondary, imports } = getCurrentFonts();
    const fontVariables = getFontCSSVariables();
    
    // Create or update the font style element
    let styleElement = document.getElementById('dynamic-fonts') as HTMLStyleElement;
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = 'dynamic-fonts';
      document.head.appendChild(styleElement);
    }
    
    // Build the style content with font imports and class overrides
    const styleContent = `
      ${imports.join('\n')}
      
      :root {
        ${fontVariables}
      }
      
      /* Dynamic font class overrides based on configuration */
      .font-primary {
        font-family: ${primary.fontFamily} !important;
      }
      
      .font-secondary {
        font-family: ${secondary.fontFamily} !important;
      }
    `;
    
    styleElement.innerHTML = styleContent;
    
    return () => {
      // Cleanup if needed
    };
  }, []);
  
  return null;
}