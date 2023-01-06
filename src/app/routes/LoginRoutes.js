const express = require("express");
const { LoginController } = require('../controllers/LoginController');
const router = express.Router();
const { setNext } = require('../../utils/response');

router.post("", LoginController);

module.exports = router;
