const Models = require('../models/all');
const User = Models.User;
const Publication = Models.Publication;
const Message = Models.Message;

exports.getProfilePage = async function(req, res, next) {
    if (!req.query.id) {
        if (req.session.userId) {
            req.query.id = req.session.userId;
        } else {
            res.statusCode = 401;
            return await res.end("Unauthorized access");
        }
    }
    let user = await User.findOne({where: {id: req.query.id}});
    let isOwner = false;
    if (user && req.session && user.dataValues.id === req.session.userId)
        isOwner = true;

    res.render('users/profile', {title: 'User profile', req: req, res: res, user: user ? user.dataValues : null, isOwner: isOwner });
}

exports.getPublicationsPage = async function(req, res, next) {
    const itemsOnPage = 10;
    let offset = 0;
    let page = 1;
    if (req.query.page != null) {
        page = parseInt(req.query.page)
        offset = (page - 1) * itemsOnPage;
    }

    if (!req.query.id) {
        if (req.session.userId) {
            req.query.id = req.session.userId;
        } else {
            res.statusCode = 401;
            return await res.end("Unauthorized access");
        }
    }

    let user = await User.findOne({where: {id: req.query.id}});
    let isOwner = false;
    if (user && req.session && user.dataValues.id === req.session.userId)
        isOwner = true;

    let publications = await Publication.findAndCountAll({
        limit: itemsOnPage,
        offset: offset,
        where: {userId: user.dataValues.id},
        order: [
            ['createdAt', 'DESC']
        ]
    });

    let pages = [];
    const pagesNumber = Math.ceil(publications.count / itemsOnPage);
    for (let i = 1; i <= pagesNumber; ++i) {
        pages.push(i);
    }
    let pubs = [];
    for (let pub of publications.rows) {
        pubs.push({
            name: pub.dataValues.name,
            id: pub.dataValues.id,
            created: new Date(pub.dataValues.createdAt).toUTCString()
        });
    }

    let nextPage = page + 1;
    let prevPage = page - 1;
    prevPage = prevPage < 1 ? null : prevPage;
    nextPage = nextPage > pagesNumber ? null : nextPage;

    res.render('users/publications', {
        title: 'User publications',
        req: req,
        res: res,
        user: user ? user.dataValues : null,
        isOwner: isOwner,
        publications: pubs,
        pagination: pages,
        page: page,
        nextPage: nextPage,
        prevPage: prevPage });
}

exports.getMessagesPage = async function (req, res, next) {
    if (!req.session.userId) {
        res.statusCode = 401;
        return await res.end('Unauthorized');
    }
    let dialogs = await Message.findAll({
        where: {
            toUserId: req.session.userId
        },
        group: 'fromUserId',
        include: [{
            model: User,
            as: 'sourceUser',
            required: true
        },{
            model: User,
            as: 'targetUser',
            required: true
        }],
        order: [
            ['createdAt', 'DESC']
        ]
    });
    let diags = [];
    for (let dialog of dialogs) {
        console.log(dialog.sourceUser.nick);
        console.log(`From: ${dialog.dataValues.fromUserId}, to: ${dialog.dataValues.toUserId} - ${dialog.dataValues.content}`);
        diags.push({
            id: dialog.dataValues.id,
            content: dialog.dataValues.content,
            createdAt: dialog.dataValues.createdAt.toLocaleString(),
            from: {
                id: dialog.sourceUser.id,
                nick: dialog.sourceUser.nick,
                avatar: dialog.sourceUser.avatar
            }
        });
    }
    res.render('users/messages', {req: req, res: res, isOwner: true, dialogs: diags});
}