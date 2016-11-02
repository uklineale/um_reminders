var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var csv = require('csv');

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

app.post('/api/visits', function (req, res){
  var csv_string = req.body.csv_string;
  console.log(csv_string);

  var fields = csv_string.split(',');

  var visit = [
    {
      "lname" : fields[0],
      "fname" : fields[1],
      "number": fields[2],
      "date"  : fields[3]
    }
  ]

  db.collection('visits', {strict:true}, function(err, collection){
    if (err){
      console.log(err);
    } else{
      collection.insert( visit, {safe:true}, function(err, result){
        if (err){ console.log(err); }
      });
    }
  });

  res.send("Success: "+csv_string);
  console.log('Added a visit: ' + name + number + date);
});



app.post('/api/send', function (req, res){
  var message = req.body.message;

  //Send twilio
})

app.listen(3000, function () {
    console.log('Server running: port 3000');
});
