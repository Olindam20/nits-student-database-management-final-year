const nodemailer = require('nodemailer');

// Function to send email notification
const sendEmailNotification = async (recipientEmail, grievanceDetails) => {
    try {
        // Create a Nodemailer transporter using SMTP
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'olindamsarma2001@gmail.com', // Sender email address
                pass: 'zhli rbhl urcd ucwx' // Sender email password
            }
        });

        // Define email message options
        const mailOptions = {
            from: 'olindamsarma2001@gmail.com', // Sender email address
            to: recipientEmail, // Recipient email address
            subject: 'Grievance Addressed Successfully', // Email subject
            text: `Dear User,\n\nYour grievance has been addressed.Thank you for your patience.(${grievanceDetails.email})\n\nSincerely,\nThe Grievance Team` // Email body
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email notification sent:', info.response);
    } catch (error) {
        console.error('Error sending email notification:', error);
    }
};

module.exports = { sendEmailNotification };