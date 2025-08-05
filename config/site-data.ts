export interface Service {
  id: string;
  icon: string;
  priceType: 'perSqm' | 'perItem';
  basePrice: number;
  multipliers?: {
    type?: { [key: string]: number };
    level?: { [key: string]: number };
  };
}

export interface Translation {
  ru: string;
  uz: string;
}

export interface SiteData {
  services: { [key: string]: Service };
  translations: { [key: string]: Translation };
  portfolio: Array<{
    id: string;
    category: string;
    image: string;
    before?: string;
    after?: string;
  }>;
  reviews: Array<{
    id: string;
    name: Translation;
    service: Translation;
    text: Translation;
    rating: number;
    image: string;
  }>;
  videoWorks: Array<{
    id: string;
    title: string;
    category: string;
    videoUrl: string;
    thumbnail: string;
    duration: string;
  }>;
}

export interface VideoWork {
  id: string;
  title: string;
  category: string;
  videoUrl: string;
  thumbnail: string;
  duration: string;
}

export const siteData: SiteData = {
  services: {
    apartment_general_cleaning: {
      id: 'apartment_general_cleaning',
      icon: '🏠',
      priceType: 'perSqm',
      basePrice: 15000,
      multipliers: {
        level: { light: 1, medium: 1.3, heavy: 1.6 }
      }
    },
    post_renovation_cleaning: {
      id: 'post_renovation_cleaning',
      icon: '🔨',
      priceType: 'perSqm',
      basePrice: 10000,
      multipliers: {
        level: { light: 1, medium: 1.3, heavy: 1.6 }
      }
    },
    house_cleaning: {
      id: 'house_cleaning',
      icon: '🏡',
      priceType: 'perSqm',
      basePrice: 9000,
      multipliers: {
        level: { light: 1, medium: 1.3, heavy: 1.6 }
      }
    },
    office_cleaning: {
      id: 'office_cleaning',
      icon: '🏢',
      priceType: 'perSqm',
      basePrice: 12000,
      multipliers: {
        level: { light: 1, medium: 1.3, heavy: 1.6 }
      }
    },
    carpet_cleaning: {
      id: 'carpet_cleaning',
      icon: '🧽',
      priceType: 'perSqm',
      basePrice: 17000,
      multipliers: {
        level: { light: 1, medium: 1.2, heavy: 1.5 }
      }
    },
    furniture_dry_cleaning: {
      id: 'furniture_dry_cleaning',
      icon: '🛋️',
      priceType: 'perItem',
      basePrice: 70000
    },
    paving_cleaning: {
      id: 'paving_cleaning',
      icon: '🧱',
      priceType: 'perSqm',
      basePrice: 25000,
      multipliers: {
        type: { maintenance: 1, general: 1.5 },
        level: { light: 1, medium: 1.2, heavy: 1.4 }
      }
    },
    mattress_cleaning: {
      id: 'mattress_cleaning',
      icon: '🛏️',
      priceType: 'perItem',
      basePrice: 200000
    },
    chair_cleaning: {
      id: 'chair_cleaning',
      icon: '🪑',
      priceType: 'perItem',
      basePrice: 30000,
      multipliers: {
        level: { light: 1, medium: 1.3, heavy: 1.6 }
      }
    }
  },

  portfolio: [
    {
      id: '1',
      category: 'office_cleaning',
      image: 'https://is1c.ru/upload/img/servise/person-taking-care-of-office-cleaning.jpg?auto=compress&cs=tinysrgb&w=800',
      before: 'https://tfowoyddtdrvgsegohgt.supabase.co/storage/v1/object/public/imagesclining//2.png?auto=compress&cs=tinysrgb&w=800',
      after: 'https://tfowoyddtdrvgsegohgt.supabase.co/storage/v1/object/public/imagesclining//1.png?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '2',
      category: 'house_cleaning',
      image: 'https://lovemymaids.com/wp-content/uploads/2022/05/Residential-Cleaning-Services-Fort-Worth-TX-scaled.jpg?auto=compress&cs=tinysrgb&w=800',
      before: 'https://images.pexels.com/photos/4107101/pexels-photo-4107101.jpeg?auto=compress&cs=tinysrgb&w=800',
      after: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '3',
      category: 'apartment_general_cleaning',
      image: 'https://maid2gocleaning.com.au/wp-content/uploads/2023/05/end-of-lease-cleaning-maid2go.jpg?auto=compress&cs=tinysrgb&w=800',
      before: 'https://images.pexels.com/photos/4107101/pexels-photo-4107101.jpeg?auto=compress&cs=tinysrgb&w=800',
      after: 'https://images.pexels.com/photos/6195049/pexels-photo-6195049.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '4',
      category: 'carpet_cleaning',
      image: 'https://i.pinimg.com/originals/62/b4/72/62b472249aff1dfc6ccbe79d3bcbf267.jpg?auto=compress&cs=tinysrgb&w=800',
      before: 'https://images.pexels.com/photos/4107101/pexels-photo-4107101.jpeg?auto=compress&cs=tinysrgb&w=800',
      after: 'https://images.pexels.com/photos/4099425/pexels-photo-4099425.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '5',
      category: 'post_renovation_cleaning',
      image: 'https://avatars.mds.yandex.net/get-altay/13078542/2a000001915718a4abb26e0345d3be97f2d0/diploma?auto=compress&cs=tinysrgb&w=800',
      before: 'https://images.pexels.com/photos/4099468/pexels-photo-4099468.jpeg?auto=compress&cs=tinysrgb&w=800',
      after: 'https://images.pexels.com/photos/4107101/pexels-photo-4107101.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '6',
      category: 'furniture_dry_cleaning',
      image: 'https://pochistimkover.ru/wp-content/uploads/2024/04/68dc69f1bca892a01f80415e2307a767-scaled.webp?auto=compress&cs=tinysrgb&w=800'
    }
  ],

  reviews: [
    {
      id: '1',
      name: { ru: 'Алексей Петров', uz: 'Aleksey Petrov' },
      service: { ru: 'Уборка офиса', uz: 'Ofis tozalash' },
      text: { ru: 'Отличная работа! Офис сияет чистотой. Команда работала быстро и качественно.', uz: 'Ajoyib ish! Ofis poklik bilan porlaydi. Jamoa tez va sifatli ishladi.' },
      rating: 5,
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop'
    },
    {
      id: '2',
      name: { ru: 'Мария Иванова', uz: 'Mariya Ivanova' },
      service: { ru: 'Генеральная уборка дома', uz: 'Uyning general tozalanishi' },
      text: { ru: 'Превосходный сервис! Дом стал как новый. Рекомендую всем!', uz: 'Ajoyib xizmat! Uy yangidek boʻldi. Hammaga tavsiya qilaman!' },
      rating: 5,
      image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop'
    },
    {
      id: '3',
      name: { ru: 'Дмитрий Сидоров', uz: 'Dmitriy Sidorov' },
      service: { ru: 'Чистка ковров', uz: 'Gilamlarni tozalash' },
      text: { ru: 'Профессиональный подход, все ковры как новые. Очень доволен результатом!', uz: 'Professional yondashuv, barcha gilamlar yangidek. Natijadan juda mamnunman!' },
      rating: 5,
      image: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop'
    }
  ],

  videoWorks: [
    {
      id: '1',
      title: 'Уборка офиса - до и после',
      category: 'office_cleaning',
      videoUrl: 'https://eympwieitiflknxkaaff.supabase.co/storage/v1/object/public/video//video_2025-08-05_14-55-20.mp4',
      thumbnail: 'https://images.pexels.com/photos/5848320/pexels-photo-5848320.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
      duration: '0:30'
    },
    {
      id: '2',
      title: 'Генеральная уборка дома',
      category: 'house_cleaning',
      videoUrl: 'https://eympwieitiflknxkaaff.supabase.co/storage/v1/object/public/video//video_2025-08-05_14-55-33.mp4',
      thumbnail: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
      duration: '1:15'
    },
    {
      id: '3',
      title: 'Профессиональная мойка окон',
      category: 'window_cleaning',
      videoUrl: 'https://eympwieitiflknxkaaff.supabase.co/storage/v1/object/public/video//video_2025-08-05_14-55-33.mp4',
      thumbnail: 'https://images.pexels.com/photos/29015306/pexels-photo-29015306.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
      duration: '0:45'
    },
    {
      id: '4',
      title: 'Глубокая чистка ковров',
      category: 'carpet_cleaning',
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      thumbnail: 'https://images.pexels.com/photos/4099425/pexels-photo-4099425.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
      duration: '1:00'
    },
    {
      id: '5',
      title: 'Чистка брусчатки',
      category: 'paving_cleaning',
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
      thumbnail: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
      duration: '0:50'
    },
    {
      id: '6',
      title: 'Мойка фасада здания',
      category: 'facade_cleaning',
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4',
      thumbnail: 'https://images.pexels.com/photos/5848320/pexels-photo-5848320.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
      duration: '1:30'
    }
  ],

  translations: {
    // Navigation
    'nav.services': { ru: 'Услуги', uz: 'Xizmatlar' },
    'nav.portfolio': { ru: 'Портфолио', uz: 'Portfolio' },
    'nav.reviews': { ru: 'Отзывы', uz: 'Sharhlar' },
    'nav.contacts': { ru: 'Контакты', uz: 'Kontaktlar' },
    
    // Hero Section
    'hero.title': { ru: 'Профессиональные клининговые услуги в Ташкенте', uz: 'Toshkentda professional tozalash xizmatlari' },
    'hero.subtitle': { ru: 'Качественная уборка офисов, домов и коммерческих помещений с гарантией результата', uz: 'Ofis, uy va tijorat xonalarini sifatli tozalash natija kafolati bilan' },
    'hero.guarantee': { ru: 'Гарантия качества', uz: 'Sifat kafolati' },
    'hero.fast': { ru: 'Быстрая уборка', uz: 'Tez tozalash' },
    'hero.experienced': { ru: 'Опытная команда', uz: 'Tajribali jamoa' },
    'hero.calculate': { ru: 'Рассчитать стоимость', uz: 'Narxni hisoblash' },
    'hero.call': { ru: 'Позвонить сейчас', uz: 'Hozir qo\'ng\'iroq qiling' },
    
    // Services
    'services.title': { ru: 'Наши услуги', uz: 'Bizning xizmatlarimiz' },
    'services.apartment_general_cleaning.title': { ru: 'Генеральная уборка квартир', uz: 'Kvartiralarda general tozalash' },
    'services.apartment_general_cleaning.desc': { ru: 'Полная генеральная уборка квартир с глубокой очисткой', uz: 'Kvartiralarda chuqur tozalash bilan to\'liq general tozalash' },
    'services.post_renovation_cleaning.title': { ru: 'Уборка после ремонта', uz: 'Ta\'mirdan keyin tozalash' },
    'services.post_renovation_cleaning.desc': { ru: 'Профессиональная уборка после строительных и ремонтных работ', uz: 'Qurilish va ta\'mir ishlaridan keyin professional tozalash' },
    'services.house_cleaning.title': { ru: 'Уборка домов', uz: 'Uylarni tozalash' },
    'services.house_cleaning.desc': { ru: 'Комплексная уборка частных домов и коттеджей', uz: 'Xususiy uylar va kottejlarni kompleks tozalash' },
    'services.office_cleaning.title': { ru: 'Уборка офисов', uz: 'Ofislarni tozalash' },
    'services.office_cleaning.desc': { ru: 'Профессиональная уборка офисных помещений', uz: 'Ofis xonalarini professional tozalash' },
    'services.carpet_cleaning.title': { ru: 'Чистка ковров', uz: 'Gilamlarni tozalash' },
    'services.carpet_cleaning.desc': { ru: 'Глубокая чистка ковров и ковровых покрытий', uz: 'Gilam va gilam qoplamalarini chuqur tozalash' },
    'services.furniture_dry_cleaning.title': { ru: 'Химчистка мягкой мебели', uz: 'Yumshoq mebellarni kimyoviy tozalash' },
    'services.furniture_dry_cleaning.desc': { ru: 'Профессиональная химчистка диванов, кресел и другой мебели', uz: 'Divan, kreslo va boshqa mebellarni professional kimyoviy tozalash' },
    'services.paving_cleaning.title': { ru: 'Чистка брусчатки', uz: 'Tosh yo\'lni tozalash' },
    'services.paving_cleaning.desc': { ru: 'Профессиональная чистка тротуарной плитки и брусчатки', uz: 'Piyoda yo\'laklari va tosh yo\'llarni professional tozalash' },
    'services.mattress_cleaning.title': { ru: 'Чистка матраса', uz: 'Matrasni tozalash' },
    'services.mattress_cleaning.desc': { ru: 'Глубокая чистка матрасов с удалением пятен и запахов', uz: 'Dog\'lar va hidlarni olib tashlash bilan matraslarni chuqur tozalash' },
    'services.chair_cleaning.title': { ru: 'Чистка стула', uz: 'Stulni tozalash' },
    'services.chair_cleaning.desc': { ru: 'Профессиональная чистка стульев и офисных кресел', uz: 'Stul va ofis kreslolarini professional tozalash' },
    
    // Before/After
    'beforeafter.title': { ru: 'До и После', uz: 'Oldin va Keyin' },
    'beforeafter.subtitle': { ru: 'Посмотрите, как преображаются помещения после нашей работы', uz: 'Bizning ishimizdan keyin xonalar qanday o\'zgarishini ko\'ring' },
    'beforeafter.before': { ru: 'До', uz: 'Oldin' },
    'beforeafter.after': { ru: 'После', uz: 'Keyin' },
    
    // Portfolio
    'portfolio.title': { ru: 'Наше портфолио', uz: 'Bizning portfolio' },
    'portfolio.subtitle': { ru: 'Примеры наших выполненных работ', uz: 'Bizning bajarilgan ishlarimiz misollari' },
    'portfolio.all': { ru: 'Все работы', uz: 'Barcha ishlar' },
    
    // Reviews
    'reviews.title': { ru: 'Отзывы наших клиентов', uz: 'Mijozlarimizning sharhlari' },
    'reviews.subtitle': { ru: 'Что говорят о нас наши клиенты', uz: 'Mijozlarimiz biz haqimizda nima deyishadi' },
    
    // Footer
    'footer.about': { ru: 'О компании', uz: 'Kompaniya haqida' },
    'footer.description': { ru: 'CliningPro - ведущая компания по предоставлению профессиональных клининговых услуг в Ташкенте. Мы гарантируем качество и оперативность выполнения работ.', uz: 'CliningPro - Toshkentda professional tozalash xizmatlarini taqdim etuvchi yetakchi kompaniya. Biz sifat va ishlarni tez bajarishga kafolat beramiz.' },
    'footer.schedule': { ru: 'График работы', uz: 'Ish rejimi' },
    'footer.schedule.weekdays': { ru: 'Пн-Пт: 8:00 - 20:00', uz: 'Du-Ju: 8:00 - 20:00' },
    'footer.schedule.weekends': { ru: 'Сб-Вс: 9:00 - 18:00', uz: 'Sh-Ya: 9:00 - 18:00' },
    'footer.advantages': { ru: 'Наши преимущества', uz: 'Bizning afzalliklarimiz' },
    'footer.advantage1': { ru: 'Профессиональное оборудование', uz: 'Professional jihozlar' },
    'footer.advantage2': { ru: 'Экологичные средства', uz: 'Ekologik toza vositalar' },
    'footer.advantage3': { ru: 'Гарантия качества', uz: 'Sifat kafolati' },
    'footer.advantage4': { ru: 'Доступные цены', uz: 'Qulay narxlar' },
    'footer.copyright': { ru: '© 2024 CliningPro. Все права защищены.', uz: '© 2024 CliningPro. Barcha huquqlar himoyalangan.' },
    
    // Order Constructor
    'constructor.title': { ru: 'Конструктор заказа', uz: 'Buyurtma konstruktori' },
    'constructor.select_services': { ru: 'Выберите услуги', uz: 'Xizmatlarni tanlang' },
    'constructor.area': { ru: 'Площадь (м²)', uz: 'Maydon (m²)' },
    'constructor.quantity': { ru: 'Количество', uz: 'Miqdor' },
    'constructor.type': { ru: 'Тип уборки', uz: 'Tozalash turi' },
    'constructor.type.maintenance': { ru: 'Поддерживающая', uz: 'Qo\'llab-quvvatlovchi' },
    'constructor.type.general': { ru: 'Генеральная', uz: 'General' },
    'constructor.level': { ru: 'Уровень загрязнения', uz: 'Ifloslanish darajasi' },
    'constructor.level.light': { ru: 'Легкое', uz: 'Engil' },
    'constructor.level.medium': { ru: 'Среднее', uz: 'O\'rta' },
    'constructor.level.heavy': { ru: 'Сильное', uz: 'Kuchli' },
    'constructor.date': { ru: 'Предпочтительная дата', uz: 'Afzal sana' },
    'constructor.time': { ru: 'Предпочтительное время', uz: 'Afzal vaqt' },
    'constructor.total': { ru: 'Итого', uz: 'Jami' },
    'constructor.discount': { ru: 'Скидка 3%', uz: '3% chegirma' },
    'constructor.order': { ru: 'Оформить заказ', uz: 'Buyurtma berish' },
    'constructor.sum': { ru: 'сум', uz: 'so\'m' },
    
    // Contact Form
    'contact.title': { ru: 'Контактная информация', uz: 'Kontakt ma\'lumotlari' },
    'contact.name': { ru: 'Имя', uz: 'Ism' },
    'contact.phone': { ru: 'Номер телефона', uz: 'Telefon raqami' },
    'contact.address': { ru: 'Адрес', uz: 'Manzil' },
    'contact.comment': { ru: 'Комментарий', uz: 'Izoh' },
    'contact.location': { ru: 'Определить местоположение', uz: 'Joylashuvni aniqlash' },
    'contact.send': { ru: 'Отправить заказ', uz: 'Buyurtma yuborish' },
    'contact.success': { ru: 'Заказ успешно отправлен!', uz: 'Buyurtma muvaffaqiyatli yuborildi!' },
    
    // Mobile Panel
    'mobile.call': { ru: 'Позвонить', uz: 'Qo\'ng\'iroq' },
    'mobile.constructor': { ru: 'Конструктор', uz: 'Konstruktor' },
    
    // Common
    'close': { ru: 'Закрыть', uz: 'Yopish' },
    'add': { ru: 'Добавить', uz: 'Qo\'shish' },
    'remove': { ru: 'Удалить', uz: 'O\'chirish' },
    'from': { ru: 'от', uz: 'dan' },
    'phone': { ru: 'Телефон', uz: 'Telefon' },
    'address': { ru: 'Адрес', uz: 'Manzil' }
  }
};