const { Router } = require('express');
const { db } = require('./db');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const router = new Router();

// GET user flow
router.get('/', async (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];
    
    // First check if token valid, if not valid send nothing from server
    try {
        const verified_user = jwt.verify(token, process.env.JWT_KEY);
        
        // User UUID is hashed in database
        // JWT contains user UUID, hash it then search in database to find user
        const HASHED_USER_UUID = CryptoJS.SHA3(verified_user.uuid).toString()

        let users_flow = db.get('messages')
        .filter( {subscribers: HASHED_USER_UUID} )
        .value(); 

        // HTTP 200 OK, send results
        res.status(200).send(users_flow);    
        } 
        catch(err) {
        // HTTP 403 Forbidden
        res.status(403).send(err)
    }    
})
module.exports = router;