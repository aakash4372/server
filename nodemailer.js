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
            subject: "New Enquiry Received",
            replyTo: email,
            html: `
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Message:</strong> ${message}</p>
                <br>
                <p>Regards,<br>Education Team</p>
            `,
        };

        // Confirmation email to user
        const userMailOptions = {
            from: process.env.EMAIL_USER, 
            to: email,
            subject: "Your Enquiry Has Been Received",
            replyTo: process.env.EMAIL_USER,
            html: `
                <p>Dear ${name},</p>
                <p>Thank you for contacting us. We have received your enquiry and will respond soon.</p>
                <p><strong>Details Submitted:</strong></p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Message:</strong> ${message}</p>
                <p>If you have any urgent queries, please reach out to us.</p>
                <br>
                <p>Best regards,</p>
                <p>Education Team</p>
            `,
        };

        // Send email to owner
        await transporter.sendMail(ownerMailOptions);
        console.log("✅ Owner email sent successfully");

        // Small delay to avoid bulk email issues
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Send confirmation email to user
        await transporter.sendMail(userMailOptions);
        console.log("✅ User email sent successfully");

    } catch (error) {
        console.error("❌ Email Error:", error);
        throw new Error("Failed to send email");
    }
};

module.exports = sendMail;
