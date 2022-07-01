const express = require('express');
const route = express.Router();
const accountController = require('./src/controllers/accountController');
const { userNotExists, userExists } = require('./src/middlewares/userExists');
// Rota Home
route.get('/', (req, res) => res.render('index'));
// Rotas do Register/Login
route.get('/login', userExists, accountController.loginIndex);
route.post('/login', accountController.login);
route.get('/register', userExists, accountController.registerIndex);
route.post('/register', accountController.register);
// Rotas do Account
route.get('/account', (req, res) => { res.render('404') });
route.get('/account/:id', userNotExists, accountController.accountIndex);
route.get('/accountConfig', (req, res) => { res.render('404') });
route.get('/accountConfig/:id', userNotExists, accountController.accountConfigIndex);
route.post('/accountConfig', userNotExists, accountController.temp);
route.get('/logout', accountController.logout);

module.exports = route;