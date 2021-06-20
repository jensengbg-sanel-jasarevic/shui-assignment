// const path = require("path");

module.exports = {
    // Creates dist folder at server directory 
    // outputDir: path.resolve(path.join(__dirname, "../server/dist")),
    devServer: {
        proxy: 'http://localhost:5000'
    },
};

// Docker container 'http://server:5000'
// Cloud: 'https://shui-server.herokuapp.com'