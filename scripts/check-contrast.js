#!/usr/bin/env node

/**
 * Script to check color contrast ratios for WCAG compliance
 */

function getLuminance(hex) {
  const rgb = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!rgb) return 0;
  
  const r = parseInt(rgb[1], 16) / 255;
  const g = parseInt(rgb[2], 16) / 255;
  const b = parseInt(rgb[3], 16) / 255;
  
  const sRGB = [r, g, b].map(val => {
    if (val <= 0.03928) {
      return val / 12.92;
    }
    return Math.pow((val + 0.055) / 1.055, 2.4);
  });
  
  return sRGB[0] * 0.2126 + sRGB[1] * 0.7152 + sRGB[2] * 0.0722;
}

function getContrastRatio(color1, color2) {
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  
  return (brightest + 0.05) / (darkest + 0.05);
}

// Color definitions
const colors = {
  light: {
    background: '#fdfbf7',
    foreground: '#2d3748',
    primary: '#D86A2C',
    secondary: '#0066A4',
    accent: '#CC8400',
    white: '#ffffff',
    gray700: '#4a5568',
  },
  dark: {
    background: '#1a1a2e',
    foreground: '#f5f5f5',
    primary: '#FFA652',
    secondary: '#5DADE2',
    accent: '#FFEB3B',
  }
};

// Test combinations
const tests = [
  // Light mode tests
  { name: 'Light: Text on Background', fg: colors.light.foreground, bg: colors.light.background },
  { name: 'Light: Primary on Background', fg: colors.light.primary, bg: colors.light.background },
  { name: 'Light: Secondary on Background', fg: colors.light.secondary, bg: colors.light.background },
  { name: 'Light: White on Primary', fg: colors.light.white, bg: colors.light.primary },
  { name: 'Light: White on Secondary', fg: colors.light.white, bg: colors.light.secondary },
  { name: 'Light: Gray on Background', fg: colors.light.gray700, bg: colors.light.background },
  
  // Dark mode tests
  { name: 'Dark: Text on Background', fg: colors.dark.foreground, bg: colors.dark.background },
  { name: 'Dark: Primary on Background', fg: colors.dark.primary, bg: colors.dark.background },
  { name: 'Dark: Secondary on Background', fg: colors.dark.secondary, bg: colors.dark.background },
  { name: 'Dark: Accent on Background', fg: colors.dark.accent, bg: colors.dark.background },
];

console.log('\n=== WCAG Color Contrast Check ===\n');
console.log('WCAG AA Requirements:');
console.log('  - Normal text: 4.5:1');
console.log('  - Large text (18pt+): 3:1');
console.log('  - UI components: 3:1\n');

let hasFailures = false;

tests.forEach(test => {
  const ratio = getContrastRatio(test.fg, test.bg);
  const passesAA = ratio >= 4.5;
  const passesAALarge = ratio >= 3;
  const status = passesAA ? '✅' : passesAALarge ? '⚠️ ' : '❌';
  
  console.log(`${status} ${test.name}`);
  console.log(`   Ratio: ${ratio.toFixed(2)}:1`);
  console.log(`   Normal text: ${passesAA ? 'PASS' : 'FAIL'} | Large text: ${passesAALarge ? 'PASS' : 'FAIL'}`);
  console.log(`   Colors: ${test.fg} on ${test.bg}\n`);
  
  if (!passesAALarge) {
    hasFailures = true;
  }
});

if (hasFailures) {
  console.log('⚠️  Some color combinations need adjustment for WCAG compliance.\n');
} else {
  console.log('✅ All color combinations meet WCAG AA standards!\n');
}

process.exit(hasFailures ? 1 : 0);