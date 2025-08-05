'use client';

import { motion } from 'framer-motion';
import { siteData } from '@/config/site-data';
import { useLanguage } from '@/lib/i18n';
import { Button } from './ui/button';
import { ArrowRight, Plus, Building2, Home, AppWindow as Window, Car as Carpet, ToyBrick as Brick, Building } from 'lucide-react';

interface ServicesSectionProps {
  onServiceSelect: (serviceId: string) => void;
}

const serviceIcons = {
  apartment_general_cleaning: Home,
  post_renovation_cleaning: Building,
  office_cleaning: Building2,
  house_cleaning: Home,
  carpet_cleaning: Carpet,
  furniture_dry_cleaning: Building,
  paving_cleaning: Brick,
  mattress_cleaning: Home,
  chair_cleaning: Building2
};

const serviceColors = {
  apartment_general_cleaning: {
    gradient: 'from-pink-400 via-pink-500 to-pink-600',
    bg: 'from-pink-50 to-pink-100',
    hover: 'group-hover:from-pink-100 group-hover:to-pink-200',
    text: 'text-pink-600',
    border: 'border-pink-200'
  },
  post_renovation_cleaning: {
    gradient: 'from-amber-400 via-amber-500 to-amber-600',
    bg: 'from-amber-50 to-amber-100',
    hover: 'group-hover:from-amber-100 group-hover:to-amber-200',
    text: 'text-amber-600',
    border: 'border-amber-200'
  },
  office_cleaning: {
    gradient: 'from-blue-400 via-blue-500 to-blue-600',
    bg: 'from-blue-50 to-blue-100',
    hover: 'group-hover:from-blue-100 group-hover:to-blue-200',
    text: 'text-blue-600',
    border: 'border-blue-200'
  },
  house_cleaning: {
    gradient: 'from-emerald-400 via-emerald-500 to-emerald-600',
    bg: 'from-emerald-50 to-emerald-100',
    hover: 'group-hover:from-emerald-100 group-hover:to-emerald-200',
    text: 'text-emerald-600',
    border: 'border-emerald-200'
  },
  carpet_cleaning: {
    gradient: 'from-purple-400 via-purple-500 to-purple-600',
    bg: 'from-purple-50 to-purple-100',
    hover: 'group-hover:from-purple-100 group-hover:to-purple-200',
    text: 'text-purple-600',
    border: 'border-purple-200'
  },
  furniture_dry_cleaning: {
    gradient: 'from-teal-400 via-teal-500 to-teal-600',
    bg: 'from-teal-50 to-teal-100',
    hover: 'group-hover:from-teal-100 group-hover:to-teal-200',
    text: 'text-teal-600',
    border: 'border-teal-200'
  },
  paving_cleaning: {
    gradient: 'from-orange-400 via-orange-500 to-orange-600',
    bg: 'from-orange-50 to-orange-100',
    hover: 'group-hover:from-orange-100 group-hover:to-orange-200',
    text: 'text-orange-600',
    border: 'border-orange-200'
  },
  mattress_cleaning: {
    gradient: 'from-indigo-400 via-indigo-500 to-indigo-600',
    bg: 'from-indigo-50 to-indigo-100',
    hover: 'group-hover:from-indigo-100 group-hover:to-indigo-200',
    text: 'text-indigo-600',
    border: 'border-indigo-200'
  },
  chair_cleaning: {
    gradient: 'from-rose-400 via-rose-500 to-rose-600',
    bg: 'from-rose-50 to-rose-100',
    hover: 'group-hover:from-rose-100 group-hover:to-rose-200',
    text: 'text-rose-600',
    border: 'border-rose-200'
  }
};

export function ServicesSection({ onServiceSelect }: ServicesSectionProps) {
  const { t } = useLanguage();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="services" className="py-20 lg:py-32 bg-gradient-to-b from-white via-slate-50/50 to-blue-50/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 lg:mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-100 via-blue-100 to-indigo-100 text-blue-700 rounded-full text-sm font-semibold mb-6 shadow-lg border border-blue-200/50"
          >
            ✨ Наши услуги
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
              {t('services.title')}
            </span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Профессиональные клининговые услуги для любых задач
          </p>
          
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 mx-auto rounded-full mt-8"></div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {Object.entries(siteData.services).map(([serviceId, service]) => {
            const IconComponent = serviceIcons[serviceId as keyof typeof serviceIcons];
            const colors = serviceColors[serviceId as keyof typeof serviceColors];
            
            return (
              <motion.div
                key={serviceId}
                variants={item}
                whileHover={{ 
                  y: -12,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-gray-200 relative"
              >
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                  <div className={`w-20 h-20 bg-gradient-to-br ${colors.gradient} rounded-full blur-xl`}></div>
                </div>
                
                <div className="p-8 relative z-10">
                  <div className="text-center mb-6">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                      className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${colors.gradient} rounded-2xl mb-6 shadow-lg group-hover:shadow-xl transition-all duration-500`}
                    >
                      <IconComponent className="w-10 h-10 text-white" />
                    </motion.div>
                    
                    <h3 className={`text-xl font-bold text-gray-900 mb-3 group-hover:${colors.text} transition-colors`}>
                      {t(`services.${serviceId}.title`)}
                    </h3>
                    
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {t(`services.${serviceId}.desc`)}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className={`flex items-center justify-between p-4 bg-gradient-to-r ${colors.bg} ${colors.hover} rounded-2xl transition-all duration-500 border ${colors.border}`}>
                      <span className="text-gray-700 font-semibold">
                        {t('from')}
                      </span>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${colors.text}`}>
                          {service.basePrice.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-500 font-medium">
                          {t('constructor.sum')} / {service.priceType === 'perSqm' ? 'м²' : 'шт'}
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={() => onServiceSelect(serviceId)}
                      className={`w-full bg-white border-2 ${colors.border} ${colors.text} hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 hover:text-white hover:border-transparent transition-all duration-300 rounded-2xl py-3 group/btn shadow-lg hover:shadow-xl flex items-center justify-center`}
                    >
                      <Plus className="mr-2 w-4 h-4 group-hover/btn:rotate-90 transition-transform duration-300" />
                      {t('add')}
                      <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}