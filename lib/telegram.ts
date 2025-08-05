interface OrderData {
  services: Array<{
    name: string;
    quantity?: number;
    area?: number;
    type?: string;
    level?: string;
    price: number;
  }>;
  total: number;
  discount: number;
  finalTotal: number;
  date?: string;
  time?: string;
  customerInfo: {
    name: string;
    phone: string;
    address: string;
    comment?: string;
  };
}

export const sendToTelegram = async (orderData: OrderData): Promise<boolean> => {
  try {
    const botToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
    const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

    console.log('📤 Отправка заказа в Telegram:', {
      botToken: botToken ? botToken.substring(0, 10) + '...' : 'не установлен',
      chatId,
      orderData: {
        ...orderData,
        customerInfo: {
          ...orderData.customerInfo,
          phone: orderData.customerInfo.phone.substring(0, 8) + '...'
        }
      }
    });

    // Проверяем наличие токена и chat_id
    if (!botToken || !chatId) {
      console.error('❌ Не настроены переменные окружения для Telegram');
      throw new Error('Telegram не настроен. Обратитесь к администратору.');
    }

    // Проверяем валидность токена перед отправкой
    if (botToken.length < 10) {
      console.error('❌ Неверный токен Telegram бота');
      throw new Error('Неверный токен Telegram бота');
    }

    if (!chatId.startsWith('-') && !chatId.match(/^\d+$/)) {
      console.error('❌ Неверный chat_id для Telegram');
      throw new Error('Неверный chat_id для Telegram');
    }

    const message = formatOrderMessage(orderData);
    
    try {
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'HTML',
        }),
      });

      const result = await response.json();
      
      if (response.ok) {
        console.log('✅ Заказ успешно отправлен в Telegram:', result);
        return true;
      } else {
        console.error('❌ Ошибка отправки в Telegram:', result);
        throw new Error(`Ошибка Telegram API: ${result.description || 'Неизвестная ошибка'}`);
      }
    } catch (fetchError) {
      console.error('❌ Ошибка сети при отправке в Telegram:', fetchError);
      throw new Error('Ошибка сети. Проверьте подключение к интернету.');
    }
  } catch (error) {
    console.error('❌ Ошибка при отправке в Telegram:', error);
    throw error;
  }
};

const formatOrderMessage = (orderData: OrderData): string => {
  let message = '<b>🧹 Новый заказ CliningPro</b>\n\n';
  
  // Customer info
  message += '<b>👤 Информация о клиенте:</b>\n';
  message += `Имя: ${orderData.customerInfo.name}\n`;
  message += `Телефон: ${orderData.customerInfo.phone}\n`;
  message += `Адрес: ${orderData.customerInfo.address}\n`;
  if (orderData.customerInfo.comment) {
    message += `Комментарий: ${orderData.customerInfo.comment}\n`;
  }
  
  // Services
  message += '\n<b>🛍️ Заказанные услуги:</b>\n';
  orderData.services.forEach((service, index) => {
    message += `${index + 1}. ${service.name}\n`;
    if (service.area) {
      message += `   📐 Площадь: ${service.area} м²\n`;
    }
    if (service.quantity) {
      message += `   🔢 Количество: ${service.quantity}\n`;
    }
    if (service.type) {
      message += `   📋 Тип: ${service.type}\n`;
    }
    if (service.level) {
      message += `   🎯 Уровень загрязнения: ${service.level}\n`;
    }
    message += `   💰 Стоимость: ${service.price.toLocaleString()} сум\n\n`;
  });
  
  // Schedule
  if (orderData.date || orderData.time) {
    message += '<b>📅 Предпочтительное время:</b>\n';
    if (orderData.date) {
      message += `Дата: ${orderData.date}\n`;
    }
    if (orderData.time) {
      message += `Время: ${orderData.time}\n`;
    }
    message += '\n';
  }
  
  // Total
  message += '<b>💰 Итого:</b>\n';
  message += `Сумма: ${orderData.total.toLocaleString()} сум\n`;
  if (orderData.discount > 0) {
    message += `🎉 Скидка: ${orderData.discount.toLocaleString()} сум\n`;
  }
  message += `<b>💳 К оплате: ${orderData.finalTotal.toLocaleString()} сум</b>\n\n`;
  
  message += '<i>📞 Свяжитесь с клиентом в течение 15 минут!</i>';
  
  return message;
};

// Функция для тестирования подключения к Telegram
export const testTelegramConnection = async (): Promise<boolean> => {
  try {
    const botToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
    
    if (!botToken || botToken === 'demo_token') {
      console.log('⚠️ Telegram bot не настроен (используется демо-режим)');
      return false;
    }

    const response = await fetch(`https://api.telegram.org/bot${botToken}/getMe`);
    const result = await response.json();
    
    if (response.ok && result.ok) {
      console.log('✅ Telegram bot подключен:', result.result.username);
      return true;
    } else {
      console.error('❌ Ошибка подключения к Telegram bot:', result);
      return false;
    }
  } catch (error) {
    console.error('❌ Ошибка тестирования Telegram:', error);
    return false;
  }
};