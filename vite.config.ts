import { execFileSync } from 'node:child_process';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig(() => {
  const buildId = process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7)
    || execFileSync('git', ['rev-parse', '--short=7', 'HEAD'], { encoding: 'utf8' }).trim();

  return {
    define: { 'import.meta.env.VITE_BUILD_ID': JSON.stringify(buildId) },
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'portfolio-build-id',
        transformIndexHtml: {
          order: 'pre',
          handler: (html) => html.replaceAll('%VITE_BUILD_ID%', buildId),
        },
      },
    ],
    server: {
      port: 5173,
      host: true,
      watch: {
        ignored: ['**/.edge-test/**'],
      },
    },
  };
});
