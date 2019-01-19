const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const router = express.Router()
const config = require('./config')
const bcrypt = require('bcrypt-nodejs')
var salt = bcrypt.genSaltSync(10)
const db = require('./src/api/db.json')
const tokenList = {}
const app = express()


app.use(cors())

router.get('/members', (req,res) => {
    res.send(require('./src/api/memberData.json'));
})

// For local development purposes, all users have password: TestPassword
router.post('/login', (req,res) => {
    const postData = req.body;
    if (!postData.username || !postData.password) {
        return res.status(401).json({error: 'No username or password.'})
    } 
    // check db to see if username exists
    var userIndex = db.users.findIndex(user => user.username === postData.username);
    if (userIndex === -1) {
        // username not registered
        return res.status(401).json({error: postData.username + ' is not a registered username'})
    } else {
        // username is registered, compare with hashed password in db
        if (!bcrypt.compareSync(postData.password, db.users[userIndex].password)) {
            // passwords don't match, unsuccessful login
            return res.status(401).json({error: 'Wrong password'});
        }
    }
    
    // if passwords match, create jwt token to return 
    var hash = bcrypt.hashSync(postData.password, salt);
    const user = {
        "username": postData.username,
        "password": hash
    }

    const token = jwt.sign(user, config.secret, { expiresIn: config.tokenLife})
    const refreshToken = jwt.sign(user, config.refreshTokenSecret, { expiresIn: config.refreshTokenLife})
    
    const response = {
        "status": "Logged in",
        "token": token,
         "refreshToken": refreshToken,
    }
    tokenList[refreshToken] = response
    res.status(200).json(response);
})

// Secure routes go below

router.use(require('./middleware'))

router.get('/secure', (req,res) => {
    // all secured routes goes here
    res.send('I am secured...')
})

router.get('/profile/:username', (req, res) => {
    var username = req.params.username;
    if (db.users.findIndex(user => user.username === username) !== -1) {
        console.log('user found');
    }
})

app.use(bodyParser.json())
app.use('/api', router)
app.listen(config.port || process.env.port || 3000);
