const router = require('express').Router();
const controller = require('../controllers/rest_comments');

router.get('/', (req, res, next) => controller.getComments(req, res, next));

exports.router = router;