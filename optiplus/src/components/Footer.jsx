import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Facebook, 
  Twitter, 
  Instagram,
  Youtube,
  Linkedin
} from 'lucide-react';

const Footer = () => {
  const fadeInUp = {
    initial: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.5 }
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Branch Information */}
          <motion.div {...fadeInUp} className="space-y-4">
            <h3 className="text-white text-lg font-semibold mb-4">Our Branches</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0 text-blue-400" />
                <p className="text-sm">Along Moi Avenue Opposite Imenti House – Nacico Chambers Nairobi, Kenya</p>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0 text-blue-400" />
                <p className="text-sm">Ronald Ngala Street Opposite The Post Office Nairobi, Kenya</p>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div {...fadeInUp} className="space-y-4">
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-blue-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-sm hover:text-blue-400 transition-colors">About</Link>
              </li>
              <li>
                <Link to="/services" className="text-sm hover:text-blue-400 transition-colors">Services</Link>
              </li>
              <li>
                <Link to="/products" className="text-sm hover:text-blue-400 transition-colors">Products</Link>
              </li>
            </ul>
          </motion.div>

          {/* More Links */}
          <motion.div {...fadeInUp} className="space-y-4">
            <h3 className="text-white text-lg font-semibold mb-4">More Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/frames" className="text-sm hover:text-blue-400 transition-colors">Frames</Link>
              </li>
              <li>
                <Link to="/lenses" className="text-sm hover:text-blue-400 transition-colors">Lenses</Link>
              </li>
              <li>
                <Link to="/sunglasses" className="text-sm hover:text-blue-400 transition-colors">Sunglasses</Link>
              </li>
              <li>
                <Link to="/contact-lenses" className="text-sm hover:text-blue-400 transition-colors">Contact Lenses</Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact Information */}
          <motion.div {...fadeInUp} className="space-y-4">
            <h3 className="text-white text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-blue-400" />
                <div className="text-sm">
                  <p>+254 702 220 545</p>
                  <p>+254 105 165 560</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-blue-400" />
                <p className="text-sm">info@optikenya.com</p>
              </div>
              <div className="flex items-start space-x-2">
                <Clock className="w-5 h-5 mt-1 text-blue-400" />
                <div className="text-sm">
                  <p>Monday – Friday: 9:00am – 6:00pm</p>
                  <p>Saturday: 9:00am – 4:00pm</p>
                  <p>Closed on Sundays & Public Holidays</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Social Media Links */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 pt-8 border-t border-gray-800"
        >
          <div className="flex justify-center space-x-6">
            {[
              { icon: <Facebook className="w-6 h-6" />, href: "https://facebook.com" },
              { icon: <Twitter className="w-6 h-6" />, href: "https://twitter.com" },
              { icon: <Instagram className="w-6 h-6" />, href: "https://instagram.com" },
              { icon: <Youtube className="w-6 h-6" />, href: "https://youtube.com" },
              { icon: <Linkedin className="w-6 h-6" />, href: "https://linkedin.com" }
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
          <div className="mt-8 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} OptiPlus. All rights reserved.</p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;