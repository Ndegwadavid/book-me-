import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Phone, 
  Calendar, 
  HelpCircle, 
  Menu, 
  X, 
  ShoppingBag, 
  User,
  BookOpen,
  Glasses,
  ChevronRight
} from 'lucide-react';
import logo from '../assets/images/logo.png'; // Adjust the path based on your logo file name

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { name: 'Home', icon: <Home className="w-5 h-5" />, path: '/' },
    { name: 'Contact', icon: <Phone className="w-5 h-5" />, path: '/contact' },
    { name: 'Book Appointment', icon: <Calendar className="w-5 h-5" />, path: '/book' },
   
    { name: 'FAQ', icon: <HelpCircle className="w-5 h-5" />, path: '/faq' },
    { name: 'Shop', icon: <ShoppingBag className="w-5 h-5" />, href: 'https://optiplus.co.ke' },
    { name: 'Blog', icon: <BookOpen className="w-5 h-5" />, href: 'https://optiplus.co.ke' }
  ];

  return (
    <>
      <nav className="bg-white shadow-lg fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="h-12 flex items-center"
                >
                  <img 
                    src={logo} 
                    alt="OptiPlus Logo" 
                    className="h-full w-auto object-contain"
                  />
                </motion.div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-4">
              {navItems.map((item) => (
                item.href ? (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium group"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </motion.a>
                ) : (
                  <motion.div key={item.name} whileHover={{ scale: 1.05 }}>
                    <Link
                      to={item.path}
                      className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium group"
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  </motion.div>
                )
              ))}
              <motion.div whileHover={{ scale: 1.05 }}>
                <a
                  href="https://optiplus.co.ke/"
                  className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 px-3 py-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <User className="w-5 h-5" />
                </a>
              </motion.div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsSidebarOpen(true)}
                className="text-gray-600 hover:text-blue-600 p-2"
              >
                <Menu className="w-6 h-6" />
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-50"
              onClick={() => setIsSidebarOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed right-0 top-0 h-full w-72 bg-white shadow-lg z-50 overflow-y-auto"
            >
              <div className="p-4">
                <div className="flex justify-between items-center mb-8">
                  <img 
                    src={logo} 
                    alt="OptiPlus Logo" 
                    className="h-8 w-auto"
                  />
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsSidebarOpen(false)}
                    className="p-2 text-gray-600 hover:text-blue-600"
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                </div>

                <div className="space-y-2">
                  {navItems.map((item) => (
                    item.href ? (
                      <a
                        key={item.name}
                        href={item.href}
                        className="flex items-center justify-between w-full p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg group"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsSidebarOpen(false)}
                      >
                        <div className="flex items-center space-x-3">
                          {item.icon}
                          <span>{item.name}</span>
                        </div>
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </a>
                    ) : (
                      <Link
                        key={item.name}
                        to={item.path}
                        className="flex items-center justify-between w-full p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg group"
                        onClick={() => setIsSidebarOpen(false)}
                      >
                        <div className="flex items-center space-x-3">
                          {item.icon}
                          <span>{item.name}</span>
                        </div>
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    )
                  ))}
                  
                  <a
                    href="https://optiplus.co.ke"
                    className="flex items-center justify-between w-full p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg group"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <div className="flex items-center space-x-3">
                      <User className="w-5 h-5" />
                      <span>Account</span>
                    </div>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;