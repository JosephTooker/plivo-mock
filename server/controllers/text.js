require("dotenv").config();
const { MessagingResponse } = require('twilio').twiml;

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID
const twilioClient = require('twilio')(accountSid, authToken)

var admin = require("firebase-admin");

var serviceAccount = require("../plivo-mock-firebase-adminsdk-geiew-cb0fbdf553.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://plivo-mock-default-rtdb.firebaseio.com"
});

const sendText = (req, res) => {
    const { body, number } = req.body
    twilioClient.messages
        .create({
            body: body,
            messagingServiceSid: messagingServiceSid,
            to: number
        })
        .then(message => console.log(message.sid))
        .done()
}

const receiveText = async (req, res) => {
    const { Body, From, FromCity, FromState, MessageSid } = req.body
    const twiml = new MessagingResponse();

    twiml.message(Body);

    //res.type('text/xml').send(twiml.toString());

    let db = admin.firestore()
    let a = db.collection('text-form')
    let docRef=a.doc(From)
    await docRef.set({
        location: FromState,
        message: Body,
        phone_number: From,
        sid: MessageSid
    });

    res.send('done');
}

module.exports = { sendText, receiveText }