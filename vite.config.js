/// <reference types="vitest/config" />
/* global process */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Only Vitest transforms JSX via esbuild; use the automatic runtime there
  // so test files don't need `import React`. The build uses oxc instead, so we
  // omit the esbuild key entirely outside of tests to avoid a build warning.
  ...(process.env.VITEST ? { esbuild: { jsx: 'automatic' } } : {}),
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    css: true,
  },
})
