import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';

const Home = () => {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  useEffect(() => {
    gsap.from(heroRef.current, {
      opacity: 1,
      y: 50,
      duration: 1,
      ease: "power3.out",
    });

    gsap.from(featuresRef.current, {
      opacity: 1,
      y: 30,
      duration: 0.8,
      delay: 0.5,
      ease: "power2.out",
    });
  }, []);

  // Modern UI elements with proper type annotations
  const glowCircle = (color: string, size: string, position: string, blur: string): React.ReactElement => (
    <div 
      className={`absolute ${position} w-${size} h-${size} rounded-full bg-${color} filter blur-${blur} opacity-100 animate-pulse`} 
      style={{ animationDuration: '8s' }}
    />
  );

  return (
    <div className="min-h-screen bg-[#0f1428]">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-[#0f1428] overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-radial from-[#0f1428] via-[#1c1f3a]/20 to-[#0f1428]" />
        
        {/* Animated dots pattern with lighter opacity */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-0" />
        
        {/* Glow effects - lighter and more visible */}
        {glowCircle('primary/25', '1/3', 'top-1/4 -left-1/6', '3xl')}
        {glowCircle('secondary/20', '1/4', 'bottom-10 right-0', '3xl')}
        <div className="absolute top-1/2 left-1/2 w-1/2 h-1/2 bg-primary/10 rounded-full filter blur-[150px] transform -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Main Content */}
      <div className="relative">
        {/* Hero Section */}
        <section className="relative min-h-screen pt-32 pb-20 px-6 sm:px-8 lg:px-10 flex flex-col justify-center">
          <div ref={heroRef} className="max-w-7xl mx-auto">
            <motion.div
              style={{ opacity, scale }}
              className="relative z-10"
            >
              {/* Decorative elements - more visible */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-primary/20 opacity-100"
              />
              <motion.div 
                initial={{ opacity: 0, rotate: 45 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ duration: 2 }}
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-secondary/20 opacity-100"
              />

              <div className="flex flex-col items-center text-center">
                <motion.span 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-block py-1 px-4 rounded-full bg-primary/20 border border-primary/30 text-sm font-medium text-white mb-8"
                >
                  The Future of Learning is Here
                </motion.span>

                <motion.h1 
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  <span className="text-white">Master Your</span>
                  <br />
                  <span className="bg-gradient-to-r from-primary via-primary-light to-secondary  bg-clip-text inline-block mt-2">
                    Learning Journey
                  </span>
                </motion.h1>

                <motion.p 
                  className="mt-8 text-lg md:text-xl text-white max-w-3xl mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  Personalized AI-powered learning paths that adapt to your goals and style.
                  Join a global community of learners and accelerate your growth.
                </motion.p>

                <motion.div 
                  className="mt-12 flex flex-col sm:flex-row justify-center gap-5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  <motion.button
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: '0 10px 30px -10px rgba(138, 43, 226, 0.5)'
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-primary to-secondary rounded-lg font-medium text-white 
                             shadow-xl shadow-primary/30 transition-all duration-300 relative overflow-hidden group"
                  >
                    <span className="relative z-10">Start Your Journey</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-100 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg font-medium 
                             text-white hover:bg-white/15 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
                    </svg>
                    Watch Demo
                  </motion.button>
                </motion.div>
                
                {/* Stats Section with full opacity text */}
                <motion.div 
                  className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto w-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                >
                  {[
                    { number: '10M+', label: 'Active Learners' },
                    { number: '200+', label: 'Learning Paths' },
                    { number: '95%', label: 'Success Rate' }
                  ].map((stat, index) => (
                    <div key={index} className="p-4 text-center">
                      <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary  bg-clip-text">
                        {stat.number}
                      </div>
                      <div className="text-white mt-1 text-sm">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </motion.div>

                {/* Scroll indicator */}
                <motion.div 
                  className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
                  animate={{ 
                    y: [0, 10, 0],
                    opacity: [0.2, 1, 0.2]
                  }}
                  transition={{ 
                    repeat: Infinity,
                    duration: 2
                  }}
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section with lighter background */}
        <section ref={featuresRef} className="relative py-24 px-6 sm:px-8 lg:px-10 bg-[#1c1f3a]/60 backdrop-blur-md">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text mb-4"
              >
                Elevate Your Learning Experience
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-white max-w-2xl mx-auto"
              >
                Discover innovative features designed to transform how you learn and grow
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              {[
                {
                  icon: (
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                    </svg>
                  ),
                  title: 'AI-Powered Learning',
                  description: 'Personalized paths that adapt to your learning style and pace, ensuring optimal knowledge retention with advanced AI algorithms.'
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                      <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                    </svg>
                  ),
                  title: 'Interactive Roadmaps',
                  description: 'Visual progress tracking with milestone achievements and customizable learning journeys based on your career goals.'
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                    </svg>
                  ),
                  title: 'Global Community',
                  description: 'Connect with learners and mentors worldwide to share insights, collaborate on projects, and accelerate your growth.'
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="relative p-8 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 
                           hover:border-primary/30 transition-all duration-500 group hover:shadow-lg hover:shadow-primary/10"
                >
                  {/* Glow effect on hover */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-xl 
                                group-hover:opacity-30 blur-sm transition-opacity duration-500" />
                  
                  {/* Content */}
                  <div className="relative">
                    <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-primary/20 
                                 text-primary-light mb-6 group-hover:bg-primary/30 transition-colors duration-300">
                      {feature.icon}
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-gradient transition-all duration-500">
                      {feature.title}
                    </h3>
                    
                    <p className="text-white group-hover:text-white transition-colors duration-300">
                      {feature.description}
                    </p>
                    
                    <div className="mt-6 flex items-center text-primary-light font-medium  
                                 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 
                                 group-hover:translate-y-0">
                      <span>Learn more</span>
                      <svg className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;