// Configure Vue.js app to be served on express server locally.
// Before start running server.js file script, it's required to build Vue.js app (npm run build). This will create 'dist' directory.
const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')

const app = express()

// Here we are configuring dist to serve app files
app.use('/', serveStatic(path.join(__dirname, '/dist')))

// This * route is to serve project on different page routes except root `/`
app.get(/.*/, function (req, res) {
	res.sendFile(path.join(__dirname, '/dist/index.html'))
})

const port = process.env.PORT || 8080

app.listen(port)

console.log(`App is listening on port: ${port}`)