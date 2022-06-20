exports.messages = (req, res, next) => {
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    next();
}

exports.createCsrf = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}

exports.errorsMid = (err, req, res, next) => {
    if(err) {
        return res.render('404');
    }
}