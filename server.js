const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();


const accountSid = process.env.TWILIO_ACCOUNT_SID; 
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const from_twilio = process.env.TWILIO_PHONE;

var smsResponse = "";

//websocker serer set up
var WebSocketServer = require('ws').Server,
  wss = new WebSocketServer({port: 40510})

wss.on('connection', function (ws) {
  ws.on('message', function (message) {
    console.log('received: %s', message)
  })
  //TODO: figure out a way to send message to the client only when the /sms webhook is called
  setInterval(
    () => ws.send(smsResponse),
    1000
  )
})

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')


console.log ('Twilio Account SID:' + accountSid);
console.log ('Twilio Phone:' + from_twilio);



app.get('/', function (req, res) {
  //res.send('Hello World!')
    res.render('index', {result: null, error: null});
})

//Twilio calls this webhook when SMS is received
app.post('/sms', function (req, res) {
  console.log("called /sms: " + req.body.From);
  smsResponse = "Received message from " + req.body.From + ": " + req.body.Body;
})

//send SMS with Twilio API
app.post('/', function (req, res) {
  smsResponse = "";
  let customer_phone = req.body.cust_phone;
  let smsBody = req.body.msgPicker;

  console.log ("req.body.msgPicker: " + req.body.msgPicker);
  
  client.messages
  .create({
     body: smsBody,
     from: from_twilio,
     to: customer_phone
   }, function (error, message){
  
      if (!error){
         res.render('index', {result: 'SMS sent successfully', error: null});
      } else {
	      res.render('index', {result: 'default message', error: 'Error, please try again'});
      }
   
   });

})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
