var express = require('express');
var port = process.env.PORT || 3000;
var app = express(),
  path = require('path'),
  buildDir = path.join(__dirname, 'build');

app.use(express.static(buildDir))

app.listen(port);
module.exports = app;