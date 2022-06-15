// import jsonwebtoken for authorisation
const jwt = require('jsonwebtoken');

// whichever API that has this middleware will be locked!
// token verification and payload serilisation

exports.authoriseToken = function (req, res, next) {
    // access the request headers to look for the token
    const authHeader = req.headers['authorization'];
    // req.headers['authorization'] : "Bearer 'dfghjztsfdghjkuztdgf'"
    // if we have authHeader, then return the token 
    const token = authHeader && authHeader.split(" ")[1]; // [0] is the type of authorization, in this case 'Bearer'

    if (token === null) return res.sendStatus(401); // no token

    // as we are here, it means we have a token and we need to verify it
    jwt.verify(token, process.env.ACCESS_SECRET, (err, user) => { // verify --> to understand the code, translates the token, verifies of it is correct or not --> first token will be translated, then it will be compared with the secret. 
        if (err) return res.sendStatus(403); // forbidden
        req.user = user;
        next();
    })
}