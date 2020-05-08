const router = require('express').Router();
const controller = require('../controllers/users')

router.get('/profile', (req, res, next) => controller.getProfilePage(req, res, next));
router.get('/publications', (req, res, next) => controller.getPublicationsPage(req, res, next));
router.get('/messages', (req, res, next) => controller.getMessagesPage(req, res, next));
router.get('/messages/sender', (req, res, next) => controller.getSendMessagePage(req, res, next));

exports.router = router;