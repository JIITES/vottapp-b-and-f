import React from 'react';
import { motion } from 'framer-motion';

const Homes = () => {
  return (
    <div className=" py-48 my-24  flex flex-col items-center justify-center px-6 text-center">
      {/* Main Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -50, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1 }}className="text-6xl md:text-7xl font-black  mb-4 animate-pulse bg-gradient-to-r from-blue-800 to-white bg-clip-text text-transparent"
        
      >
        Welocome to votting app
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl"
      >
        Revolutionizing voting with secure, transparent, and effortless digital elections.
      </motion.p>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="grid md:grid-cols-3 gap-6 mb-12"
      >
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl hover:scale-105 transition-transform shadow-lg shadow-amber-50">
          <h3 className="text-2xl font-bold text-white mb-2">Secure Voting</h3>
          <p className="text-white/70">Blockchain-powered voting to ensure tamper-proof elections.</p>
        </div>
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg shadow-amber-50">
          <h3 className="text-2xl font-bold text-white mb-2">Real-Time Results</h3>
          <p className="text-white/70">Track vote counts live with instant transparent reporting.</p>
        </div>
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg shadow-amber-50">
          <h3 className="text-2xl font-bold text-white mb-2">User-Friendly</h3>
          <p className="text-white/70">Intuitive design makes voting easy for everyone, everywhere.</p>
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="px-8 py-4 bg-white text-purple-600 font-bold rounded-full shadow-xl hover:bg-white/90 transition-all"
      >
        Get Started
      </motion.button>
    </div>
  );
};

export default Homes;
