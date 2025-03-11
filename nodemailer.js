const nodemailer = require('nodemailer');

const sendMail = async (name, email, phone, message) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const ownerMailOptions = {
            from: `"Education Team" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER, 
            subject: "New Enquiry Received",
            html: `
                <h3>New Enquiry Received</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Message:</strong> ${message}</p>
                <br>
                <p>Best Regards,<br><strong>Education Team</strong></p>
            `,
        };

        const userMailOptions = {
            from: `"Education Team" <${process.env.EMAIL_USER}>`, 
            to: email, // User's Email
            subject: "Thank You for Your Enquiry",
            html: `
                <h3>Dear ${name},</h3>
                <p>Thank you for reaching out! We have received your enquiry and will get back to you soon.</p>
                <p><strong>Your Enquiry Details:</strong></p>
                <ul>
                    <li><strong>Phone:</strong> ${phone}</li>
                    <li><strong>Message:</strong> ${message}</li>
                </ul>
                <p>If you need immediate assistance, feel free to contact us.</p>
                <br>
                <p>Best Regards,<br><strong>Education Team</strong></p>
            `,
        };

        
        await transporter.sendMail(ownerMailOptions);
        console.log("Owner email sent successfully");

        await new Promise(resolve => setTimeout(resolve, 2000));

        await transporter.sendMail(userMailOptions);
        console.log("User email sent successfully");

    } catch (error) {
        console.error("Nodemailer Error:", error);
        throw new Error("Failed to send email");
    }
};

module.exports = sendMail;
