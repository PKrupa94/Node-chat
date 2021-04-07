var express = require('express');
var bodyparser = require('body-parser'); //for browser post request
var mongoose = require('mongoose');
const { strict } = require('assert');


var app = express()
var http = require('http').Server(app) //binding express with node server
var io = require('socket.io')(http) // binding socket io with express via node http server
var dbUrl = "mongodb+srv://user:user@node-chat.ziuf5.mongodb.net/node-chat?retryWrites=true&w=majority"

app.use(express.static(__dirname))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:false}))

//mongoose object
var Message = mongoose.model('Message',{
    name:String,
    message:String
})

//get messages to display on screen
app.get('/messages',(req,res) => {
    Message.find({},(err,messages) => {
        res.send(messages)
    })
})

//post messages
app.post('/messages',(req,res) => {
    var message = new Message(req.body)
    message.save((err) => {
        if(err)
            sendStatus(500)
            messages.push(req.body)
            io.emit('message',req.body)
            res.sendStatus(200)
    })
})

//socket io connection with browser
io.on('connection', (Socket) => {
    console.log('user connected')
})

//mongodb connection with database
mongoose.connect(dbUrl,{useNewUrlParser:true},(err) => {
    console.log('mongo db connection',err)
})

var server = http.listen(5000, () => {
    console.log('server is listening on port',server.address().port)
})