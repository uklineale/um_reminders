var constants = require('../constants');
var config = require('../config');
var twilio = require('twilio');
var formidable = require('formidable');
var parse = require('csv-parse');
var fs = require('fs');
var path = require('path');


module.exports = function(req, res){

  const twilioClient = new twilio.RestClient(config.twilioAccountSid,
  config.twilioAuthToken);
  //EFR: practices of passing global variables: require them?
  var sendMessage = function (number, message){
    var options = {
      to: "+1" + number,
      from: config.twilioPhoneNumber,
      //read from messages
      body: message
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

  var uploadDir = constants.uploadDir;
  console.log("Starting upload to "+ uploadDir);

  var form = new formidable.IncomingForm();
  pathName = path.join(__dirname, uploadDir);
  form.uploadDir = pathName;

  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function(field, file) {
    var filepath = path.join(form.uploadDir, file.name);
    fs.rename(file.path, filepath);

    fs.createReadStream(filepath)
      .pipe(parse())
      .on('data', function(csvrow) {
        sendMessage(csvrow[0], csvrow[1]);
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

};
