const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // Adicione a linha abaixo:
    baseUrl: 'dev-www.stridehealth.com/my/insurance', 
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // ADICIONE OU EDITE ESTA LINHA:
    baseUrl: 'https://dev-www.stridehealth.com',
    
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});