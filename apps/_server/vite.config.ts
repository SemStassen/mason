import { defineConfig, loadEnv, mergeConfig } from "vite";
import { VitePluginNode } from "vite-plugin-node";

import baseConfig from "../../packages/config/base.vite";

export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), "") };

  return mergeConfig(baseConfig, {
    server: {
      port: 4000,
    },
    build: {
      rollupOptions: {
        treeshake: "recommended",
      },
    },
    plugins: [
      VitePluginNode({
        adapter: "express",
        exportName: "app",
        appPath: "./src/index.ts",
      }),
    ],
  });
});
