const express = require('express');
const mongo = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



mongo.connect(process.env.MONGO_URI,{ useNewUrlParser: true }, function(err, db) {
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
          let user = {username: req.body.username};
          db.db('chopper').collection('exTracker').insertOne(user, function(err, doc) {
            res.send(user);
          }); 
          }
  
    });
    
  });
  
  app.post('/api/exercise/add', function(req,res) {
    
    db.db('chopper').collection('exTracker').findOne({_id: req.body.userId}, function(err, user) {
    if (err) {res.send('error');} 
    else if (!user) {
      res.send('Invalid userId');
      }
    else {
      let ex = {
        description: req.body.description
        duration: req.body.
      }
       
    }
    })
  })
  
  
});
// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});