const router = require('express').Router();
const controller = require('../controllers/rest_drafts')

router.post('/', (req, res, next) => res.json({ok: true}));

exports.router = router;