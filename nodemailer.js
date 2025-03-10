const nodemailer = require("nodemailer");

const sendMail = async (name, email, type, phone, location) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure:true,
    port: 465,
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail
      pass: process.env.EMAIL_PASS, 
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email, // Sends email to the user who fills the form
    subject: "Enquiry Received",
    text: `Hello ${name},\n\nThank you for your enquiry!\n\nDetails:\nType: ${type}\nPhone: ${phone}\nLocation: ${location}\n\nWe will contact you soon.\n\nBest Regards,\nYour Team`,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendMail;
