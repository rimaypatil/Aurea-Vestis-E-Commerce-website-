const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    // reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Easy setup for Gmail, or use host/port for others
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // Email Template
    const htmlTemplate = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <div style="text-align: center; margin-bottom: 20px;">
                <h1 style="color: #333; margin: 0;">AUREA VESTIS</h1>
                <p style="color: #666; font-size: 14px;">Premium Fashion, Authentic You</p>
            </div>
            
            <div style="background-color: #f9f9f9; padding: 30px; border-radius: 8px; text-align: center;">
                <h2 style="color: #333; margin-top: 0;">Verification Code</h2>
                <p style="color: #555; font-size: 16px;">Please use the following OTP to complete your login procedure. This code is valid for 5 minutes.</p>
                
                <div style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #000; margin: 30px 0;">
                    ${options.code}
                </div>
                
                <p style="color: #999; font-size: 14px;">If you didn't request this, strictly ignore this email.</p>
            </div>
            
            <div style="text-align: center; margin-top: 20px; color: #aaa; font-size: 12px;">
                &copy; ${new Date().getFullYear()} Aurea Vestis. All rights reserved.
            </div>
        </div>
    `;

    const message = {
        from: `"${process.env.EMAIL_FROM_NAME || 'Aurea Vestis'}" <${process.env.EMAIL_USER}>`,
        to: options.email,
        subject: options.subject,
        html: htmlTemplate
    };

    const info = await transporter.sendMail(message);

    console.log('Message sent: %s', info.messageId);
};

module.exports = sendEmail;
