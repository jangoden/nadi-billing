import { defineConfig } from "@playwright/test";

const port = process.env.PORT || "3005";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  workers: 1,
  timeout: 45_000,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    channel: process.env.PLAYWRIGHT_CHANNEL || "chrome",
    headless: true,
    trace: "retain-on-failure",
  },
  webServer: {
    command: `node node_modules/next/dist/bin/next start --hostname 127.0.0.1 -p ${port}`,
    url: `http://127.0.0.1:${port}`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
