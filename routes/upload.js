var constants = require('../constants');
var config = require('../config');

module.exports = function() {

  const uploadDir = constants.uploadDir;

  const twilioClient = new twilio.RestClient(config.twilioAccountSid,
  config.twilioAuthToken);
  //EFR: practices of passing global variables: require them?
  var sendMessage = function (fname, lname, number, date){
    var options = {
      to: "+1" + number,
      from: config.twilioPhoneNumber,
      //read from messages
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

  console.log("Starting upload");
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

};
