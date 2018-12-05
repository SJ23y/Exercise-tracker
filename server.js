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

const Log = new Schema({
  name: string,
  _id: ObjectId,
  log: [{}],
});

mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true }, function(err, db) {
    if (err) {console.log('Database error: ' + err);}
    else {
      console.log('Successful database connection');
      console.log();
    }
    
  app.get('/', function(request, response) {
    response.sendFile(__dirname + '/views/index.html');
});
  
  app.post('/api/exercise/new-user', function(req, res) {
    
    db.db('chopper').collection('exTracker').findOne({username: req.body.username}, function(err, user) {
          if (err) {res.send('error');} 
          else if (user) {
            res.send('Username already taken');
          }
          else {
          let newuser = {username: req.body.username, _id: uniqid(),log: []};
          db.db('chopper').collection('exTracker').insertOne(newuser, function(err, doc) {
            res.send(newuser);
          }); 
          }
  
    });
    
  });
  
  app.post('/api/exercise/add', function(req,res) {
    
    db.db('chopper').collection('exTracker').findOne({'_id': req.body.userId}, function(err, user) {
    if (err) {res.send('error');} 
    else if (!user) {
      res.send('Invalid userId ' + user);
      }
    else {
      user.log.push({
        description: req.body.description,
        duration: req.body.duration,
        date: req.body.date
      });
      
      user.save(function(err, doc) {
        res.send(doc);
      })
       
    }
    })
  })
  
  
});
// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});