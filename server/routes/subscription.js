const { Router } = require('express');
const { db } = require('./db');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const router = new Router();

// PUT user subscription 
router.put('/', async (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];

    // Verify user, if valid allow to make put request      
    try {
        const verified_user = jwt.verify(token, process.env.JWT_KEY); 

        let user = db.get('users')
        .find( {uuid: verified_user.uuid} )
        .value();

        // Add user to stream that is requested
        // Hash user UUID with SHA-3 in database
        db.get('streams')
        .filter( {tag: req.body.tag} )
        .each( (stream) => { stream.subscribers = CryptoJS.SHA3(user.uuid).toString() }) 
        .write();

        // Add user to receive messages where tags include users desired stream 
        db.get('messages')
        .filter({ tags: [req.body.tag] })
        .each( (msg) => { msg.subscribers = CryptoJS.SHA3(user.uuid).toString() }) 
        .write();

        // HTTP 200 OK, request succeeded
        res.sendStatus(200)
    } 
    catch(err) {
    // HTTP 403 Forbidden
    res.status(403).send(err)
    }
})

// DELETE user subscription & stream
router.delete('/:tag', async (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];
    const selected_tag = req.params.tag
 
    // Verification
    try {
        jwt.verify(token, process.env.JWT_KEY);

        // Remove stream
        db.get('streams')
        .remove( {tag: selected_tag} )
        .write();

        // Delete user from receiving stream messages, if message contains only the requested stream to be deleted
        // User will continue to receive messages where one of user subscription is included
        db.get('messages')
        .each( (stream) => { if(stream.tags.length == 1 && stream.tags[0] == selected_tag) { delete stream.subscribers } })
        .write();

        // HTTP 200 OK, request succeeded
        res.sendStatus(200)
        } 
        catch(err) {
        // HTTP 403 Forbidden
        res.status(403).send(err)
        }
})
module.exports = router;