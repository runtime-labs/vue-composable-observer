import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: [
      'packages/*/test/**/*.test.ts',
    ],
    coverage: {
      provider: 'v8',
      include: ['packages/*/src/**/*.ts'],
      exclude: ['**/index.ts'],
      reporter: ['text', 'lcov', 'html'],
      thresholds: {
        lines: 55,
        functions: 48,
        branches: 45,
        statements: 55,
      },
    },
  },
})
