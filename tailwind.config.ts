import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/types/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#1F3D2B",
          foreground: "#F7F9F7",
        },
        secondary: {
          DEFAULT: "#3A7D44",
          foreground: "#F7F9F7",
        },
        accent: {
          DEFAULT: "#F4C542",
          foreground: "#1F3D2B",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        border: "var(--border)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 3px rgb(31 61 43 / 0.06), 0 4px 12px rgb(31 61 43 / 0.04)",
        "card-hover":
          "0 2px 6px rgb(31 61 43 / 0.08), 0 8px 20px rgb(31 61 43 / 0.06)",
      },
      borderRadius: {
        xl: "14px",
        "2xl": "16px",
      },
    },
  },
  plugins: [],
} satisfies Config;
