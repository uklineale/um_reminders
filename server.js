var express = require('express');
var path = require('path');
var app = express();

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(3000, function () {
    console.log('Server running: port 3000');
});
