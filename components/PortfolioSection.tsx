'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import { siteData } from '@/config/site-data';
import { useLanguage } from '@/lib/i18n';
import { Button } from './ui/button';

export function PortfolioSection() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // Fix Set iteration issue by using Array.from
  const uniqueCategories = Array.from(new Set(siteData.portfolio.map(item => item.category)));
  const categories = ['all', ...uniqueCategories];

  const filteredPortfolio = selectedCategory === 'all' 
    ? siteData.portfolio 
    : siteData.portfolio.filter(item => item.category === selectedCategory);

  return (
    <section id="portfolio" className="py-20 bg-gradient-to-b from-gray-50 via-blue-50/30 to-cyan-50/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-100 via-pink-100 to-orange-100 text-purple-700 rounded-full text-sm font-semibold mb-6 shadow-lg border border-purple-200/50"
          >
            🎨 Наши работы
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
              {t('portfolio.title')}
            </span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            {t('portfolio.subtitle')}
          </p>
          
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 mx-auto rounded-full"></div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`transition-all duration-300 rounded-xl px-6 py-3 font-semibold ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 text-white shadow-lg'
                  : 'bg-white hover:bg-gradient-to-r hover:from-purple-50 hover:via-pink-50 hover:to-orange-50 hover:border-purple-300 border-2 border-gray-200 text-gray-700 hover:text-purple-600'
              }`}
            >
              {category === 'all' 
                ? t('portfolio.all') 
                : t(`services.${category}.title`)
              }
            </Button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredPortfolio.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={t(`services.${item.category}.title`)}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Zoom Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      onClick={() => setLightboxImage(item.image)}
                      size="icon"
                      className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-full w-16 h-16 shadow-xl"
                    >
                      <ZoomIn className="w-8 h-8 text-white" />
                    </Button>
                  </div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    {t(`services.${item.category}.title`)}
                  </div>
                  
                  {/* Decorative Elements */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white text-xs">✨</span>
                    </div>
                  </div>
                </div>
                
                {/* Card Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                    {t(`services.${item.category}.title`)}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Профессиональная работа нашей команды
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={() => setLightboxImage(null)}
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="relative max-w-4xl max-h-full"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={lightboxImage}
                  alt="Portfolio item"
                  className="w-full h-full object-contain rounded-2xl shadow-2xl"
                />
                <Button
                  onClick={() => setLightboxImage(null)}
                  size="icon"
                  variant="outline"
                  className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-full"
                >
                  <X className="w-6 h-6 text-white" />
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}