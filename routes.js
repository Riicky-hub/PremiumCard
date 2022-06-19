const express = require('express');
const route = express.Router();
// Rota Home
route.get('/', (req, res) => res.render('index'));
// Rotas do Account
route.get('/login', (req, res) => res.render('login'));
route.get('/register', (req, res) => res.render('register'));

module.exports = route;