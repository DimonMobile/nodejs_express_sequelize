const crypto = require('crypto');
const User = require('../models/user');

exports.signIn = async function(req, res, next) {
    let email = req.body.email.toLowerCase().trim();
    let password = req.body.password;

    let user = await User.findOne({ where: { email: email } });
    let hashedPass = crypto.createHash('sha256').update(password).digest('hex');
    if (user != null && user.password === hashedPass) {
        // TODO: add information about user to session
        res.redirect('/');
    } else {
        messages = ['Wrong email or password, try again'];
        res.render('register', { title: 'Register', messages: messages });
    }


}