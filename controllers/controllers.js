// loading env to process
require('dotenv').config();

// import jsonwebtoken for authorisation
const jwt = require('jsonwebtoken');

// import posts dataset
const posts = require('../datasets/postsDataset.js');

// import generateToken

const generateToken = require('../middlewares/generateToken.js');

/**
 * @method: GET
 * @description: Get posts
 * @access: Private
 */

exports.getPosts = function getPosts(req, res) {
    res.json(posts.filter(post => post.username === req.user.name)); // res.write() + res.end()
}

/**
 * @method: POST
 * @description: login
 * @access: Public
 */

exports.login = function (req, res) {
    // Authentication : e.g. 'passport js'
    // Authorization : JWT, create a token to access api's you are authorised to
    const username = req.body.username;
    const user = {
        name: username
    }; // payload
    const accessToken = generateToken(user, process.env.ACCESS_SECRET, '30s');; // sign returns a token
    const refreshToken = generateToken(user, process.env.REFRESH_SECRET, '3600s')
    res.json({
        accessToken, // --> accessToken: accessToken
        refreshToken
    });
}

exports.tokenController = function(req, res) {
    // check for refresh token 
    // const refreshToken = req.body.token;

    // create a token to access api's you are authorised to
    const username = req.body.name;
    const user = {
        name: username
    }; 
    const accessToken = generateToken(user, process.env.ACCESS_SECRET, '30s');; 
    res.json({
        accessToken
    });
}