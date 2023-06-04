const express = require('express');

const authController = require('../controllers/authControllers');

const router = express.Router();

//auth
router.post('/singup', authController.singUp);

module.exports = router;
