var express = require('express');
var router = express.Router();

 var userCtrl = require('../Controller/user.controller');
 var loginCtrl = require('../Controller/login.controller');

router.post('/user/create', userCtrl.create);
router.post('/user/login', loginCtrl.login);
router.get('/user/getUsers', userCtrl.getUsers);
router.get('/user/getOneUser/:id', userCtrl.getOneUser);

module.exports = router;