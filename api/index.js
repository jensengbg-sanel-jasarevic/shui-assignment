require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require("path");
const PORT = process.env.PORT || 5000;

const user = require('./routes/user');
const auth = require('./routes/auth');
const flow = require('./routes/flow');
const stream = require('./routes/stream');
const subscription = require('./routes/subscription');
const message = require('./routes/message');

const App = express();
App.use(helmet()); // Security middleware (runs every time API called), protect against injection, cross-site scripting etc   
App.use(cors());
App.use(express.json());
App.use(express.urlencoded({ extended: true }));

App.use('/api/user', user);
App.use('/api/auth', auth);
App.use('/api/flow', flow);
App.use('/api/stream', stream);
App.use('/api/subscription', subscription);
App.use('/api/message', message);

App.use(express.static(path.join(__dirname, "/public")));
App.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public", "index.html"))
);

App.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})