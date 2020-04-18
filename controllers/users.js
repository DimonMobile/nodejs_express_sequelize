const User = require('../models/user');

exports.getProfilePage = async function(req, res, next) {
    let user = await User.findOne({where: {id: req.query.id}});
    let isOwner = false;
    if (user && req.session && user.dataValues.id === req.session.userId)
        isOwner = true;

    res.render('users/profile', {title: 'User profile', req: req, res: res, user: user ? user.dataValues : null, isOwner: isOwner });
}

exports.getPublicationsPage = async function(req, res, next) {
    let user = await User.findOne({where: {id: req.query.id}});
    let isOwner = false;
    if (user && req.session && user.dataValues.id === req.session.userId)
        isOwner = true;

    res.render('users/publications', {title: 'User publications', req: req, res: res, user: user ? user.dataValues : null, isOwner: isOwner });
}