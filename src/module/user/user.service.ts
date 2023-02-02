"use strict";
const nodemailer = require("nodemailer");

const sendEmail = async (email: string, id: string, token: string) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
      user: "gawandecs123@gmail.com",
      pass: "mohvnbetnfouisng",
    },
  });

  let mailOptions = {
    from: "gawandecs123@gmail.com", // sender address
    to: email, // list of receivers
    subject: "Password Reset", // Subject line
    //text: "Hello world?", // plain text body
    html: `<p>You requested for password reset</p>
           <h5>click <a href="http://localhost:3000/reset/${id}/${token}">here for reset password</a></h5>
    `,
  };

  transporter.sendMail(mailOptions, function (err: string, data: string) {
    if (err) {
      console.log("Error Occurs");
    } else {
      console.log("Email sent successfully");
    }
  });
};

export default sendEmail;
