import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(join(__dirname, 'public')));

// Email transporter setup
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'mail.optiplus.co.ke',
  port: process.env.SMTP_PORT || 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER || 'appointments@optiplus.co.ke',
    pass: process.env.EMAIL_PASSWORD
  }
});

// Test email connection
transporter.verify(function (error, success) {
  if (error) {
    console.log('Email server error:', error);
  } else {
    console.log("Email server is ready");
  }
});

// Email template
const generateEmailHTML = (data) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #1d4ed8; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; background-color: #f8fafc; }
    .details { margin: 20px 0; padding: 15px; background-color: white; border-radius: 5px; }
    .footer { text-align: center; padding: 20px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Appointment Confirmation</h1>
      <p>Booking Reference: ${data.booking_number}</p>
    </div>
    
    <div class="content">
      <p>Dear ${data.to_name},</p>
      
      <p>Your appointment with OptiPlus has been confirmed. Here are your booking details:</p>
      
      <div class="details">
        <p><strong>Service:</strong> ${data.service}</p>
        <p><strong>Date:</strong> ${data.appointment_date}</p>
        <p><strong>Time:</strong> ${data.appointment_time}</p>
        <p><strong>Location:</strong> ${data.location}</p>
      </div>
      
      <p><strong>Important Information:</strong></p>
      <ul>
        <li>Please arrive 10 minutes before your appointment time</li>
        <li>Bring any current eyewear you use</li>
        <li>If you need to reschedule, please contact us at least 24 hours in advance</li>
      </ul>
      
      <p>If you need to make any changes to your appointment or have any questions, please contact us:</p>
      <p>📞 Phone: ${data.branch_phone}</p>
      <p>✉️ Email: appointments@optiplus.co.ke</p>
    </div>
    
    <div class="footer">
      <p>© ${new Date().getFullYear()} OptiPlus Eye Care. All rights reserved.</p>
      <p>This is an automated message from our appointment booking system.</p>
    </div>
  </div>
</body>
</html>
`;

// Booking endpoint
app.post('/api/book-appointment', async (req, res) => {
  console.log('Received booking request:', req.body);
  
  try {
    const {
      booking_number,
      to_name,
      email,
      service,
      appointment_date,
      appointment_time,
      location,
      branch_phone
    } = req.body;

    // Send confirmation email to client
    const clientMailOptions = {
      from: '"OptiPlus Eye Care" <appointments@optiplus.co.ke>',
      to: email,
      subject: `OptiPlus Appointment Confirmation - ${booking_number}`,
      html: generateEmailHTML({
        booking_number,
        to_name,
        service,
        appointment_date,
        appointment_time,
        location,
        branch_phone
      })
    };

    // Send notification to admin
    const adminMailOptions = {
      from: '"OptiPlus Booking System" <appointments@optiplus.co.ke>',
      to: 'appointments@optiplus.co.ke',
      subject: `New Appointment Booking - ${booking_number}`,
      html: `
        <h2>New Appointment Booking</h2>
        <p><strong>Booking Number:</strong> ${booking_number}</p>
        <p><strong>Client Name:</strong> ${to_name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Date:</strong> ${appointment_date}</p>
        <p><strong>Time:</strong> ${appointment_time}</p>
        <p><strong>Location:</strong> ${location}</p>
      `
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(clientMailOptions),
      transporter.sendMail(adminMailOptions)
    ]);

    console.log('Emails sent successfully');
    res.json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ error: 'Failed to send confirmation email', details: error.message });
  }
});

// Serve React app
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'index.html'));
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(500).json({ error: 'Something went wrong!', details: err.message });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Environment:', process.env.NODE_ENV);
});