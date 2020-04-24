const router = require('express').Router();
const controller = require('../controllers/main');
router.get('/', (req, res, next) => controller.getMainPage(req, res, next));
router.get('/favicon.ico', (req, res, next) => controller.getFavicon(req, res, next));

const registerRouter = require('./register').router;
router.use('/register', registerRouter);

const signinRouter = require('./signin').router;
router.use('/signin', signinRouter);

const usersRouter = require('./users').router;
router.use('/users', usersRouter);

const publicationsRouter = require('./publications').router;
router.use('/publications', publicationsRouter);

const restDraftsRouter = require('./rest_drafts').router;
router.use('/api/drafts', restDraftsRouter);

const imagesRouter = require('./images').router;
router.use('/images', imagesRouter);

exports.router = router;