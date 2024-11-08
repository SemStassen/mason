import baseConfig from "@mason/ui/tailwind.config";
import type { Config } from "tailwindcss";

export default {
  content: baseConfig.content,
  presets: [baseConfig],
} satisfies Config;
