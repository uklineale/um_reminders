var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');
var formidable = require('formidable');
var parse = require('csv-parse');
var config = require('./config');
var twilio = require('twilio');
var port = process.env.PORT || 3000;

var app = express();
// Node config
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

// App config
const uploadDir = 'uploads';
const twilioClient = new twilio.RestClient(config.twilioAccountSid,
  config.twilioAuthToken);

function sendMessage(fname, lname, number, date){
  //Parse date based on real data
  var options = {
    to: "+1" + number,
    from: config.twilioPhoneNumber,
    body: "This is your sample appointment, " + fname+ " "+lname+": "+date
  }

  twilioClient.sendMessage(options, function(err, response){
    if (err){
      console.error(err);
    } else {
      var masked = number.substr(0, number.length - 5);
      masked += '*****';
      console.log('Message sent to '+masked);
    }
  });
}

app.post('/api/upload', function (req, res){

  var form = new formidable.IncomingForm();
  form.uploadDir = path.join(__dirname, uploadDir);

  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function(field, file) {
    console.log("Filepath: "+file.path)
    var filepath = path.join(form.uploadDir, file.name);
    fs.rename(file.path, filepath);

    fs.createReadStream(filepath)
      .pipe(parse())
      .on('data', function(csvrow) {
        sendMessage(csvrow[0], csvrow[1], csvrow[2], csvrow[3]);
      })
      .on('end', function(){
        console.log("Done parsing");
      })
      .on('error', function(err){
        console.log("Err: "+err);
      });
  });

  // log any errorrs that occur
  form.on('error', function(err) {
	console.log("Error in CSV Parsing");
    if (err) throw err;
  });

  //Send back to client
  form.on('end', function() {
    res.end('success');
  });

  form.parse(req);
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




app.post('/api/updateMessage', function (req, res){
  var messageEng  = req.body.messageEng;
  var messageSpan = req.body.messageSpan;

  console.log(messageEng);
  console.log(messageSpan);
  //Send twilio
});

app.listen(port, function () {
    console.log('Server running: port '+port);
});
