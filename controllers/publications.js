exports.getNewPage = async function(req, res, next) {
    res.render('publications/new', {Title: 'New publication', req: req, res: res });
}
