const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello world!');
});
app.get('/contato', (req, res) => {
    res.send('Olá');
});
app.get('*', (req, res) => {
    res.send('ERRO 404');
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});