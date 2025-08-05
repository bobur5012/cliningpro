'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, MapPin, Globe, Star, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '@/lib/i18n';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const menuItems = [
    { key: 'nav.services', href: '#services' },
    { key: 'nav.portfolio', href: '#portfolio' },
    { key: 'nav.reviews', href: '#reviews' },
    { key: 'nav.contacts', href: '#contacts' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-xl border-b border-blue-100' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3"
          >
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                <Star className="w-2 h-2 text-white fill-current" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                CliningPro
              </span>
              <span className="text-xs bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent font-semibold">
                Professional Cleaning
              </span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item, index) => (
              <motion.button
                key={item.key}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => scrollToSection(item.href)}
                className="relative text-gray-700 hover:text-cyan-600 transition-colors font-semibold py-2 group"
              >
                {t(item.key)}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300 group-hover:w-full rounded-full"></span>
              </motion.button>
            ))}
          </nav>

          {/* Contact Info & Language Switcher */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Language Switcher */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="relative"
            >
              <div className="flex items-center bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-1 shadow-lg border border-blue-100">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center mr-2 shadow-md">
                  <Globe className="w-4 h-4 text-white" />
                </div>
                <button
                  onClick={() => setLanguage('ru')}
                  className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-200 ${
                    language === 'ru' 
                      ? 'bg-white text-cyan-600 shadow-md' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  RU
                </button>
                <button
                  onClick={() => setLanguage('uz')}
                  className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-200 ${
                    language === 'uz' 
                      ? 'bg-white text-cyan-600 shadow-md' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  UZ
                </button>
              </div>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden relative z-50 bg-gradient-to-br from-cyan-50 to-blue-50 hover:from-cyan-100 hover:to-blue-100 border border-cyan-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <motion.div
              animate={{ rotate: isMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMenuOpen ? <X className="w-6 h-6 text-cyan-600" /> : <Menu className="w-6 h-6 text-cyan-600" />}
            </motion.div>
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gradient-to-br from-white via-blue-50/50 to-cyan-50/50 z-40 lg:hidden backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ delay: 0.1 }}
              className="pt-20 pb-8 px-4"
            >
              <div className="space-y-6">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.key}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                    onClick={() => scrollToSection(item.href)}
                    className="block w-full text-left text-xl font-semibold text-gray-900 hover:text-cyan-600 transition-colors py-4 px-6 rounded-2xl hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 border border-transparent hover:border-cyan-200"
                  >
                    {t(item.key)}
                  </motion.button>
                ))}
                
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="pt-6 space-y-6"
                >
                  <div className="flex items-center space-x-3 text-gray-600 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-md">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-lg font-semibold">+998 33 424 42 42</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl border border-orange-200">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-400 rounded-xl flex items-center justify-center shadow-md">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-lg font-semibold">Ташкент</span>
                  </div>
                  
                  {/* Mobile Language Switcher */}
                  <div className="flex items-center space-x-3 pt-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center shadow-md">
                      <Globe className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-1 border border-blue-200">
                      <button
                        onClick={() => setLanguage('ru')}
                        className={`px-6 py-3 text-sm font-semibold rounded-xl transition-all ${
                          language === 'ru' 
                            ? 'bg-white text-cyan-600 shadow-md' 
                            : 'text-gray-600'
                        }`}
                      >
                        Русский
                      </button>
                      <button
                        onClick={() => setLanguage('uz')}
                        className={`px-6 py-3 text-sm font-semibold rounded-xl transition-all ${
                          language === 'uz' 
                            ? 'bg-white text-cyan-600 shadow-md' 
                            : 'text-gray-600'
                        }`}
                      >
                        O'zbek
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}