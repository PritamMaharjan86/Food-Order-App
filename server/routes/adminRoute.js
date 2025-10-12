const express = require('express'); //import modules that are required
const router = express.Router(); //create express router to handle admin router
const jwt = require('jsonwebtoken'); //use to create and verify jwt token
require('dotenv').config(); //load env variable from .env file

//create router post to admin login
router.post('/login', (req, res) => {
    //destructure username and password from the request body
    const { username, password } = req.body;

    //now compare input with the stored credential in .env file
    if (
        username === process.env.Admin_Username && password === process.env.Admin_Password
    ) {
        //if it matches then create JWT token
        const token = jwt.sign({ username }, process.env.JWT_SECRETKEY, { expiresIn: '1h' });

        //send success login message
        return res.status(200).json({
            message: 'Login Successful',
            token
        })
    }

    //if doesn't match 
    return res.status(401).json({ message: 'Invalid username or password' });
});

module.exports = router;