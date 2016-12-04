var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');
var formidable = require('formidable');
var parse = require('csv-parse');



var app = express();

// Node config
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

// App config
const uploadDir = 'uploads';



app.post('/api/visits', function (req, res){

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
        console.log(csvrow);
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




app.post('/api/send', function (req, res){
  var messageEng  = req.body.messageEng;
  var messageSpan = req.body.messageSpan;

  console.log(messageEng);
  console.log(messageSpan);
  //Send twilio
});

app.listen(3000, function () {
    console.log('Server running: port 3000');
});
