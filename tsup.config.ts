import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  tsconfig: './tsconfig.build.json',
  splitting: true,
  sourcemap: true,
  clean: true,
  external: [
    'react',
    'react-dom',
    'react/jsx-runtime',
    'next',
    'next-themes',
    'tailwindcss',
  ],
  injectStyle: false,
  banner: {
    js: '"use client";',
  },
})