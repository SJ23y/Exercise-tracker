const express = require('express');
const mongo = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
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
    
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});