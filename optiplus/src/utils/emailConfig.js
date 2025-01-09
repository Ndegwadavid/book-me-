import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: 'mail.optiplus.co.ke', // Your cPanel mail server
  port: 465, // Usually 465 for SSL
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'appointments@optiplus.co.ke',
    pass: process.env.EMAIL_PASSWORD // We'll store this in environment variables
  }
});