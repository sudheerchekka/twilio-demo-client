const express = require('express')
const app = express()
const bodyParser = require('body-parser');

const accountSid = process.env.TWILIO_ACCOUNT_SID; 
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')


console.log ('Twilio Account SID:' + accountSid);
app.get('/', function (req, res) {
  //res.send('Hello World!')
    res.render('index', {result: null, error: null});
})

app.post('/', function (req, res) {
  let customer_phone = req.body.cust_phone;
  
  client.messages
  .create({
     body: 'Our rep will give you a call shortly',
     from: '+14084098596',
     to: customer_phone
   }, function (error, message){
  
      if (!error){
         res.render('index', {result: 'SMS sent successfully', error: null});
      } else {
	      res.render('index', {result: null, error: 'Error, please try again'});
      }
   
   });

})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
