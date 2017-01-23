var constants = require('../constants');
var fs = require('fs');
var path = require('path');

module.exports = function(req, res){
  var uploadDir = path.join(__dirname, constants.uploadDir);
  process.stdout.write("Uploads from " + uploadDir + ": ");

  fs.readdir(uploadDir, function(err, data){
    if (err) { console.log("In uploads.js: \n" + err);}
    process.stdout.write(data + " ");
    res.json(data);
  });
};
