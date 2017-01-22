module.exports = function(req, res){
  process.stdout.write("Uploads: ");
  fs.readdir(uploadDir, function(err, data){
    process.stdout.write(data + " ");
    res.json(data);
  });
});
