exports.createCsrf = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}

exports.errorCsrf = (err, req, res, next) => {
    if(err && err.code === 'EBADCSRFTOKEN') {
        return res.render('err404');
    }
}