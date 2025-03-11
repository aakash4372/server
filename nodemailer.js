const nodemailer = require('nodemailer');

const sendMail = async (name, email, phone, message) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Email to website owner
  const ownerMailOptions = {
    from: `"Education Team" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: "New Inquiry Received",
    html: `
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Message:</strong> ${message}</p>
            <br>
            <p>Best regards,</p>
            <p>LEARNENG EDUCATION</p>
        `,
  };

  // Confirmation email to user
  const userMailOptions = {
    from: `"Education Team" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Thank you for your Enquiry!",
    html: `
            <p>Dear ${name},</p>
            <p>Thank you for getting in touch! We’ve received your enquiry and will contact you soon.</p>
            <br/>
            <h4>Your Submitted Details:</h4>
            <h5><strong>Phone:</strong> ${phone}</h5>
            <h5><strong>Message:</strong> ${message}</h5>
            <br/>
            <p>Best regards,</p>
            <p><strong>LEARNENG EDUCATION</strong></p>
            
        `,
  };

  // Send emails concurrently
  await transporter.sendMail(ownerMailOptions);
  await transporter.sendMail(userMailOptions);

  console.log("Emails sent successfully");
};

module.exports = sendMail;
