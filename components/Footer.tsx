'use client';

import { Phone, Mail, MapPin, Clock, Sparkles, Star } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

export function Footer() {
  const { t } = useLanguage();

  const advantages = [
    'footer.advantage1',
    'footer.advantage2',
    'footer.advantage3',
    'footer.advantage4'
  ];

  return (
    <footer id="contacts" className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                  <Star className="w-1.5 h-1.5 text-white fill-current" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white">CliningPro</span>
                <span className="text-xs bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-semibold">
                  Professional Cleaning
                </span>
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-blue-400">
              {t('footer.about')}
            </h3>
            <p className="text-gray-300 leading-relaxed">
              {t('footer.description')}
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-400">
              {t('nav.contacts')}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <span>+998 33 424 42 42</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <span>info@cliningpro.uz</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-1" />
                <span>г. Ташкент, ул. Амира Темура, 15</span>
              </div>
            </div>
          </div>

          {/* Schedule */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-400">
              {t('footer.schedule')}
            </h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-blue-400" />
                <div>
                  <div>{t('footer.schedule.weekdays')}</div>
                  <div className="text-gray-400">{t('footer.schedule.weekends')}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Advantages */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-400">
              {t('footer.advantages')}
            </h3>
            <ul className="space-y-2">
              {advantages.map((advantage, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-sm">{t(advantage)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-400">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}