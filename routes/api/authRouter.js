const express = require('express');

// importing controllers: commonJS
const { login, tokenController } = require('../../controllers/controllers.js');

const router = express.Router();

// create a login route

router.post('/login', login);
router.post('/token', tokenController)

module.exports = router;

