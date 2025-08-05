'use client';

import { motion } from 'framer-motion';
import { Sparkles, Star, Zap } from 'lucide-react';

export function LoadingSpinner() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-blue-50/50 to-cyan-50/50 z-50 flex items-center justify-center">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ 
            y: [0, -30, 0],
            rotate: [0, 360, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-cyan-200/30 to-blue-300/30 rounded-full blur-xl"
        />
        <motion.div
          animate={{ 
            y: [0, 40, 0],
            rotate: [0, -360, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-32 left-20 w-40 h-40 bg-gradient-to-br from-emerald-200/20 to-teal-300/20 rounded-full blur-2xl"
        />
      </div>

      <div className="text-center relative z-10">
        {/* Logo Animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="relative">
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-24 h-24 bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-500 rounded-3xl flex items-center justify-center shadow-2xl mx-auto relative overflow-hidden"
            >
              <Sparkles className="w-12 h-12 text-white" />
              
              {/* Floating particles */}
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  delay: 0.5
                }}
                className="absolute top-2 right-2"
              >
                <Star className="w-3 h-3 text-yellow-300 fill-current" />
              </motion.div>
              
              <motion.div
                animate={{ 
                  y: [0, -8, 0],
                  opacity: [0.3, 0.8, 0.3]
                }}
                transition={{ 
                  duration: 2.5,
                  repeat: Infinity,
                  delay: 1
                }}
                className="absolute bottom-2 left-2"
              >
                <Zap className="w-3 h-3 text-yellow-200" />
              </motion.div>
            </motion.div>
          </div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold mt-6 mb-2"
          >
            <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              CliningPro
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent font-semibold"
          >
            Professional Cleaning
          </motion.p>
        </motion.div>

        {/* Animated Progress Dots */}
        <div className="flex space-x-3 justify-center mb-6">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-4 h-4 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.2,
              }}
            />
          ))}
        </div>
        
        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="space-y-2"
        >
          <p className="text-gray-700 font-semibold">
            Загружаем для вас лучший сервис...
          </p>
          <motion.div
            animate={{ 
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity
            }}
            className="flex items-center justify-center space-x-2 text-sm text-cyan-600"
          >
            <Sparkles className="w-4 h-4" />
            <span>Подготавливаем чистоту</span>
            <Star className="w-4 h-4 fill-current text-yellow-500" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}