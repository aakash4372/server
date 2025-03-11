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
            from: `"Education Team" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER, 
            subject: "New Inquiry Received",
            replyTo: email,
            html: `
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Message:</strong> ${message}</p>
                <br>
                <p>Best regards,</p>
                <p>Education Team</p>
                <hr>
                <p><small>This email was sent from the official Education Team website.</small></p>
            `,
        };

        // Confirmation email to user
        const userMailOptions = {
            from: `"Education Team" <${process.env.EMAIL_USER}>`, 
            to: email,
            subject: "We've Received Your Inquiry",
            replyTo: process.env.EMAIL_USER,
            html: `
                <p>Dear ${name},</p>
                <p>Thank you for getting in touch! We’ve received your inquiry and will respond within 24 hours.</p>
                <h4>Your Submitted Details:</h4>
                <ul>
                    <li><strong>Phone:</strong> ${phone}</li>
                    <li><strong>Message:</strong> ${message}</li>
                </ul>
                <p>For urgent inquiries, you can reply to this email or contact us directly at our official support.</p>
                <hr>
                <p>Best regards,</p>
                <p><strong>Education Team</strong></p>
                <p><small>1234 Education Street, City, Country | support@education.com</small></p>
                <p><small><a href="#">Unsubscribe</a></small></p>
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
