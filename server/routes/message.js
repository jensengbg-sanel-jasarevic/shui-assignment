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

    // Check if user should be allowed to post      
    try {
        const verified_user = jwt.verify(token, process.env.JWT_KEY); 

        let user = db.get('users')
        .find( {uuid: verified_user.uuid} )
        .value();

        // Decrypt USER KEY with the SECRET KEY
        // let DECRYPTED_USER_KEY = CryptoJS.AES.decrypt(user.userkey, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8);

        // Encrypt info for database
        const user_msg = {
            id: shortid.generate(),
            content: req.body.content, // Should be encrypted with user key
            tags: req.body.tag,
            date: `${weekday[date.getDay()]}` + `${months[date.getMonth()]}` + `${hour}:` + `${minutes}`,
            username: user.username,
            subscriber: CryptoJS.SHA3(user.uuid).toString() // User encrypted in database
        }   
        
        db.get('messages')
        .push(user_msg)
        .write()

        // HTTP 201 Created
        res.sendStatus(201)
    } catch(err) {
        // HTTP 403 Forbidden
        res.status(403).send(err)        
    }
})
module.exports = router;