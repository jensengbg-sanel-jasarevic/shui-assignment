// const path = require("path");

module.exports = {
    /* Creates dist folder at server directory 
    outputDir: path.resolve(path.join(__dirname, "../server/dist")),
    */
    devServer: {
        proxy: 'http://localhost:5000'
    },
};
// Proxy to the backend API in the development environment (have to use proxy in development phase).
// Docker container: 'http://server:5000'