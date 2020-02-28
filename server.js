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
  let customer_phone = "+1" + req.body.cust_phone;
  let customer_name = req.body.cust_name;
  //let smsBody = req.body.msgPicker;
  smsBody = "Hi " + customer_name + ", thanks for contacting Vivint SmartHome. This is Vivint Bot.  Are you interested in home security, automation, cameras or speak to an agent now?";

  console.log ("req.body.cust_phone: " + req.body.cust_phone);
  console.log ("req.body.cust_name: " + req.body.cust_name);
  
  client.messages
  .create({
     body: smsBody,
     from: from_twilio,
     to: customer_phone
   }, function (error, message){
  
      if (!error){
         res.render('index', {result: 'SMS sent successfully', error: null});
         console.log("SMS sent successfully !");
      } else {
        res.render('index', {result: 'default message', error: 'Error, please try again'});
        console.log(error);
      }
   
   });

})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
