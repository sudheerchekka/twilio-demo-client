<a href="https://www.twilio.com">
  <img src="https://static0.twilio.com/marketing/bundles/marketing/img/logos/wordmark-red.svg" alt="Twilio" width="250" />
</a>

# Twilio Demo Client

This sample project is based on node.js and Express to provoide a simple client application that can be customized to demo Twilio capabilities.


## Configure the sample application

To run the application, you'll need to gather your Twilio account credentials and configure them
as shell variables or in the .env file

| Config Value  | Description |
| :-------------  |:------------- |
`TWILIO_ACCOUNT_SID` | Your primary Twilio account identifier - find this [in the console here](https://www.twilio.com/console).
`TWILIO_AUTH_TOKEN` | Auth Token  - find this [in the console here](https://www.twilio.com/console).
`TWILIO_PHONE` | Any SMS enabled Twilio Phone #

### Install all node dependencies

```bash
npm install
```


### Start the client application

```bash
node serer.js
```

