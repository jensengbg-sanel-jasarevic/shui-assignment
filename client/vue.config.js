const path = require("path");
module.exports = {
    outputDir: path.resolve(path.join(__dirname, "../server/dist")),
    devServer: {
        proxy: 'http://localhost:5000'
    },
};

// Docker container 'http://server:5000'