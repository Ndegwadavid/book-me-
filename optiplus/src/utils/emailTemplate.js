export const emailTemplate = {
    subject: "OptiPlus Appointment Confirmation - {{booking_number}}",
    body: `
      Dear {{to_name}},
  
      Your appointment has been confirmed with OptiPlus Eye Care. Here are your booking details:
  
      Booking Number: {{booking_number}}
      Service: {{service}}
      Date: {{appointment_date}}
      Time: {{appointment_time}}
      Location: {{location}}
  
      Branch Contact: {{branch_phone}}
  
      Important Information:
      - Please arrive 10 minutes before your appointment time
      - Bring any current eyewear you use
      - If you need to reschedule, please contact us at least 24 hours in advance
  
      If you have any questions, please don't hesitate to contact us.
  
      Best regards,
      OptiPlus Eye Care Team
      Year {{current_year}}
    `
  };