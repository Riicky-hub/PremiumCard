const Account = require('../models/AccountModel');

exports.loginIndex = (req, res) => {
    res.render('login');
}

exports.registerIndex = (req, res) => {
    res.render('register');
}

exports.accountIndex = (req, res) => {
    res.render('account');
}

exports.accountConfigIndex = (req, res) => {
    res.render('accountConfig');
}
exports.register = async (req, res) => {
    try {
        const account = new Account(req.body);
        await account.register();

        if(account.errors.length > 0) {
            req.flash('errors', account.errors);
            req.session.save(() => {
                return res.redirect('back');
            });
            return;
        }

        req.flash('success', 'Sua conta foi criada com sucesso!');
        req.session.save(() => {
            return res.redirect('back');
        });
    } catch(e) {
        console.log(e);
        res.render('404');
    }
}
exports.login = async (req, res) => {
    try {
        const account = new Account(req.body);
        await account.login();

        if(account.errors.length > 0) {
            req.flash('errors', account.errors);
            req.session.save(() => {
                return res.redirect('back');
            });
            return;
        }

        req.session.user = account.user;
        req.session.save(() => {
            return res.redirect('/');
        });
    } catch(e) {
        console.log(e);
        res.render('404');
    }
}
exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
}