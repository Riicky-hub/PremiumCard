require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const routes = require('./routes');
const { createCsrf, errorsMid, messages } = require('./src/middlewares/middlewareGlobal');
const mongoose = require('mongoose');
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbCluster = process.env.DB_CLUSTER;
const connectString = `mongodb+srv://${dbUser}:${dbPassword}@mainserver.8crzy.mongodb.net/${dbCluster}?retryWrites=true&w=majority`
mongoose.connect(connectString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { app.emit('readyMongo'); console.log('Banco de dados conectado'); })
    .catch(e => console.log(e));
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const session = require('express-session');
const helmet = require('helmet');
const csrf = require('csurf');
const port = process.env.PORT || 5000;

const sessionOptions = session({
    secret: 'Mensagem secreta. :)',
    store: MongoStore.create({ mongoUrl: connectString }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'frontend')));

app.use(sessionOptions);
app.use(flash());
// app.use(helmet());

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(csrf());
app.use(createCsrf);
app.use(errorsMid);
app.use(messages);
app.use(routes);

app.on('readyMongo', () => {
    app.listen(port, () => {
        console.log(`Acesse: http://localhost:${port}`);
    });
});

