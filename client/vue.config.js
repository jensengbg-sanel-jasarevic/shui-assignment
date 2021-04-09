const path = require("path");
module.exports = {
    outputDir: path.resolve(path.join(__dirname, "../server/dist")),
    devServer: {
        proxy: 'http://server:5000'
    },
};