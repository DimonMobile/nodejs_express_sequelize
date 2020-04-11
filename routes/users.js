const router = require('express').Router();
const controller = require('../controllers/users')

router.get('/', (req, res, next) => controller.getUserPage(req, res, next));

exports.router = router;