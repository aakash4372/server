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

  // Email to Website Owner
  const ownerMailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Website owner email
    subject: "New Enquiry Received",
    text: `Hello,

You have received a new enquiry.

Details:
Name: ${name}
Email: ${email}
Phone: ${phone}
Message: ${message}

Please follow up with the user soon.

Best Regards,
Your Team`,
  };

  // Thank You Email to User
  const userMailOptions = {
    from: process.env.EMAIL_USER,
    to: email, // User's email
    subject: "Thank You for Your Enquiry",
    text: `Hello ${name},

Thank you for reaching out! We have received your enquiry and will get back to you soon.

Your Enquiry Details:
Phone: ${phone}
Message: ${message}

If you need immediate assistance, feel free to contact us.

Best Regards,
Your Team`,
  };

  // Send emails
  await transporter.sendMail(ownerMailOptions);
  await transporter.sendMail(userMailOptions);
};

module.exports = sendMail;
