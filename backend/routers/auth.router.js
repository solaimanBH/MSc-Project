const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/access-control.middleware')
const { registerUser, loginUser, getUserInfo } = require('../controllers/auth.controller');

router.get('/', verifyToken, getUserInfo)

// @route    POST api/auth/register
// @desc     Register user
router.post('/register', registerUser);

// @route    POST api/auth/login
// @desc     Authenticate user & get token
router.post('/login', loginUser);

module.exports = router;