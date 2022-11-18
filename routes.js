const express = require('express');
const routes = express.Router();
const homeController = require('./src/controllers/homeController');
const erro404 = require('./src/controllers/erro404');

// Rotas da HOME
routes.get('/', homeController.home);
routes.post('/', homeController.tratarDados);
// Rotas de ERROS
routes.get('*', erro404.erro);

module.exports = routes;