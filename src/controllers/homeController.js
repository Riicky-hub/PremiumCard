exports.home = (req, res) => {
    res.render('index');
}
exports.tratarDados = (req, res) => {
    res.send(`Olá ${req.body.cliente}`);
}