const express = require('express');
const route = express.Router();
const accountController = require('./src/controllers/accountController');
// Rota Home
route.get('/', (req, res) => res.render('index'));
// Rotas do Account
route.get('/login', (req, res) => res.render('login'));
route.get('/register', (req, res) => res.render('register'));
route.get('/account', (req, res) => res.render('account'));

module.exports = route;