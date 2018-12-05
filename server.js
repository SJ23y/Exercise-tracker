const express = require('express');
const uniqid = require('uniqid')
const mongo = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const mongoose = require('mongoose');
const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const logSchema = new Schema({
  name: String,
  _id: String,
  log: [{}],
});

const Log = mongoose.model('Log', logSchema);

const connection = mongoose.connect(process.env.MONGO_URI);

  app.get('/', function(req,res) {
    res.sendFile(__dirname + '/views/index.html')
  })
      
  app.post('/api/exercise/new-user', function(req, res) {
    
    Log.findOne({name: req.body.username}, function(err, user) {
      if (err) {res.send('Error when try to find user')}
    })
    let newUser = new Log({name: req.body.username, _id: uniqid(),log: []});
    newUser.save(function(err,user) {
      if (err) { res.send('Error: ' + err); }
      else { res.send(user); }
    })
  });
  
  app.post('/api/exercise/add', function(req,res) {
    
  
  
});
// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});