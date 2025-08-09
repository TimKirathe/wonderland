/**
 * Calculate the relative luminance of a color
 * @param hex - Hex color value
 * @returns Relative luminance value
 */
function getLuminance(hex: string): number {
  // Convert hex to RGB
  const rgb = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!rgb) return 0;
  
  const r = parseInt(rgb[1], 16) / 255;
  const g = parseInt(rgb[2], 16) / 255;
  const b = parseInt(rgb[3], 16) / 255;
  
  // Apply gamma correction
  const sRGB = [r, g, b].map(val => {
    if (val <= 0.03928) {
      return val / 12.92;
    }
    return Math.pow((val + 0.055) / 1.055, 2.4);
  });
  
  // Calculate relative luminance
  return sRGB[0] * 0.2126 + sRGB[1] * 0.7152 + sRGB[2] * 0.0722;
}

/**
 * Calculate contrast ratio between two colors
 * @param color1 - First hex color
 * @param color2 - Second hex color
 * @returns Contrast ratio
 */
export function getContrastRatio(color1: string, color2: string): number {
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  
  return (brightest + 0.05) / (darkest + 0.05);
}

/**
 * Check if contrast ratio meets WCAG standards
 * @param ratio - Contrast ratio
 * @param level - WCAG level ('AA' or 'AAA')
 * @param largeText - Whether the text is large (18pt+ or 14pt+ bold)
 * @returns Whether the contrast meets the standard
 */
export function meetsWCAG(
  ratio: number,
  level: 'AA' | 'AAA' = 'AA',
  largeText: boolean = false
): boolean {
  if (level === 'AA') {
    return largeText ? ratio >= 3 : ratio >= 4.5;
  } else {
    return largeText ? ratio >= 4.5 : ratio >= 7;
  }
}

/**
 * Color contrast test results
 */
export interface ContrastTest {
  foreground: string;
  background: string;
  ratio: number;
  passesAA: boolean;
  passesAAA: boolean;
  passesAALarge: boolean;
  passesAAALarge: boolean;
}

/**
 * Test color combinations for WCAG compliance
 */
export function testColorContrast(): ContrastTest[] {
  const tests: ContrastTest[] = [];
  
  // Light mode colors
  const lightMode = {
    background: '#fdfbf7',
    foreground: '#2d3748',
    primary: '#FF8C42',
    secondary: '#0080CC',
    accent: '#FFA500',
    white: '#ffffff',
  };
  
  // Dark mode colors
  const darkMode = {
    background: '#1a1a2e',
    foreground: '#f5f5f5',
    primary: '#FFA652',
    secondary: '#5DADE2',
    accent: '#FFEB3B',
  };
  
  // Test light mode combinations
  const lightTests = [
    { fg: lightMode.foreground, bg: lightMode.background, name: 'Text on Background' },
    { fg: lightMode.primary, bg: lightMode.background, name: 'Primary on Background' },
    { fg: lightMode.secondary, bg: lightMode.background, name: 'Secondary on Background' },
    { fg: lightMode.white, bg: lightMode.primary, name: 'White on Primary' },
    { fg: lightMode.white, bg: lightMode.secondary, name: 'White on Secondary' },
  ];
  
  // Test dark mode combinations
  const darkTests = [
    { fg: darkMode.foreground, bg: darkMode.background, name: 'Text on Background (Dark)' },
    { fg: darkMode.primary, bg: darkMode.background, name: 'Primary on Background (Dark)' },
    { fg: darkMode.secondary, bg: darkMode.background, name: 'Secondary on Background (Dark)' },
    { fg: darkMode.accent, bg: darkMode.background, name: 'Accent on Background (Dark)' },
  ];
  
  [...lightTests, ...darkTests].forEach(test => {
    const ratio = getContrastRatio(test.fg, test.bg);
    tests.push({
      foreground: test.fg,
      background: test.bg,
      ratio,
      passesAA: meetsWCAG(ratio, 'AA', false),
      passesAAA: meetsWCAG(ratio, 'AAA', false),
      passesAALarge: meetsWCAG(ratio, 'AA', true),
      passesAAALarge: meetsWCAG(ratio, 'AAA', true),
    });
  });
  
  return tests;
}