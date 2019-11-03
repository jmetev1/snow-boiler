const express = require('express');

const port = process.env.PORT || 3000;
app = express();
path = require('path');

const publicDir = path.join(__dirname, 'public');

app.get('/login', (req, res) => {
  res.send(JSON.stringify({ route: 'login' }));
});
app.get('/', (req, res) => {
  res.send(JSON.stringify({ route: '/' }));
});
app.get('/other', (req, res) => {
  res.send(JSON.stringify({ route: 'other' }));
});
app.use(express.static(publicDir));

app.listen(port);
module.exports = app;
