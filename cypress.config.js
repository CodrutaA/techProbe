const { defineConfig } = require('cypress');

const config = {
  supportFile: 'cypress/support/e2e.js',
  experimentalSessionAndOrigin: true,
  video: false,
  screenshotOnRunFailure: false,
  chromeWebSecurity: false,
  hideXHR: true, // custom, hide http requests in UI mode
};

const setupNodeEvents = (on, _config) => {
  on('task', {
    logToTerminal(message) {
      console.log(`@@@ ${message}`);
      return null;
    },
  });
};

module.exports = defineConfig({
  e2e: {
    ...config,
    setupNodeEvents,
  },
});
