const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
  webServer: {
    command: "python3 -m http.server 8080 --bind 0.0.0.0",
    url: "http://127.0.0.1:8080",
    reuseExistingServer: !process.env.CI,
    timeout: 10_000,
  },
  use: {
    baseURL: "http://127.0.0.1:8080",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "mobile",
      use: {
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true,
      },
    },
    {
      name: "tablet",
      use: {
        viewport: { width: 768, height: 900 },
      },
    },
    {
      name: "desktop",
      use: {
        viewport: { width: 1280, height: 900 },
      },
    },
  ],
});
