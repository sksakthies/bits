import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [activeItem, setActiveItem] = useState('Home');

  return (
    <nav className="fixed w-full z-50">
      {/* Glass morphism background with subtle gradient border */}
      <div className="absolute inset-0 bg-dark-deeper/40 backdrop-blur-xl border-b border-primary/10"></div>
      
      <div className="max-w-7xl mx-auto relative">
        <div className="flex items-center justify-between h-20 px-6 sm:px-8 lg:px-10">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Link to="/" className="flex items-center space-x-1">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary via-primary-light to-secondary text-transparent bg-clip-text">
                EduVision
              </span>
            </Link>
          </motion.div>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-10">
            {['Home', 'Projects', 'Community', 'Recommendations'].map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Link
                  to={item.toLowerCase()}
                  className="text-white/90 text-sm font-medium relative group py-2"
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
          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-4 py-2 text-white/90 hover:text-white text-sm font-medium transition-all duration-300"
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;