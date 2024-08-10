import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {},
  // eslint-disable-next-line no-undef
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
