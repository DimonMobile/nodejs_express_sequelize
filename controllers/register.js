const User = require('../models/user');

exports.getRegistrationPage = function(req, res, next) {
    res.render('register', {title: 'Sign In'});
}

exports.postRegistrationPage = function(req, res, next) {
    let messages = []
    let email = req.body.email;
    let nick = req.body.nick;
    let password = req.body.password;
    let repeatPassword = req.body.repeatPassword;

    if (password != repeatPassword) {
        messages.push('Your passwords are different, try again');
    }
    if (email.length < 3 || email.length > 36) {
        messages.push('Invalid email length');
    }
    if (nick.length < 3 || nick.length > 25) {
        messages.push('Invalid nickname length');
    }

    if (messages.length === 0) { // no errors
        messages.push("You've created an account!");
    }

    await User.create({nick: nick, email: email, password: password});
    res.render('register', {title: 'Sign in', messages: messages});
}