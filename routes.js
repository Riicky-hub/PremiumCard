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
route.get('/account', userNotExists, accountController.accountIndex);
route.get('/logout', accountController.logout);
route.get('/accountConfig', userNotExists, accountController.accountConfigIndex);
// route.post('/accountConfig', userNotExists, accountController.accountConfigIndex);

module.exports = route;