import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://dev-www.stridehealth.com',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
