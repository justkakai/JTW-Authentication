// loading environment variables
require('dotenv').config(); // config() loads the .env file contents into the preoess!

// import express package

const express = require('express');

// import jsonwebtoken for authorisation
const jwt = require('jsonwebtoken');

// instantiate express application

const app = express();

// use express body parser middleware
app.use(express.json());

// initialise our posts dataset
const posts = [
    {
        username: 'John',
        title: 'Post 1'
    },
    {
        username: 'Gina',
        title: 'Post 2'
    },
]

// create a login route
app.post('/login', (req, res) => {
    // authentication : e.g. 'passport js'
    // authorization : JWT, create a token to access api's you are authorised to
    const username = req.body.username;
    const user = {
        name: username
    }; // payload
    const accessToken = jwt.sign(user, process.env.ACCESS_SECRET); // sign returns a token
    res.json({
        accessToken // --> accessToken: accessToken
    });
})

// create a simple route to get all our posts
app.get('/posts', (req, res) => {
    res.json(posts); // res.write() + res.end()
})

// listen to port number: 3000
const PORT = process.env.SERVER_PORT;

app.listen(
    PORT,
    () => {
        console.log(
            `Application is connected and listening to port ${PORT}`
        );
    })