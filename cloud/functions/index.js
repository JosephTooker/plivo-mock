const functions = require('firebase-functions');
const admin = require('firebase-admin');
const sgMail = require('@sendgrid/mail');
admin.initializeApp(functions.config().firebase);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
sgMail.setApiKey('');
const db = admin.firestore();
exports.getemail = functions.https.onRequest((request, response) => {
  functions.logger.info('Hello logs!', {structuredData: true});
  console.log('This is bodu', request.body);
  const data = {text: request.body};
  db.collection('emailResponses').doc('emailResponsesId').set(data);
});

exports.postemails = functions.https.onRequest((request, response) => {
  console.log(request.body);
  const msg = {
    to: 'victorjosuepimentel21@gmail.com', // Your email where you'll receive emails
    from: 'victorjosuepimentel21@gmail.com', // your website email address here
    subject: `[Lead from website] : ${request.body.subject}`,
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html lang="en">
        <head>
          <meta charset="utf-8">

          <title>The HTML5 Herald</title>
          <meta name="description" content="The HTML5 Herald">
          <meta name="author" content="SitePoint">
        <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />

          <link rel="stylesheet" href="css/styles.css?v=1.0">

        </head>

        <body>
          <div class="img-container" style="display: flex;justify-content: center;align-items: center;border-radius: 5px;overflow: hidden; font-family: 'helvetica', 'ui-sans';">
                </div>
                <div class="container" style="margin-left: 20px;margin-right: 20px;">
                <h3>You've got a new mail from ${request.body.fullname}, their email is: ✉️${request.body.email} </h3>
                <div style="font-size: 16px;">
                <p>Message:</p>
                <p>${request.body.message}</p>
                <br>
                </div>
                <img src="https://manuarora.in/logo.png" class="logo-image" style="height: 50px;width: 50px;border-radius: 5px;overflow: hidden;">

                </div>
        </body>
        </html>`,
  };
  sgMail
      .send(msg)
      .then((response) => {
        console.log(response[0].statusCode);
        console.log(response[0].headers);
      })
      .catch((error) => {
        console.error(error);
      });
});
