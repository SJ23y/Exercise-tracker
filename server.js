const express = require('express');
const mongo = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
var uniqid = require('uniqid');
const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



mongo.connect(process.env.MONGO_URI, function(err,db) {
    if (err) {console.log('Database error: ' + err);}
    else {
      console.log('Successful database connection');
    }
    
  app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
  
  app.post('/api/exercise/new-user', function(req, res) {
    
    db.collection('exTracker').findOne({username: req.body.username}, function(err, user) {
          if (err) {res.send('error');} 
          else if (user) {
            res.send('Username already taken');
          }
          else {
          
          db.collection('exTracker').insertOne({username: req.body.username, id: uniqid()}, function(err, user) {
            res.send(user);
          }); 
          }
  
});
    
});
});
// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});