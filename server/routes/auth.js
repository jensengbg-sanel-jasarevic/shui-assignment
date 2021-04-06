const { Router } = require('express');
const { db } = require('./db');
const bcrypt = require('bcrypt');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const router = new Router();

// POST login authentication & authorization
router.post('/login', async (req, res) => {
    // Check if user exist in database, authenticate
    let user = db.get('users')
    .find( {username: req.body.username} )
    .value();

    // If exist in database, authorize
    if(user){
        // Check if plain password match with hashed password in database
        const valid = await bcrypt.compare(req.body.password, user.password)
        
        if(valid){
            // Decrypt users USERKEY with SECRET KEY from env file
            const bytes = CryptoJS.AES.decrypt(user.userkey, process.env.SECRET_KEY);
            const DECRYPTED_USER_KEY = bytes.toString(CryptoJS.enc.Utf8);

            // Encrypt SECRET KEY
            const ENCRYPTED_SECRET_KEY = CryptoJS.AES.encrypt(process.env.SECRET_KEY, DECRYPTED_USER_KEY).toString();

            // Assign valid JWT (user UUID)
            const token = jwt.sign({ uuid: user.uuid }, process.env.JWT_KEY);

            // HTTP 200 OK, send JWT + USER KEY + SECRET KEY
            res.status(200).send({
                token: token,
                userkey: DECRYPTED_USER_KEY,
                secretkey: ENCRYPTED_SECRET_KEY
            });    

        } else {
            // HTTP 401 Unauthorized
            res.status(401).send('Lacks valid authentication credentials.');
        }
    } else {
        // HTTP 403 Forbidden
        res.status(403).send('Client does not have access rights to the content.');
    };
});
module.exports = router;