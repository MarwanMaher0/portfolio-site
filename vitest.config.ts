import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // Unit tests only; the Playwright specs in tests/e2e run with `npm run test:e2e`.
    include: ['tests/*.spec.ts'],
  },
})
