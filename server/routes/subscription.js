const { Router } = require('express');
const { db } = require('./db');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const router = new Router();

// PUT user subscription 
router.put('/', async (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];

    // Check if user should be allowed to make put request      
    try {
        const verified_user = jwt.verify(token, process.env.JWT_KEY); 

        let user = db.get('users')
        .find( {uuid: verified_user.uuid} )
        .value();

        // Add user to stream that is requested
        db.get('streams')
        .filter( {tag: req.body.tag} )
        .each( (stream) => { stream.subscriber = CryptoJS.SHA3(user.uuid).toString() }) 
        .write();

        // Add user to receive messages where tags include users desired stream 
        db.get('messages')
        .filter({ tags: [req.body.tag] })
        .each( (msg) => { msg.subscriber = CryptoJS.SHA3(user.uuid).toString() }) 
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

        db.get('streams')
        .remove( {tag: selected_tag} )
        .write();

        // Delete user from stream messages, if message contains only the requested tag to be deleted
        db.get('messages')
        .each( (stream) => { if(stream.tags.length == 1 && stream.tags[0] == selected_tag) { delete stream.subscriber } })
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