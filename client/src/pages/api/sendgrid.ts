import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey("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");

async function sendEmail(req: any, res: any) {
  console.log(req.body)



  


    try {
      await sendgrid.send({to: req.body.email, // Change to your recipient
      from: 'victorjosuepimentel21@gmail.com', // Change to your verified sender
      subject: req.body.subject,
      text: "why doont you work",
      html: `<p>${req.body.msg}</p>`,

      });
    } catch (error) {
      if (error instanceof Error) {
        // console.log(error);
        console.log("Error Got to API");
        return res.status(404);
      }
    }
    console.log("Got to API");
  
    return res.status(200).json({ error: "" });

  
  // try {
  //   await sendgrid.send({
  //     to: req.body.email, // Your email where you'll receive emails
  //     from: "victorjosuepimentel21@gmail.com", // your website email address here
  //     subject: `[Lead from website] : ${req.body.subject}`,
  //     html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  //         <html lang="en">
  //         <head>
  //           <meta charset="utf-8">
          
  //           <title>The HTML5 Herald</title>
  //           <meta name="description" content="The HTML5 Herald">
  //           <meta name="author" content="SitePoint">
  //         <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
          
  //           <link rel="stylesheet" href="css/styles.css?v=1.0">
          
  //         </head>
          
  //         <body>
  //           <div class="img-container" style="display: flex;justify-content: center;align-items: center;border-radius: 5px;overflow: hidden; font-family: 'helvetica', 'ui-sans';">              
  //                 </div>
  //                 <div class="container" style="margin-left: 20px;margin-right: 20px;">
  //                 <h3>You've got a new mail from ${req.body.fullname}, their email is: ✉️${req.body.email} </h3>
  //                 <div style="font-size: 16px;">
  //                 <p>Message:</p>
  //                 <p>${req.body.message}</p>
  //                 <br>
  //                 </div>
  //                 <img src="https://manuarora.in/logo.png" class="logo-image" style="height: 50px;width: 50px;border-radius: 5px;overflow: hidden;">
                  
  //                 </div>
  //         </body>
  //         </html>`,
  //   });
  // } catch (error) {
  //   if (error instanceof Error) {
  //     // console.log(error);
  //     console.log("Error Got to API");
  //     return res.status(404);
  //   }
  // }
  // console.log("Got to API");

  // return res.status(200).json({ error: "" });
}

export default sendEmail;
