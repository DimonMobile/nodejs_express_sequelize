const router = require('express').Router();
const controller = require('../controllers/register')

router.get('/', (req, res, next) => controller.getRegistrationPage(req, res, next));
router.post('/', (req, res, next) => controller.postRegistrationPage(req, res, next));

exports.router = router;