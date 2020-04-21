const uuid = require('uuid');

exports.getNewPage = async function(req, res, next) {
    res.render('publications/new', {Title: 'New publication', req: req, res: res, uuid: uuid.v4() });
}
