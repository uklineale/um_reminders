var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var csv = require('csv');
var fs = require('fs');
var formidable = require('formidable');

var Server = mongo.Server;
var Db = mongo.Db;

var app = express();

// Mongo config
var server = new Server('localhost', 27017, {auto_reconnect:true});
var db = new Db('umr', server);
var init = [
  {
    fname: "Latoya",
    lname: "Lewis",
    phone: "9194002343",
    date : "2016-10-25T09:00"
  }
];

db.open(function(err, db) {
  if (err) {
    console.log(err);
  } else {
    db.collection('visits', {strict:true}, function(err, collection){
      if (err){
        console.log(err);
      } else{
        collection.insert( init, {safe:true}, function(err,result){
          if (err){
            console.log(err);
          }
        });
      }
    });
  }
});

// Node config
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

// App config
const uploadDir = './uploads';


app.post('/api/visits', function (req, res){
  var form = new formidable.IncomingForm();
  form.uploadDir = path.join(__dirname, '/uploads');

  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function(field, file) {
    console.log(file.name);
    fs.rename(file.path, path.join(form.uploadDir, file.name));
  });

  // log any errors that occur
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function() {
    res.end('success');
  });

  // parse the incoming request containing the form data
  form.parse(req);
  // db.collection('visits', {strict:true}, function(err, collection){
  //
  // });
});

/* TODO: Delete functionality
 * Sends all the csvs to Angular
 */
app.get('/api/uploads', function(req, res){
  console.log("Uploads");
  fs.readdir(uploadDir, function(err, data){
    console.log(data);
    res.json(data);
  });
});



app.post('/api/send', function (req, res){
  var messageEng  = req.body.messageEng;
  var messageSpan = req.body.messageSpan;

  //Send twilio
});

app.listen(3000, function () {
    console.log('Server running: port 3000');
});
