const Account = require('../models/AccountModel');
exports.login = (req, res) => {

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