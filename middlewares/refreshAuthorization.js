require('dotenv').config();

// import jwt

const jwt = require('jsonwebtoken');

function refreshAuth(req, res, next) {
    // check for refresh token
    const refreshToken = req.body.token;

    // check if token does exist
    if(refreshToken === null) return res.sendStatus(401); // no token

    // verify the refreshToken
    jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, user) => {
        if(err) return res.sendStatus(403); // forbidden
        req.user = user;
        next();
    });
}