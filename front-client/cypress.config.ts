import { defineConfig } from "cypress"

export default defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  video: false,
  chromeWebSecurity: false,
  requestTimeout: 10_000,
  taskTimeout: 10_000,
  execTimeout: 10_000,
  responseTimeout: 10_000,
  defaultCommandTimeout: 10_000,
  e2e: {
    baseUrl: "http://localhost:5173",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  }
})
