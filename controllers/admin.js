exports.getPanel = async function (req, res, next) {
    // TODO: check admin permissions
    res.render('admin/index', {title: 'Admin panel', req: req, res:res});
}

exports.getPublicationsPage = async function (req, res, next) {
    // TODO: check admin persmissions
    // TODO: implement
    res.render('admin/publications', {title: 'Publications administration', req: req, res: res});
}

exports.getUsersPage = async function (req, res, next) {
    // TODO: check admin permissions
    // TODO: implement
    res.render('admin/users', {title: 'Users administration', req: req, res: res});
}

exports.getServerManagementPage = async function (req, res, next) {
    res.render('admin/server', {title: 'Server management', req: req, res: res});
}