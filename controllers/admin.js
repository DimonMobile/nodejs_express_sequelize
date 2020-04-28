const Models = require('../models/all');
const Publication = Models.Publication;

exports.getPanel = async function (req, res, next) {
    // TODO: check admin permissions
    res.render('admin/index', { title: 'Admin panel', req: req, res: res });
}

exports.getPublicationsPage = async function (req, res, next) {
    // TODO: check admin persmissions

    let whereStrategy = {};
    if (req.query.filter) {
        if (req.query.filter === 'pending') {
            whereStrategy = { reviewed: false, published: false };
        } else if (req.query.filter === 'published') {
            whereStrategy = { published: true, reviewed: true };
        }
    }

    let offset = 0;
    if (req.query.offset) {
        offset = parseInt(req.query.offset);
    }

    let publications = await Publication.findAll({
        where: whereStrategy,
        order: [
            ['updatedAt', 'DESC']
        ],
        limit: 10,
        offset: offset
    });
    let pubs = [];
    for (let publication of publications) {
        pubs.push({
            id: publication.dataValues.id,
            title: publication.dataValues.name,
            content: publication.dataValues.content,
        });
    }
    res.render('admin/publications', { title: 'Publications administration', req: req, res: res, pubs: pubs });
}

exports.getUsersPage = async function (req, res, next) {
    // TODO: check admin permissions
    // TODO: implement
    res.render('admin/users', { title: 'Users administration', req: req, res: res });
}

exports.getServerManagementPage = async function (req, res, next) {
    // TODO: check admin permissions
    // TODO: implement
    res.render('admin/server', { title: 'Server management', req: req, res: res });
}

exports.applyPublicationAction = async function (req, res, next) {
    // TODO: check admin permissions
    if (req.body.action === 'accept' || req.body.action === 'reject') {
        let publicationId = parseInt(req.body.id);
        let publication = await Publication.findOne({
            where: {
                id: publicationId,
                published: false,
                reviewed: false
            }
        });
        if (publication) {
            publication.reviewed = true;
            if (req.body.action === 'accept') {
                publication.published = true;
            } else {
                publication.published = false;
            }
            await publication.save();

            res.redirect(`/publications?id=${publicationId}`);
        } else {
            res.end('Invalid publication');
        }

    } else {
        res.end('Invalid action');
    }
}