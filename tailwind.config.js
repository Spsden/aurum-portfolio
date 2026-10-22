/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        "stack-headline": ["var(--font-stack-sans-headline)", "sans-serif"],
      },
      boxShadow: {
        "theme-sm": "var(--shadow-sm)",
        "theme-md": "var(--shadow-md)",
        "theme-lg": "var(--shadow-lg)",
        "theme-xl": "var(--shadow-xl)",
      },
      colors: {
        // lighht theme
        "white-shade": {
          50: "#ffffff",
          100: "#fafafa",
          200: "#f5f5f5",
          300: "#f0f0f0",
          400: "#e5e5e5",
          500: "#d4d4d4",
        },
        // dark th
        // "black-shade": {
        //   50: "#000000",
        //   100: "#0a0a0a",
        //   200: "#141414",
        //   300: "#1f1f1f",
        //   400: "#2a2a2a",
        //   500: "#3a3a3a",
        // },

        "theme-bg": {
          DEFAULT: "var(--color-background)",
          50: "var(--color-bg-50)",
          100: "var(--color-bg-100)",
          200: "var(--color-bg-200)",
          300: "var(--color-bg-300)",
          400: "var(--color-bg-400)",
        },

        "theme-fg": {
          DEFAULT: "var(--color-foreground)",
          50: "var(--color-fg-50)",
          100: "var(--color-fg-100)",
          200: "var(--color-fg-200)",
          300: "var(--color-fg-300)",
          400: "var(--color-fg-400)",
          500: "var(--color-fg-500)",
          600: "var(--color-fg-600)",
        },

        accent: {
          DEFAULT: "var(--color-accent)",
          hover: "var(--color-accent-hover)",
          soft: "var(--color-accent-soft)",
          ring: "var(--color-accent-ring)",
          contrast: "var(--color-accent-contrast)",
        },
      },
    },
  },
  plugins: [],
};
