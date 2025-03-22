import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [activeItem, setActiveItem] = useState('Home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = ['Home', 'Projects', 'Community', 'Recommendations'];

  return (
    <nav className="fixed w-full z-50">
      {/* Glass morphism background with subtle gradient border */}
      <div className="absolute inset-0 bg-dark-deeper/60 backdrop-blur-xl border-b border-primary/20"></div>
      
      <div className="max-w-7xl mx-auto relative">
        <div className="flex items-center justify-between h-20 px-6 sm:px-8 lg:px-10">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex-1"
          >
            <Link to="/" className="flex items-center">
              <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary via-primary-light to-secondary  bg-clip-text">
                EduVision
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation Items */}
          <div className="hidden md:flex items-center justify-center flex-1 space-x-10">
            {navItems.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Link
                  to={item.toLowerCase()}
                  className="text-white text-sm font-medium relative group py-2"
                  onClick={() => setActiveItem(item)}
                >
                  <span className={`${activeItem === item ? 'text-white' : 'hover:text-white'} transition-colors duration-300`}>
                    {item}
                  </span>
                  <span className={`absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-primary to-secondary 
                                   transition-all duration-300 rounded-full
                                   ${activeItem === item ? 'w-full' : 'w-0 group-hover:w-full'}`}/>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3 flex-1 justify-end">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-4 py-2 text-white hover:text-white text-sm font-medium transition-all duration-300"
            >
              Log in
            </motion.button>
            
            <motion.button
              whileHover={{ 
                scale: 1.03,
                boxShadow: '0 0 20px rgba(138, 43, 226, 0.5)'
              }}
              whileTap={{ scale: 0.97 }}
              className="px-5 py-2.5 bg-gradient-to-r from-primary to-secondary rounded-lg text-sm font-medium text-white
                       shadow-lg shadow-primary/20 hover:shadow-primary/30 
                       transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10">Sign Up</span>
              <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMobileMenu}
              className="text-white p-2 focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {!isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="md:hidden absolute w-full bg-dark-deeper/90 backdrop-blur-xl border-b border-primary/10"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 py-5 space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item}
                  to={item.toLowerCase()}
                  className={`block py-2 px-3 text-base font-medium rounded-md ${
                    activeItem === item
                    ? 'bg-primary/10 text-white'
                    : 'text-white hover:bg-primary/5 hover:text-white'
                  }`}
                  onClick={() => {
                    setActiveItem(item);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {item}
                </Link>
              ))}
              
              <div className="pt-3 flex flex-col space-y-3 border-t border-white/10">
                <button className="w-full py-2.5 px-4 text-white hover:text-white text-sm font-medium transition-all rounded-md hover:bg-white/5">
                  Log in
                </button>
                <button className="w-full py-2.5 px-4 bg-gradient-to-r from-primary to-secondary rounded-md text-sm font-medium text-white shadow-lg">
                  Sign Up
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;