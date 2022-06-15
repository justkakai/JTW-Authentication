const express = require('express');

// importing authoriseToken middleware

const { authoriseToken } = require('../../middlewares/accessAuthorization.js');

// importing controllers: commonJS

const { getPosts } = require('../../controllers/controllers.js');

const router = express.Router();

// create a simple route to get all our posts

router.get('/posts', authoriseToken, getPosts);

module.exports = router;

