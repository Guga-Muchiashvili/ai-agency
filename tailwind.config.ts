import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ["Inter", "Arial", "sans-serif"], // Custom font (e.g., Inter)
        serif: ["Merriweather", "serif"],
        bebas: ["Bebas Neue", "sans-serif"],
        mono: ["Fira Code", "monospace"], // Custom monospace font
      },
      screens: {
        // Custom breakpoints
        xs: "480px", // Small screen (phone)
        sm: "640px", // Small screen (tablet)
        md: "768px", // Medium screen (tablet)
        lg: "1024px", // Large screen (laptop)
        xl: "1280px", // Extra large screen (desktop)
        "2xl": "1536px", // Larger desktop screen
      },
    },
  },
  plugins: [],
} satisfies Config;
