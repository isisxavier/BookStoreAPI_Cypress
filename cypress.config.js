const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    "baseUrl": "https://bookstore.toolsqa.com",
    "env": {
        "global_timeout":30000,
        "environment":"PROD"
    }
  },
});
