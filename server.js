var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongo = require('mongodb');

var Server = mongo.Server;
var Db = mongo.Db;

var app = express();

//Mongo config
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

app.post('/api/visit', function (req, res){
  var name = req.body.name;
  var number = req.body.number;
  var type = req.body.type;
  var date = req.body.date;

  console.log('Added a visit: ' + name + number + type + date);
});

app.post('/api/send', function (req, res){
  var message = req.body.message;

  //Send twilio
})

app.listen(3000, function () {
    console.log('Server running: port 3000');
});
