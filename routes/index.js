var express = require('express');
var router = express.Router();
const AuthController = require('../controllers/authController');
const LangController = require('../controllers/LangController');
const {route} = require("express/lib/router");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { navLocation: 'main'});
});

router.post('/login', AuthController.login);
router.get('/logout', AuthController.logout);
router.get('/password', AuthController.showUpdatePasswordForm);
router.post('/password/changePassword', AuthController.updateStudentPassword);
router.get('/changeLang/:lang', LangController.changeLang);

module.exports = router;
