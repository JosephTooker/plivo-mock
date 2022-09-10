require("dotenv").config();

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID
const twilioClient = require('twilio')(accountSid, authToken)

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

module.exports = { sendText }