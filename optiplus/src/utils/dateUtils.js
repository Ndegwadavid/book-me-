import { format, addDays } from 'date-fns';

export const generateBookingNumber = () => {
  const date = format(new Date(), 'yyyyMMdd');
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `OPT${date}${random}`;
};

export const getTimeSlots = (location) => {
  const slots = [];
  let startHour = location === "Ronald Ngala Street Branch" ? 8 : 9;
  const startMinute = location === "Ronald Ngala Street Branch" ? 30 : 0;
  const endHour = 18; // 6 PM

  for (let hour = startHour; hour < endHour; hour++) {
    if (hour === startHour && startMinute === 30) {
      slots.push(`${hour.toString().padStart(2, '0')}:30`);
    } else {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      slots.push(`${hour.toString().padStart(2, '0')}:30`);
    }
  }

  return slots;
};

export const publicHolidays = [
  "2024-01-01", // New Year's Day
  "2024-04-01", // Easter Monday
  "2024-04-29", // Idd ul Fitr
  "2024-05-01", // Labour Day
  "2024-06-01", // Madaraka Day
  "2024-06-05", // Idd ul Adha
  "2024-10-10", // Huduma Day
  "2024-10-20", // Mashujaa Day
  "2024-12-12", // Jamhuri Day
  "2024-12-25", // Christmas Day
  "2024-12-26", // Boxing Day
];

export const isPublicHoliday = (date) => {
  const formattedDate = format(date, 'yyyy-MM-dd');
  return publicHolidays.includes(formattedDate);
};