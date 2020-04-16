const router = require('express').Router();
const controller = require('../controllers/publications')

router.get('/new', (req, res, next) => controller.getNewPage(req, res, next));

exports.router = router;