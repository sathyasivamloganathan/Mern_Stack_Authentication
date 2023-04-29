import nodemailer from "nodemailer";
import mailgen from "mailgen";

import ENV from "../config.js";


//gmail
let nodeConfig = {
    service: "gmail",
    auth: {
      user: ENV.EMAIL, 
      pass: ENV.PASSWORD,
    },
  };
  
  
  let transporter = nodemailer.createTransport(nodeConfig);
  
  let mailGenerator = new mailgen({
      theme: "default",
      product: {
          name: "Mailgen",
          link: 'https://mailgen.js/'
      }
  })
  
  export const registerMail = async (req,res) => {
      const {username, userEmail, text, subject} = req.body;
      //body of the email
  
      var email = {
          body: {
              name: username,
              intro: text || "Default Value",
              outro: "Need help, or have questions. Just reply to this mail"
          }
      }
  
      var emailBody = mailGenerator.generate(email)
      let message = {
          from : ENV.EMAIL,
          to: userEmail,
          subject: subject || "SignUp Successful",
          html: emailBody
      }
  
  
      //to send mail
      transporter.sendMail(message)
      .then(() => {
          return res.status(200).send({msg:"You should receive an emil from us"})
      })
      .catch(error => res.status(500).send({error}))
  }
  
