var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var http = require('http');
var socketio = require('socket.io');

var app = express();
var server = http.Server(app);
var io = socketio(server);

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

//connect to MongoDB
var dbUrl = 'mongodb://localhost:27017/chatroom';

var Message = mongoose.model('Message',{ 
  name : String, 
  message : String
});

//back-end get method
app.get('/messages', (req, res) => {
  Message.find({},(err, messages)=> {
    res.send(messages);
  })
});

//back-end post method
app.post('/messages', (req, res) => {
  var message = new Message(req.body);
  message.save((err) =>{
    if(err)
      sendStatus(500);
    io.emit('message', req.body);
    res.sendStatus(200);
  })
});

//create connection
io.on('connection', () =>{
  //console.log('A user connected!');
})

mongoose.connect(dbUrl, {useNewUrlParser: true});

server = server.listen(3000, () => {
    console.log('Server is running on the port:', server.address().port);
  });