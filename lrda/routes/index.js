var express = require('express');
var router = express.Router();

router.use('/fil', require('./fil'))
router.use('/', require('./mur'))
router.use('/profil', require('./profil'))
router.use('/friends', require('./friends'))
module.exports = router;
