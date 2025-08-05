'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, Shield, Zap, Users, Star, CheckCircle, Sparkles, Award, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '@/lib/i18n';

interface HeroSectionProps {
  onCalculateClick: () => void;
}

export function HeroSection({ onCalculateClick }: HeroSectionProps) {
  const { t } = useLanguage();

  const advantages = [
    { 
      icon: Shield, 
      label: t('hero.guarantee'), 
      value: '100%', 
      color: 'from-emerald-400 via-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-600'
    },
    { 
      icon: Zap, 
      label: t('hero.fast'), 
      value: '24/7', 
      color: 'from-blue-400 via-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    { 
      icon: Users, 
      label: t('hero.experienced'), 
      value: '5+', 
      color: 'from-purple-400 via-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
  ];

  const stats = [
    { 
      value: '1000+', 
      label: 'Убранных объектов', 
      icon: CheckCircle,
      color: 'from-green-400 to-emerald-500',
      bgColor: 'bg-gradient-to-br from-green-50 to-emerald-50'
    },
    { 
      value: '500+', 
      label: 'Довольных клиентов', 
      icon: Star,
      color: 'from-yellow-400 to-orange-500',
      bgColor: 'bg-gradient-to-br from-yellow-50 to-orange-50'
    },
    { 
      value: '99%', 
      label: 'Качество работ', 
      icon: Award,
      color: 'from-indigo-400 to-purple-500',
      bgColor: 'bg-gradient-to-br from-indigo-50 to-purple-50'
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/50 pt-16 lg:pt-20 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ 
            y: [0, -30, 0],
            rotate: [0, 10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-br from-cyan-200/40 to-blue-300/40 rounded-full blur-xl"
        />
        <motion.div
          animate={{ 
            y: [0, 40, 0],
            rotate: [0, -15, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-32 left-10 w-40 h-40 bg-gradient-to-br from-emerald-200/30 to-teal-300/30 rounded-full blur-2xl"
        />
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            x: [0, 20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
          className="absolute top-1/2 right-1/4 w-24 h-24 bg-gradient-to-br from-purple-200/40 to-pink-300/40 rounded-full blur-lg"
        />
      </div>

      {/* Floating Icons */}
      <motion.div
        animate={{ 
          y: [0, -15, 0],
          rotate: [0, 360, 0]
        }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-32 left-20 text-cyan-400/30"
      >
        <Sparkles className="w-8 h-8" />
      </motion.div>
      
      <motion.div
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -360, 0]
        }}
        transition={{ 
          duration: 25,
          repeat: Infinity,
          ease: "linear",
          delay: 5
        }}
        className="absolute bottom-40 right-32 text-emerald-400/30"
      >
        <Star className="w-6 h-6" />
      </motion.div>

      <div className="container mx-auto px-4 py-12 lg:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-700 rounded-full text-sm font-semibold shadow-lg border border-cyan-200/50"
            >
              <Star className="w-4 h-4 mr-2 fill-current text-yellow-500" />
              <Sparkles className="w-4 h-4 mr-2 text-cyan-500" />
              Профессиональная уборка в Ташкенте
            </motion.div>

            <div className="space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              >
                <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Генеральная
                </span>
                <br />
                <span className="text-gray-900">уборка</span>
                <br />
                <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                под ключ
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl"
              >
                {t('hero.subtitle')}
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                onClick={onCalculateClick}
                size="lg"
                className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 hover:from-cyan-600 hover:via-blue-600 hover:to-indigo-600 text-white px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group text-base font-semibold border-0 flex items-center"
              >
                <Sparkles className="mr-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
                {t('hero.calculate')}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-emerald-400 text-emerald-600 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 hover:text-white hover:border-emerald-500 px-8 py-4 rounded-2xl transition-all duration-300 group text-base font-semibold shadow-lg hover:shadow-xl flex items-center"
                onClick={() => window.open('tel:+998334244242')}
              >
                <Phone className="mr-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
                {t('hero.call')}
              </Button>
            </motion.div>

            {/* Advantages */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-3 gap-4 pt-8"
            >
              {advantages.map((advantage, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`text-center p-6 ${advantage.bgColor} backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/50 group cursor-pointer`}
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${advantage.color} rounded-2xl mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                    <advantage.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{advantage.value}</div>
                  <div className={`text-sm font-semibold ${advantage.iconColor}`}>{advantage.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              {/* Main Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="relative overflow-hidden rounded-3xl shadow-2xl"
              >
                <img
                  src="https://tfowoyddtdrvgsegohgt.supabase.co/storage/v1/object/public/imagesclining//img.webp"
                  alt="Professional Cleaning"
                  className="w-full h-[500px] lg:h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
              </motion.div>

              {/* Floating Stats Cards */}
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.2 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`absolute ${
                    index === 0 ? '-top-6 -left-6' : 
                    index === 1 ? '-bottom-6 -right-6' : 
                    'top-1/2 -left-8 transform -translate-y-1/2 hidden lg:block'
                  } ${stat.bgColor} backdrop-blur-sm rounded-3xl shadow-2xl p-6 border border-white/50 group cursor-pointer`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                      <stat.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-sm text-gray-600 font-semibold">{stat.label}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}