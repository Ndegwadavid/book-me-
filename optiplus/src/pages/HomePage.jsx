import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Eye, 
  Clock, 
  Award, 
  Shield, 
  ChevronRight, 
  Check,
  Star,
  Calendar,
  ArrowRight,
  Heart
} from 'lucide-react';

import eyeTest from '../assets/images/eyetest.jpeg';
import eyeTest1 from '../assets/images/eyetest1.jpeg';
import eyeTest2 from '../assets/images/eyetest2.jpeg';
import eyeTest3 from '../assets/images/eyetest3.jpeg';

const HomePage = () => {
  const [currentImage, setCurrentImage] = useState(0);
  
  const carouselImages = [
    {
      image: eyeTest,
      title: "Professional Eye Care Services",
      description: "Expert optometrists dedicated to your vision health"
    },
    {
      image: eyeTest1,
      title: "Free Eye Testing",
      description: "Comprehensive eye examinations at no cost"
    },
    {
      image: eyeTest2,
      title: "Modern Equipment",
      description: "State-of-the-art technology for accurate diagnoses"
    },
    {
      image: eyeTest3,
      title: "Quality Eye Care",
      description: "Your trusted partner in vision care"
    }
  ];


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: <Eye className="w-12 h-12 text-blue-500" />,
      title: "Free Eye Testing",
      description: "Professional eye examinations using state-of-the-art equipment, completely free of charge"
    },
    {
      icon: <Clock className="w-12 h-12 text-blue-500" />,
      title: "Quick Service",
      description: "Efficient service with minimal waiting times and convenient appointment scheduling"
    },
    {
      icon: <Award className="w-12 h-12 text-blue-500" />,
      title: "Expert Care",
      description: "Experienced optometrists providing comprehensive eye care services"
    },
    {
      icon: <Shield className="w-12 h-12 text-blue-500" />,
      title: "Quality Products",
      description: "Premium eyewear and eye care products from trusted global brands"
    }
  ];

  const services = [
    {
      title: "Comprehensive Eye Examination",
      description: "Free thorough eye health assessment using advanced diagnostic equipment",
      price: "FREE",
      benefits: [
        "Visual acuity testing",
        "Eye pressure check",
        "Retinal examination",
        "Color vision testing"
      ]
    },
    {
      title: "Contact Lens Consultation",
      description: "Expert fitting and guidance for contact lens wearers",
      price: "From KSH 3,500",
      benefits: [
        "Personalized fitting",
        "Trial lenses",
        "Care instructions",
        "Follow-up care"
      ]
    },
    {
      title: "Eyewear Styling",
      description: "Professional assistance in choosing the perfect frames",
      price: "FREE with purchase",
      benefits: [
        "Frame selection help",
        "Face shape analysis",
        "Style consultation",
        "Fit adjustment"
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Image Carousel */}
      {/* Hero Section with Image Carousel */}
<section className="relative h-screen overflow-hidden">
  {carouselImages.map((item, index) => (
    <motion.div
      key={index}
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: currentImage === index ? 1 : 0,
        scale: currentImage === index ? 1 : 1.1
      }}
      transition={{ 
        opacity: { duration: 1.2, ease: "easeInOut" },
        scale: { duration: 1.2, ease: "easeInOut" }
      }}
    >
      <div 
        className="w-full h-full bg-cover bg-center transform transition-transform duration-[2000ms]"
        style={{ 
          backgroundImage: `url(${item.image})`,
          zIndex: currentImage === index ? 1 : 0
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>
    </motion.div>
  ))}

  {/* Hero Content */}
  <div className="relative h-full flex items-center z-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-white text-center md:text-left max-w-2xl mx-auto md:mx-0"
      >
        <motion.h1 
          key={currentImage}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          {carouselImages[currentImage].title}
        </motion.h1>
        <motion.p
          key={`desc-${currentImage}`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-xl md:text-2xl mb-8 text-gray-200"
        >
          {carouselImages[currentImage].description}
        </motion.p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block"
        >
          <Link
  to="/book"
  className="bg-blue-600 text-white px-6 py-3 rounded-full text-base font-medium 
           inline-flex items-center group hover:bg-blue-700 transition-all
           border-2 border-transparent hover:border-white/20"
>
  Book Free Appointment
  <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
</Link>
        </motion.div>
      </motion.div>
    </div>
  </div>

  {/* Carousel Indicators */}
  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
    {carouselImages.map((_, index) => (
      <motion.button
        key={index}
        onClick={() => setCurrentImage(index)}
        className={`h-2 rounded-full transition-all ${
          currentImage === index ? 'w-8 bg-blue-500' : 'w-2 bg-white/50'
        }`}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      />
    ))}
  </div>
</section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose OptiPlus?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience comprehensive eye care services with state-of-the-art equipment 
              and experienced professionals.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-gray-50 rounded-xl hover:shadow-xl transition-all duration-300"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Professional eye care services tailored to your needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <p className="text-2xl font-bold text-blue-600 mb-4">
                    {service.price}
                  </p>
                  <ul className="space-y-2">
                    {service.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <Check className="w-5 h-5 text-green-500 mr-2" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-6 bg-gray-50 border-t">
                  <Link
                    to="/book"
                    className="flex items-center justify-center text-blue-600 hover:text-blue-700 font-medium group"
                  >
                    Book Now
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Gallery Section */}
<section className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      className="text-center mb-12"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Our Facility Gallery
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Take a look at our modern facilities and equipment
      </p>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* You can replace these with actual images */}
      {[1, 2, 3,].map((item) => (
        <motion.div
          key={item}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.03 }}
          className="relative overflow-hidden rounded-lg shadow-lg aspect-[4/3] group cursor-pointer"
        >
          <img
            src={`/api/placeholder/800/600?text=Gallery+Image+${item}`}
            alt={`Gallery image ${item}`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <p className="text-white text-lg font-semibold">View Image</p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>


      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Take Care of Your Eyes?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Schedule your free eye examination today and take the first step 
              towards better vision.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/book"
                className="bg-white text-blue-600 px-8 py-4 rounded-md font-semibold text-lg inline-flex items-center group hover:bg-blue-50 transition-colors"
              >
                Book Free Appointment
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;