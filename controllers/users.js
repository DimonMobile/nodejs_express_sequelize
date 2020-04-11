exports.getUserPage = function(req, res, next) {
    res.render('users', {Title: 'User page', req: req, res: res});
}