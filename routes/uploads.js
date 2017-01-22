var constants = require('../constants');

module.exports = function(req, res){
  var uploadDir = contants.uploadDir;

  process.stdout.write("Uploads: ");
  
  fs.readdir(uploadDir, function(err, data){
    process.stdout.write(data + " ");
    res.json(data);
  });
});
