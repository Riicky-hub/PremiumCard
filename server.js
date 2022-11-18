const express = require('express');
const app = express();
const port = 3000;
const routes = require('./routes');
const path = require('path');
const { middlewareGlobal } = require('./src/middlewares/middlewares');

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.resolve(__dirname, 'public')));

app.use(middlewareGlobal);
app.use(routes);

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});