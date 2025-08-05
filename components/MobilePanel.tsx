'use client';

import { Phone, Calculator, Sparkles, Star } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { Button } from './ui/button';
import { motion } from 'framer-motion';

interface MobilePanelProps {
  onConstructorClick: () => void;
}

export function MobilePanel({ onConstructorClick }: MobilePanelProps) {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-blue-100 p-4 md:hidden z-40 shadow-2xl"
    >
      {/* Decorative top border */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"></div>
      
      <div className="grid grid-cols-2 gap-3">
        <Button
          onClick={() => window.open('tel:+998334244242')}
          className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 text-white rounded-2xl py-4 shadow-xl hover:shadow-2xl transition-all duration-300 group border-0 flex items-center justify-center space-x-2"
        >
          <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Phone className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold">{t('mobile.call')}</span>
          <Star className="w-4 h-4 text-yellow-300 fill-current" />
        </Button>
        
        <Button
          onClick={onConstructorClick}
          className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 hover:from-blue-600 hover:via-indigo-600 hover:to-purple-600 text-white rounded-2xl py-4 shadow-xl hover:shadow-2xl transition-all duration-300 group border-0 flex items-center justify-center space-x-2"
        >
          <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Calculator className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold">{t('mobile.constructor')}</span>
          <Sparkles className="w-4 h-4 text-yellow-300" />
        </Button>
      </div>
      
      {/* Safe area for devices with home indicator */}
      <div className="h-safe-area-inset-bottom"></div>
    </motion.div>
  );
}