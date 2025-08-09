// Font configuration for easy switching and testing
// To change fonts, update the 'current' property in each category

export const fontConfig = {
  // Primary font for headings and branding
  primary: {
    current: "comic-sans" as const, // Change this to test different fonts
    options: {
      "geist-sans": {
        className: "font-sans",
        fontFamily: "var(--font-geist-sans)",
        import: null, // Already imported
      },
      "comic-sans": {
        className: "font-comic-sans",
        fontFamily: '"Comic Sans MS", "Comic Sans", cursive',
        import: null, // System font
      },
      kalam: {
        className: "font-kalam",
        fontFamily: '"Kalam", cursive',
        import:
          '@import url("https://fonts.googleapis.com/css2?family=Kalam:wght@300;400;700&display=swap");',
      },
      "amatic-sc": {
        className: "font-amatic",
        fontFamily: '"Amatic SC", cursive',
        import:
          '@import url("https://fonts.googleapis.com/css2?family=Amatic+SC:wght@400;700&display=swap");',
      },
      caveat: {
        className: "font-caveat",
        fontFamily: '"Caveat", cursive',
        import:
          '@import url("https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&display=swap");',
      },
      "patrick-hand": {
        className: "font-patrick",
        fontFamily: '"Patrick Hand", cursive',
        import:
          '@import url("https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap");',
      },
      "indie-flower": {
        className: "font-indie",
        fontFamily: '"Indie Flower", cursive',
        import:
          '@import url("https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap");',
      },
      "architects-daughter": {
        className: "font-architects",
        fontFamily: '"Architects Daughter", cursive',
        import:
          '@import url("https://fonts.googleapis.com/css2?family=Architects+Daughter&display=swap");',
      },
      "permanent-marker": {
        className: "font-marker",
        fontFamily: '"Permanent Marker", cursive',
        import:
          '@import url("https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap");',
      },
    },
  },

  // Secondary font for body text and UI elements
  secondary: {
    current: "nunito" as const, // Change this to test different fonts
    options: {
      "geist-sans": {
        className: "font-sans",
        fontFamily: "var(--font-geist-sans)",
        import: null,
      },
      quicksand: {
        className: "font-quicksand",
        fontFamily: '"Quicksand", sans-serif',
        import:
          '@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");',
      },
      comfortaa: {
        className: "font-comfortaa",
        fontFamily: '"Comfortaa", sans-serif',
        import:
          '@import url("https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&display=swap");',
      },
      nunito: {
        className: "font-nunito",
        fontFamily: '"Nunito", sans-serif',
        import:
          '@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;500;600;700;800;900&display=swap");',
      },
    },
  },
};

// Helper function to get current font configuration
export function getCurrentFonts() {
  const primary = fontConfig.primary.options[fontConfig.primary.current];
  const secondary = fontConfig.secondary.options[fontConfig.secondary.current];

  return {
    primary,
    secondary,
    imports: [primary.import, secondary.import].filter(Boolean), // Remove null values
  };
}

// Helper function to get font CSS variables
export function getFontCSSVariables() {
  const { primary, secondary } = getCurrentFonts();

  return `
    --font-primary: ${primary.fontFamily};
    --font-secondary: ${secondary.fontFamily};
  `;
}
