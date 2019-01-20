const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const router = express.Router()
const config = require('./config')
const bcrypt = require('bcrypt-nodejs')
var salt = bcrypt.genSaltSync(10)
const loginDb = require('./src/api/db.json')
const memberDb = require('./src/api/memberData.json');
const tokenList = {}
const app = express()


app.use(cors())

router.get('/members', (req,res) => {
    res.send(memberDb);
})

// For local development purposes, all users have password: TestPassword
router.post('/login', (req,res) => {
    const postData = req.body;
    if (!postData.username || !postData.password) {
        return res.status(401).json({error: 'No username or password.'})
    } 
    // check db to see if username exists
    var userIndex = loginDb.users.findIndex(user => user.username === postData.username);
    if (userIndex === -1) {
        // username not registered
        return res.status(401).json({error: postData.username + ' is not a registered username'})
    } else {
        // username is registered, compare with hashed password in db
        if (!bcrypt.compareSync(postData.password, loginDb.users[userIndex].password)) {
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

router.get('/user/:username', (req, res) => {
    var username = req.params.username;
    var userIndex = loginDb.users.findIndex(user => user.username === username);
    if (userIndex != -1) {
        console.log('user found');
        const memberDbIndex = memberDb.members.findIndex(member => member.username === username);
        res.send(JSON.stringify(memberDb.members[memberDbIndex]));
    } else {
        res.send(401).json({error: 'no profile associated with that username'});
    }
})

app.use(bodyParser.json())
app.use('/api', router)
app.listen(config.port || process.env.port || 3000);
