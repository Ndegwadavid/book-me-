// Kenyan Public Holidays for 2024-2025
export const publicHolidays = [
    // 2024 Holidays
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
  
    // 2025 Holidays
    "2025-01-01", // New Year's Day
    "2025-04-21", // Easter Monday
    "2025-05-01", // Labour Day
    "2025-06-01", // Madaraka Day
    "2025-10-10", // Huduma Day
    "2025-10-20", // Mashujaa Day
    "2025-12-12", // Jamhuri Day
    "2025-12-25", // Christmas Day
    "2025-12-26"  // Boxing Day
  ];
  
  export const isPublicHoliday = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    return publicHolidays.includes(formattedDate);
  };