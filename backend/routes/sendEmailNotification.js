const nodemailer = require('nodemailer');

// Function to send email notification
const sendEmailNotification = async (recipientEmail, grievanceDetails) => {
    try {
        // Create a Nodemailer transporter using SMTP
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'olindamsarma2001@gmail.com', // Sender email address
                pass: 'vzhd alvh esyd huvq' // Sender email password
            }
        });

        // Define email message options
        const mailOptions = {
            from: 'olindamsarma2001@gmail.com', // Sender email address
            to: recipientEmail, // Recipient email address
            subject: 'Grievance Addressed', // Email subject
            text: `Dear User,\n\nYour grievance with unique id:${grievanceDetails._id} for the category:${grievanceDetails.category} you are facing has been addressed. \nThank you for your patience.\n\nSincerely,\nNITS Admin` // Email body
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email notification sent:', info.response);
    } catch (error) {
        console.error('Error sending email notification:', error);
    }
};

module.exports = { sendEmailNotification };