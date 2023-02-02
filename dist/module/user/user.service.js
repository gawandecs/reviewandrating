"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = require("nodemailer");
const sendEmail = (email, id, token) => __awaiter(void 0, void 0, void 0, function* () {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "gawandecs123@gmail.com",
            pass: "mohvnbetnfouisng",
        },
    });
    let mailOptions = {
        from: "gawandecs123@gmail.com",
        to: email,
        subject: "Password Reset",
        //text: "Hello world?", // plain text body
        html: `<p>You request for password reset</p>
           <h5>click <a href="http://localhost:3000/reset/${id}/${token}">here for reset password</a></h5>
    `,
    };
    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log("Error Occurs");
        }
        else {
            console.log("Email sent successfully");
        }
    });
});
exports.default = sendEmail;
