require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

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

App.use('/user', user);
App.use('/auth', auth);
App.use('/flow', flow);
App.use('/stream', stream);
App.use('/subscription', subscription);
App.use('/message', message);

App.listen(1992, () => {
    console.log('Super secure server is up n running on PORT 1992!')
})