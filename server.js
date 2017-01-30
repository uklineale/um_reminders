//Vendor
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');
var formidable = require('formidable');
var parse = require('csv-parse');
var twilio = require('twilio');

//Not vendor - but I am my own product
var config = require('/root/um_reminders/config');
var port = process.env.PORT || 3000;
var upload = require('/root/um_reminders/routes/upload')
var uploads = require('/root/um_reminders/routes/uploads')
var app = express();

// Node config
app.use(express.static('/root/um_reminders/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));


//Routes
app.use('/api/upload',upload);
app.use('/api/uploads',uploads);


app.listen(port, function () {
    console.log('Server running: port '+port);
});
