import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

// The content can probably be further optimized by only referencing
// the platform being build for in the apps directory
export default {
  content: [
    "../../apps/*/src/**/*.{ts,tsx,html}",
    "../../packages/*/src/**/*.{ts,tsx,html}",
    "../../interface/**/*.{ts,tsx,html}",
  ],
  darkMode: "class",
  safelist: ["dark", "light"],
  theme: {
    fontFamily: {
      sans: [...defaultTheme.fontFamily.sans],
      plex: ["IBM Plex Sans", ...defaultTheme.fontFamily.sans],
    },
    fontSize: {
      xs: ["0.75rem", { lineHeight: "1rem" }],
      sm: ["0.875rem", { lineHeight: "1.125rem" }],
      base: ["1rem", { lineHeight: "1.25rem" }],
      lg: ["1.5rem", { lineHeight: "2rem" }],
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  // eslint-disable-next-line no-undef
  // plugins: [require("tailwindcss-animate")],
} satisfies Config;
