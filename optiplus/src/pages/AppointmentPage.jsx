import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { 
  Calendar, 
  Clock, 
  Eye, 
  MapPin, 
  CalendarCheck, 
  CheckCircle,
  User,
  Mail,
  Phone,
  MessageSquare,
  ChevronRight,
  ArrowRight,
  Home
} from 'lucide-react';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const AppointmentPage = () => {
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    service: '',
    appointmentDate: null,
    appointmentTime: '',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookingNumber, setBookingNumber] = useState('');

  const locations = [
    "Moi Avenue Branch - Nacico Chambers",
    "Ronald Ngala Street Branch"
  ];

  const services = [
    { 
      id: 'eye-test', 
      name: 'Eye Examination', 
      duration: '45 mins',
      price: 'FREE'
    },
    { 
      id: 'contact-lens', 
      name: 'Contact Lens Fitting', 
      duration: '30 mins',
      price: 'KSH 3,500'
    },
    { 
      id: 'glasses-fitting', 
      name: 'Glasses Fitting', 
      duration: '30 mins',
      price: 'Free with purchase'
    },
    { 
      id: 'repairs', 
      name: 'Repairs & Adjustments', 
      duration: '20 mins',
      price: 'From KSH 500'
    }
  ];

  const generateBookingNumber = () => {
    const date = format(new Date(), 'yyyyMMdd');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `OPT${date}${random}`;
  };

  const getTimeSlots = (location) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const generatedBookingNumber = generateBookingNumber();

    try {
      const templateParams = {
        from_name: "OptiPlus Eye Care",
        to_name: `${formData.firstName} ${formData.lastName}`,
        booking_number: generatedBookingNumber,
        service: formData.service,
        appointment_date: format(formData.appointmentDate, 'MMMM do, yyyy'),
        appointment_time: formData.appointmentTime,
        location: formData.location,
        branch_phone: formData.location.includes('Ronald Ngala') ? '+254 702 220 545' : '+254 105 165 560',
        current_year: new Date().getFullYear().toString(),
        reply_to: formData.email
      };

      console.log('Sending email with params:', templateParams);

      await emailjs.send(
        'service_69u1v3l',
        'template_sx0elwh',
        templateParams,
        '2hXTMC4I1irfwVv0b'
      );

      console.log('Email sent successfully');
      setBookingNumber(generatedBookingNumber);
      setBookingComplete(true);
    } catch (error) {
      console.error('Booking error:', error);
      alert('There was an error booking your appointment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const goToNextStep = () => {
    setFormStep(current => current + 1);
  };

  const goToPrevStep = () => {
    setFormStep(current => current - 1);
  };

  if (bookingComplete) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="bg-blue-600 p-6 text-white text-center">
              <CalendarCheck className="w-16 h-16 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Appointment Confirmed!</h2>
              <p className="text-xl">Your booking number is: {bookingNumber}</p>
            </div>

            <div className="p-6 space-y-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-green-500 mr-2" />
                  <p className="text-lg font-medium text-gray-900">
                    Booking Successful!
                  </p>
                </div>
                <p className="text-gray-600">
                  A confirmation email has been sent to {formData.email}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-4">Appointment Details:</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Calendar className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-medium">
                        {format(formData.appointmentDate, 'MMMM do, yyyy')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Time</p>
                      <p className="font-medium">{formData.appointmentTime}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Eye className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Service</p>
                      <p className="font-medium">{formData.service}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium">{formData.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Link
                  to="/"
                  className="block w-full bg-blue-600 text-white py-3 px-4 rounded-lg 
                           hover:bg-blue-700 transition-colors text-center font-medium"
                >
                  Return to Homepage
                </Link>
                
                <button
                  onClick={() => window.location.reload()}
                  className="block w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg 
                           hover:bg-gray-200 transition-colors text-center font-medium"
                >
                  Book Another Appointment
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`flex-1 ${step < formStep ? 'border-blue-600' : 'border-gray-300'} 
                         relative border-b-4 pb-4`}
              >
                <div
                  className={`absolute bottom-0 transform -translate-y-1/2 
                           ${step === formStep ? 'bg-blue-600' : 
                             step < formStep ? 'bg-blue-600' : 'bg-gray-300'} 
                           rounded-full w-8 h-8 flex items-center justify-center text-white`}
                >
                  {step < formStep ? '✓' : step}
                </div>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="bg-blue-600 p-6 text-white">
            <h2 className="text-2xl font-bold">Book Your Appointment</h2>
            <p className="mt-2">Free eye testing available</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            {/* Step 1: Personal Information */}
            {formStep === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        required
                        className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        required
                        className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        required
                        className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="tel"
                        required
                        className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={goToNextStep}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 
                           transition-colors flex items-center justify-center"
                >
                  Next Step
                  <ArrowRight className="ml-2 w-5 h-5" />
                </motion.button>
              </motion.div>
            )}

            {/* Step 2: Service Selection */}
            {formStep === 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <h3 className="text-lg font-semibold mb-4">Select Service & Location</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Select Service
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {services.map((service) => (
                        <motion.div
                          key={service.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setFormData({ ...formData, service: service.name })}
                          className={`cursor-pointer p-4 border-2 rounded-lg 
                                    ${formData.service === service.name 
                                      ? 'border-blue-600 bg-blue-50' 
                                      : 'border-gray-200'}`}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{service.name}</h4>
                              <p className="text-sm text-gray-500">{service.duration}</p>
                            </div>
                            <span className="text-blue-600 font-semibold">{service.price}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Select Branch
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <select
                        required
                        className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      >
                        <option value="">Choose a branch</option>
                        {locations.map((location) => (
                          <option key={location} value={location}>
                            {location}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={goToPrevStep}
                    className="w-1/2 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 
                             transition-colors flex items-center justify-center"
                  >
                    Back
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={goToNextStep}
                    className="w-1/2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 
                             transition-colors flex items-center justify-center"
                    disabled={!formData.service || !formData.location}
                  >
                    Next Step
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Date and Time Selection */}
            {formStep === 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <h3 className="text-lg font-semibold mb-4">Select Date & Time</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Date
                  </label>
                  <div className="relative w-full">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <DatePicker
                      selected={formData.appointmentDate}
                      onChange={(date) => setFormData({ ...formData, appointmentDate: date })}
                      minDate={new Date()}
                      filterDate={date => {
                        const day = date.getDay();
                        return day !== 0; // Exclude Sundays
                      }}
                      dateFormat="MMMM d, yyyy"
                      className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholderText="Select a date"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Time
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {getTimeSlots(formData.location).map((time) => (
                      <motion.button
                        key={time}
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setFormData({ ...formData, appointmentTime: time })}
                        className={`p-2 text-center rounded-lg border ${
                          formData.appointmentTime === time
                            ? 'border-blue-600 bg-blue-50 text-blue-600'
                            : 'border-gray-200 hover:border-blue-600'
                        }`}
                      >
                        {time}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Notes (Optional)
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                    <textarea
                      rows="3"
                      className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Any specific concerns or requirements?"
                    />
                  </div>
                </div>

                <div className="flex space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={goToPrevStep}
                    className="w-1/2 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 
                             transition-colors flex items-center justify-center"
                  >
                    Back
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting || !formData.appointmentDate || !formData.appointmentTime}
                    className="w-1/2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 
                             transition-colors flex items-center justify-center 
                             disabled:bg-blue-300 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      <>
                        Confirm Booking
                        <ChevronRight className="ml-2 w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AppointmentPage;