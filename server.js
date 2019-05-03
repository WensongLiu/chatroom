var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

var server = app.listen(3000, () => {
    console.log('Server is running on the port:', server.address().port);
  });

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

//connect to MongoDB
var dbUrl = 'mongodb://localhost:27017/chatroom';

mongoose.connect(dbUrl, {useNewUrlParser: true});
var Message = mongoose.model(‘Message’,{ name : String, message : String})

