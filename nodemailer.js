const nodemailer = require("nodemailer");

const sendMail = async (name, email, phone, message) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: true,
    port: 465,
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS, 
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Sends email to the user who fills the form
    subject: "Enquiry Received",
    text: `Hello ${name},\n\nThank you for your enquiry!\n\nDetails:\nPhone: ${phone}\nMessage: ${message}\n\nWe will contact you soon.\n\nBest Regards,\nYour Team`,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendMail;
