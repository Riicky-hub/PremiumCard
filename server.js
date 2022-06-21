require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const routes = require('./routes');
const { createCsrf, errorsMid, messages } = require('./src/middlewares/middlewareGlobal');
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTSTRING, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { app.emit('readyMongo'); console.log('Banco de dados conectado') })
    .catch(e => console.log(e));
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const session = require('express-session');
const helmet = require('helmet');
const csrf = require('csurf');

const sessionOptions = session({
    secret: 'Mensagem secreta. :)',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
});

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'frontend')));

app.use(sessionOptions);
app.use(flash());
app.use(helmet());

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(csrf());
app.use(createCsrf);
app.use(errorsMid);
app.use(messages);
app.use(routes);

app.on('readyMongo', () => {
    app.listen(3000, () => {
        console.log('Acesse: http://localhost:3000');
    })
});

