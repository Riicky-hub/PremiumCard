exports.userNotExists = (req, res, next) => {
    if(!req.session.user) {
        req.flash('errors', 'Você precisa fazer login!');
        req.session.save(() => {
            res.redirect('/login');
        });
        return;
    } else {
        next();
    }
}
exports.userExists = (req, res, next) => {
    if(req.session.user) {
        req.session.save(() => {
            res.redirect('/account');
        });
        return;
    } else {
        next();
    }
}