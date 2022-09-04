
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const sgMail = require("@sendgrid/mail");
admin.initializeApp(functions.config().firebase);

const simpleParser = require("mailparser").simpleParser;

sgMail.setApiKey("");
const db = admin.firestore();

exports.getemail = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
//   console.log("This is body", request.body.toString());


  simpleParser(request.body.toString(), (err, parsed) => {
    console.log(parsed);
    return parsed
    
  });

  const data = { text:   simpleParser(request.body.toString(), (err, parsed) => {
    return parsed
  })};

  db.collection("emailResponses").doc("emailResponses_test").set(data);
});
