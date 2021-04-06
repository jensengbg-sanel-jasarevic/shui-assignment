const { Router } = require('express');
const { db } = require('./db');
const jwt = require('jsonwebtoken');
const CryptoJS = require('crypto-js');
const router = new Router();

// GET streams
router.get('/', async (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];
     
    // Verify user, right to access data if valid     
    try {
    jwt.verify(token, process.env.JWT_KEY);
    
    // Create new array that contains only tag values
    let tags = db.get('streams')
    .map('tag')
    .value();
    
    if (tags === undefined || tags.length == 0) {
        // HTTP 404 Not Found
        res.sendStatus(404);    
        } 
        else {
        // HTTP 200 OK
        res.status(200).send(tags);    
    };

    } 
    catch(err) {
    // HTTP 403 Forbidden
    res.status(403).send(err)
    }
});

// POST stream
router.post('/', async (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];
    
    // If user verified, then allow to make post      
    try {
        const verified_user = jwt.verify(token, process.env.JWT_KEY);

        // Find user
        let user = db.get('users')
        .find( {uuid: verified_user.uuid} )
        .value();

        // New stream object
        const new_tag = {
            tag: req.body.tag,
            subscribers: CryptoJS.SHA3(user.uuid).toString()
        }   
        
        db.get('streams')
        .push(new_tag)
        .write()

        // HTTP 201 Created
        res.sendStatus(201);
    } 
    catch(err) {
    // HTTP 403 Forbidden
    res.status(403).send(err);
    }
})

module.exports = router;