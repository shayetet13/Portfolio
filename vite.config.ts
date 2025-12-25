import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";



export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      react({
        fastRefresh: true,
      }),
    ],
    server: {
      port: 5173,
      host: true,
      headers: {
"Content-Security-Policy":
  "default-src 'self'; " +
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://unpkg.com https://cdn.jsdelivr.net https://www.googletagmanager.com https://www.google-analytics.com; " +
  "style-src 'self' 'unsafe-inline' https://unpkg.com https://cdn.jsdelivr.net https://fonts.googleapis.com; " +
  "style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
  "font-src 'self' https://fonts.gstatic.com data:; " +
  "img-src 'self' https: data: blob:; " +
  "connect-src 'self' https: https://api.telegram.org; " +
  "worker-src 'self' blob:; " +
  "frame-src https://www.googletagmanager.com;"
      },
    },
    preview: {
      port: 4173,
      host: true,
    },
    build: {
      outDir: "dist",
      sourcemap: false,
      minify: "terser",
      target: "es2020",
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-dom"],
            router: ["react-router-dom"],
            animations: ["framer-motion"],
            icons: ["lucide-react"],
            utils: ["clsx", "tailwind-merge"],
          },
          assetFileNames: "assets/[name]-[hash][extname]",
          chunkFileNames: "assets/[name]-[hash].js",
          entryFileNames: "assets/[name]-[hash].js",
        },
      },
      assetsDir: "assets",
      reportCompressedSize: true,
      chunkSizeWarningLimit: 1000,
      terserOptions: {
        compress: {
          drop_console: mode === "production",
          drop_debugger: mode === "production",
          pure_funcs:
            mode === "production" ? ["console.log", "console.info"] : [],
        },
        format: {
          comments: false,
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    base: "/",
    define: {
      __DEV__: mode === "development",
      __PROD__: mode === "production",
      "process.env.NODE_ENV": JSON.stringify(mode),
    },
    envPrefix: ["VITE_", "TELEGRAM_", "GOOGLE_"],
    esbuild: {
      legalComments: "none",
    },
  };
});