// Configure Vue.js app to be served on express server locally.
// Before start running server.js file script, it's required to build Vue.js app (npm run build). This will create 'dist' directory.
const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')

const app = express()

// Here we are configuring dist to serve app files
app.use('/', serveStatic(path.join(__dirname, '/dist')))

// Single page application, everything is stored on index.html
// When trying to access different routes it will redirect do index.html 
// index.html know how to handle the routes that is trying to be accessed
app.get(/.*/, function (req, res) {
	res.sendFile(path.join(__dirname, '/dist/index.html'))
})

const port = process.env.PORT || 8080

app.listen(port)

console.log(`App is listening on port: ${port}`)