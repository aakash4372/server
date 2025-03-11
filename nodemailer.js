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

        // Email to website owner
        const ownerMailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, 
            subject: "New Inquiry Received",
            replyTo: email,
            html: `
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Message:</strong> ${message}</p>
                <br>
                <p>Best regards,<br>Education Team</p>
            `,
        };

        // Confirmation email to user
        const userMailOptions = {
            from: process.env.EMAIL_USER, 
            to: email,
            subject: "Your Inquiry Has Been Received",
            replyTo: process.env.EMAIL_USER,
            html: `
                <p>Dear ${name},</p>
                <p>Thank you for reaching out! Our team has received your inquiry and will contact you soon.</p>
                <p><strong>Details Submitted:</strong></p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Message:</strong> ${message}</p>
                <br>
                <p>Best regards,</p>
                <p>Education Team</p>
            `,
        };

        // Send emails concurrently
        await Promise.all([
            transporter.sendMail(ownerMailOptions),
            transporter.sendMail(userMailOptions)
        ]);

        console.log("Emails sent successfully");

    } catch (error) {
        console.error("Email Error:", error);
        throw new Error("Failed to send email");
    }
};

module.exports = sendMail;
