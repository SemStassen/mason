import { defineConfig, loadEnv, mergeConfig } from "vite";

import baseConfig from "../../packages/config/base.vite";

export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), "") };

  return mergeConfig(baseConfig, {
    server: {
      port: 8001,
    },
    build: {
      rollupOptions: {
        treeshake: "recommended",
      },
    },
    plugins: [],
  });
});