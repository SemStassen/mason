// vite.config.ts
import { defineConfig as defineConfig2, loadEnv, mergeConfig } from "file:///Users/semstassen/projects/personal/mason/apps/desktop/node_modules/vite/dist/node/index.js";

// ../../packages/config/base.vite.ts
import { fileURLToPath } from "node:url";
import react from "file:///Users/semstassen/projects/personal/mason/node_modules/@vitejs/plugin-react-swc/index.mjs";
import { defineConfig } from "file:///Users/semstassen/projects/personal/mason/node_modules/vite/dist/node/index.js";
import i18nextLoader from "file:///Users/semstassen/projects/personal/mason/node_modules/vite-plugin-i18next-loader/dist/index.js";
import tsconfigPaths from "file:///Users/semstassen/projects/personal/mason/node_modules/vite-tsconfig-paths/dist/index.js";
var __vite_injected_original_import_meta_url = "file:///Users/semstassen/projects/personal/mason/packages/config/base.vite.ts";
var url = new URL("../../interface/locales", __vite_injected_original_import_meta_url);
var base_vite_default = defineConfig({
  clearScreen: false,
  root: "src",
  build: {
    outDir: "../dist",
    assetsDir: "."
  },
  server: {
    port: 8002
  },
  resolve: {},
  plugins: [
    react(),
    i18nextLoader({
      paths: [fileURLToPath(url.href)],
      namespaceResolution: "relativePath"
    }),
    tsconfigPaths()
  ]
});

// vite.config.ts
var vite_config_default = defineConfig2(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), "") };
  return mergeConfig(base_vite_default, {
    server: {
      port: 8001
    },
    build: {
      rollupOptions: {
        treeshake: "recommended"
      }
    },
    plugins: []
  });
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiLi4vLi4vcGFja2FnZXMvY29uZmlnL2Jhc2Uudml0ZS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9zZW1zdGFzc2VuL3Byb2plY3RzL3BlcnNvbmFsL21hc29uL2FwcHMvZGVza3RvcFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3NlbXN0YXNzZW4vcHJvamVjdHMvcGVyc29uYWwvbWFzb24vYXBwcy9kZXNrdG9wL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9zZW1zdGFzc2VuL3Byb2plY3RzL3BlcnNvbmFsL21hc29uL2FwcHMvZGVza3RvcC92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZywgbG9hZEVudiwgbWVyZ2VDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuXG5pbXBvcnQgYmFzZUNvbmZpZyBmcm9tIFwiLi4vLi4vcGFja2FnZXMvY29uZmlnL2Jhc2Uudml0ZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiB7XG4gIHByb2Nlc3MuZW52ID0geyAuLi5wcm9jZXNzLmVudiwgLi4ubG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpLCBcIlwiKSB9O1xuXG4gIHJldHVybiBtZXJnZUNvbmZpZyhiYXNlQ29uZmlnLCB7XG4gICAgc2VydmVyOiB7XG4gICAgICBwb3J0OiA4MDAxLFxuICAgIH0sXG4gICAgYnVpbGQ6IHtcbiAgICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgICAgdHJlZXNoYWtlOiBcInJlY29tbWVuZGVkXCIsXG4gICAgICB9LFxuICAgIH0sXG4gICAgcGx1Z2luczogW10sXG4gIH0pO1xufSk7XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9zZW1zdGFzc2VuL3Byb2plY3RzL3BlcnNvbmFsL21hc29uL3BhY2thZ2VzL2NvbmZpZ1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3NlbXN0YXNzZW4vcHJvamVjdHMvcGVyc29uYWwvbWFzb24vcGFja2FnZXMvY29uZmlnL2Jhc2Uudml0ZS50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvc2Vtc3Rhc3Nlbi9wcm9qZWN0cy9wZXJzb25hbC9tYXNvbi9wYWNrYWdlcy9jb25maWcvYmFzZS52aXRlLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCB9IGZyb20gXCJub2RlOnVybFwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgaTE4bmV4dExvYWRlciBmcm9tIFwidml0ZS1wbHVnaW4taTE4bmV4dC1sb2FkZXJcIjtcbmltcG9ydCB0c2NvbmZpZ1BhdGhzIGZyb20gXCJ2aXRlLXRzY29uZmlnLXBhdGhzXCI7XG5cbmNvbnN0IHVybCA9IG5ldyBVUkwoXCIuLi8uLi9pbnRlcmZhY2UvbG9jYWxlc1wiLCBpbXBvcnQubWV0YS51cmwpO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBjbGVhclNjcmVlbjogZmFsc2UsXG4gIHJvb3Q6IFwic3JjXCIsXG4gIGJ1aWxkOiB7XG4gICAgb3V0RGlyOiBcIi4uL2Rpc3RcIixcbiAgICBhc3NldHNEaXI6IFwiLlwiLFxuICB9LFxuICBzZXJ2ZXI6IHtcbiAgICBwb3J0OiA4MDAyLFxuICB9LFxuICByZXNvbHZlOiB7fSxcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAgaTE4bmV4dExvYWRlcih7XG4gICAgICBwYXRoczogW2ZpbGVVUkxUb1BhdGgodXJsLmhyZWYpXSxcbiAgICAgIG5hbWVzcGFjZVJlc29sdXRpb246IFwicmVsYXRpdmVQYXRoXCIsXG4gICAgfSksXG4gICAgdHNjb25maWdQYXRocygpLFxuICBdLFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQW9WLFNBQVMsZ0JBQUFBLGVBQWMsU0FBUyxtQkFBbUI7OztBQ0E5QyxTQUFTLHFCQUFxQjtBQUN2WCxPQUFPLFdBQVc7QUFDbEIsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxtQkFBbUI7QUFDMUIsT0FBTyxtQkFBbUI7QUFKOEwsSUFBTSwyQ0FBMkM7QUFNelEsSUFBTSxNQUFNLElBQUksSUFBSSwyQkFBMkIsd0NBQWU7QUFFOUQsSUFBTyxvQkFBUSxhQUFhO0FBQUEsRUFDMUIsYUFBYTtBQUFBLEVBQ2IsTUFBTTtBQUFBLEVBQ04sT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1IsV0FBVztBQUFBLEVBQ2I7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBQUEsRUFDQSxTQUFTLENBQUM7QUFBQSxFQUNWLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLGNBQWM7QUFBQSxNQUNaLE9BQU8sQ0FBQyxjQUFjLElBQUksSUFBSSxDQUFDO0FBQUEsTUFDL0IscUJBQXFCO0FBQUEsSUFDdkIsQ0FBQztBQUFBLElBQ0QsY0FBYztBQUFBLEVBQ2hCO0FBQ0YsQ0FBQzs7O0FEdkJELElBQU8sc0JBQVFDLGNBQWEsQ0FBQyxFQUFFLEtBQUssTUFBTTtBQUN4QyxVQUFRLE1BQU0sRUFBRSxHQUFHLFFBQVEsS0FBSyxHQUFHLFFBQVEsTUFBTSxRQUFRLElBQUksR0FBRyxFQUFFLEVBQUU7QUFFcEUsU0FBTyxZQUFZLG1CQUFZO0FBQUEsSUFDN0IsUUFBUTtBQUFBLE1BQ04sTUFBTTtBQUFBLElBQ1I7QUFBQSxJQUNBLE9BQU87QUFBQSxNQUNMLGVBQWU7QUFBQSxRQUNiLFdBQVc7QUFBQSxNQUNiO0FBQUEsSUFDRjtBQUFBLElBQ0EsU0FBUyxDQUFDO0FBQUEsRUFDWixDQUFDO0FBQ0gsQ0FBQzsiLAogICJuYW1lcyI6IFsiZGVmaW5lQ29uZmlnIiwgImRlZmluZUNvbmZpZyJdCn0K
