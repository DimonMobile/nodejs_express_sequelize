const router = require('express').Router();
const controller = require('../controllers/rest_drafts')

router.get('/', (req, res, next) => res.json({ok: true}));
//router.get('/publications', (req, res, next) => controller.getPublicationsPage(req, res, next));

exports.router = router;