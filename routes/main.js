const router = require('express').Router();
const controller = require('../controllers/main');
router.get('/', (req, res, next) => controller.getMainPage(req, res, next));

const registerRouter = require('./register').router;
router.use('/register', registerRouter);

exports.router = router;