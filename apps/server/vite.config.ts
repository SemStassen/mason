import devServer from "@hono/vite-dev-server";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), "") };

  return {
    clearScreen: false,
    root: "src",
    server: {
      port: 4000,
    },
    build: {
      rollupOptions: {
        treeshake: "recommended",
        input: "src/index.ts",
      },
    },
    optimizeDeps: {
      include: [],
      exclude: [],
    },
    plugins: [
      devServer({
        entry: "src/index.ts",
      }),
    ],
  };
});
