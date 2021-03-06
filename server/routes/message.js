const { Router } = require('express');
const { db } = require('./db');
const shortid = require('shortid');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const router = new Router();

let date = new Date // Invoke constructors without parenthesis if no parameters are to be passed
let months = ["Jan, ","Feb, ","Mar,","Apr, ","Maj, ","Jun, ","Jul, ","Aug, ","Sep, ","Okt, ","Nov, ","Dec, "];
let weekday = ["söndag ", "måndag ", "tisdag ", "onsdag ", "torsdag ", "fredag ", "lördag "]
let hour = date.getHours();
let minutes = date.getMinutes();

// POST user message
router.post('/', async (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];

    // Verify user, allow to post only if valid user    
    try {
        const verified_user = jwt.verify(token, process.env.JWT_KEY); 

        let user = db.get('users')
        .find( {uuid: verified_user.uuid} )
        .value();
        
        // User message object for database
        const user_msg = {
            id: shortid.generate(),
            text: CryptoJS.AES.encrypt(req.body.content, process.env.USER_KEY).toString(), // Encrypt text with USER KEY
            tags: req.body.tag,
            date: `${weekday[date.getDay()]}` + `${months[date.getMonth()]}` + `${hour}:${minutes}`,
            username: user.username,
            // Hash user UUID with SHA-3 in database 
            author: CryptoJS.SHA3(user.uuid).toString(),
            subscribers: CryptoJS.SHA3(user.uuid).toString() 
        }   
        
        // Add message to beginning of array
        db.get('messages')
        .unshift(user_msg)        
        .write()

        // HTTP 201 Created
        res.sendStatus(201)
    } catch(err) {
        // HTTP 403 Forbidden
        res.status(403).send(err)        
    }
})
module.exports = router;