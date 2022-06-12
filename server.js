require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const routes = require('./routes');
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTSTRING, { useNewUrlParser: true, useUnifiedTopology })
    .then(() => { app.emit('readyMongo'); console.log('Banco de dados conectado') })
    .catch(e => console.log(e));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'frontend')));

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(routes);

app.on('readyMongo', () => {
    app.listen(3000, () => {
        console.log('Acesse: http://localhost:3000');
    })
});

