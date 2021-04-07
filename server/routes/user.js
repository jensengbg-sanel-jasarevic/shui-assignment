const { Router } = require('express');
const { db } = require('./db');
const bcrypt = require('bcrypt');
const shortid = require('shortid');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const router = new Router();

// POST new user
router.post('/', async (req, res) => {
    if(req.body.username && req.body.password) { // Create user to database

        // Hashing password
        const HASHED_PASSWORD = await bcrypt.hash(req.body.password, 10);
        
        // Assign PUBLIC KEY to new user 
        const PUBLIC_KEY = process.env.PUBLIC_KEY;
        
        // Encrypt PUBLIC KEY with PRIVATE KEY 
        const ENCRYPTED_PUBLIC_KEY = CryptoJS.AES.encrypt(PUBLIC_KEY, process.env.PRIVATE_KEY).toString();

        // User object for database
        let new_user = {
            uuid: shortid.generate(), // Generate user UUID
            username: req.body.username, 
            password: HASHED_PASSWORD, // Hashed password with bcrypt 
            userkey: ENCRYPTED_PUBLIC_KEY, // Encrypted user PUBLIC KEY  
        }

        // Add new user to database
        db.get('users')
        .push(new_user)
        .write()

        // HTTP 201 Created
        res.status(201).send('User created.');         
    } else {
        // HTTP 400 Bad Request
        res.status(400).send('Client error. Credentials not correct.')
    }  
})

// DELETE user
router.delete('/', async (req, res) => {
    // Get token from request objects 'Headers' attribute
    const token = req.headers['authorization'].split(' ')[1];

    try {
        // Verify user with private JWT KEY     
        const verified_user = jwt.verify(token, process.env.JWT_KEY); // Token contains UUID for user, make use of it to search for desired user in database
        
        // Remove user from database
        db.get('users')
        .remove({ uuid: verified_user.uuid })
        .write(); 
        
       // Remove user from all streams & messages where user assigned as subscriber
        db.get('streams')
        .filter({ subscribers: CryptoJS.SHA3(verified_user.uuid).toString() })
        .each( (user) => { delete user.subscribers } )
        .write();  
        
        db.get('messages')
        .filter({ subscribers: CryptoJS.SHA3(verified_user.uuid).toString() })
        .each( (user) => { delete user.subscribers } )
        .write();  

        // Remove all messages written by user
        db.get('messages')
        .remove({ author: CryptoJS.SHA3(verified_user.uuid).toString() })
        .write();
       
        // HTTP 200 OK
        res.sendStatus(200)
    } 
    catch(err) {
        // HTTP 403 Forbidden
        res.status(403).send(err)
    }
})
module.exports = router;