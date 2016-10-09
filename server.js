var express = require('express');
var app = express();

app.get('/', function(req, res) {
    res.render('index');
});

app.set('views', __dirname + '/public');
app.set('view engine', 'html');

app.listen(3000, function () {
    console.log('Server running: port 3000');
});
