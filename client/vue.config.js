const path = require("path");

module.exports = {
  outputDir: path.resolve(path.join(__dirname, "../api/public")),
  devServer: {
    proxy: {
      "^/api": {
        target: "http://nodejs-backend:5000",
      },
    },
  }
}
