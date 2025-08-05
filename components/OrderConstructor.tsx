'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Calendar, Clock, ShoppingCart, Trash2, Calculator, Sparkles, Star, ArrowRight } from 'lucide-react';
import { siteData } from '@/config/site-data';
import { useLanguage } from '@/lib/i18n';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

interface OrderItem {
  serviceId: string;
  quantity?: number;
  area?: number;
  type?: string;
  level?: string;
  price: number;
}

interface OrderConstructorProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderComplete: (orderData: any) => void;
  selectedServiceId?: string;
}

export function OrderConstructor({ 
  isOpen, 
  onClose, 
  onOrderComplete, 
  selectedServiceId 
}: OrderConstructorProps) {
  const { t } = useLanguage();
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (selectedServiceId && isOpen) {
      const existingItem = orderItems.find(item => item.serviceId === selectedServiceId);
      if (!existingItem) {
        addService(selectedServiceId);
      }
    }
  }, [selectedServiceId, isOpen]);

  const addService = (serviceId: string) => {
    const service = siteData.services[serviceId];
    if (!service) return;

    const newItem: OrderItem = {
      serviceId,
      price: service.basePrice
    };

    if (service.priceType === 'perSqm') {
      newItem.area = 50;
      newItem.level = 'light';
      if (serviceId === 'paving_cleaning') {
        newItem.type = 'maintenance';
      }
    } else {
      newItem.quantity = 5;
    }

    setOrderItems(prev => [...prev, newItem]);
    calculateItemPrice(newItem);
  };

  const removeService = (index: number) => {
    setOrderItems(prev => prev.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, updates: Partial<OrderItem>) => {
    setOrderItems(prev => prev.map((item, i) => {
      if (i !== index) return item;
      
      const updatedItem = { ...item, ...updates };
      updatedItem.price = calculateItemPrice(updatedItem);
      return updatedItem;
    }));
  };

  const calculateItemPrice = (item: OrderItem): number => {
    const service = siteData.services[item.serviceId];
    if (!service) return 0;

    let price = service.basePrice;

    if (service.priceType === 'perSqm' && item.area) {
      price *= item.area;
    } else if (service.priceType === 'perItem' && item.quantity) {
      price *= item.quantity;
    }

    // Apply multipliers
    if (service.multipliers) {
      if (item.type && service.multipliers.type) {
        price *= service.multipliers.type[item.type] || 1;
      }
      if (item.level && service.multipliers.level) {
        price *= service.multipliers.level[item.level] || 1;
      }
    }

    return Math.round(price);
  };

  const calculateTotal = () => {
    const subtotal = orderItems.reduce((sum, item) => sum + item.price, 0);
    const discount = subtotal > 1000000 ? Math.round(subtotal * 0.03) : 0;
    const total = subtotal - discount;
    
    return { subtotal, discount, total };
  };

  const handleOrderSubmit = () => {
    const { subtotal, discount, total } = calculateTotal();
    
    const orderData = {
      services: orderItems.map(item => ({
        name: t(`services.${item.serviceId}.title`),
        quantity: item.quantity,
        area: item.area,
        type: item.type ? t(`constructor.type.${item.type}`) : undefined,
        level: item.level ? t(`constructor.level.${item.level}`) : undefined,
        price: item.price
      })),
      total: subtotal,
      discount,
      finalTotal: total,
      date: selectedDate,
      time: selectedTime
    };

    onOrderComplete(orderData);
  };

  const { subtotal, discount, total } = calculateTotal();

  // Генерация временных слотов
  const timeSlots = Array.from({ length: 12 }, (_, i) => {
    const hour = i + 8;
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  // Получение завтрашней даты как минимальной
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  const canProceedToStep2 = orderItems.length > 0;
  const canProceedToStep3 = orderItems.length > 0;
  const canSubmitOrder = orderItems.length > 0 && selectedDate && selectedTime;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden border border-gray-100"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 text-white">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{t('constructor.title')}</h2>
                  <p className="text-blue-100 text-sm">Шаг {step} из 3</p>
                </div>
              </div>
              <Button
                onClick={onClose}
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 rounded-full"
              >
                <X className="w-6 h-6" />
              </Button>
            </div>

            {/* Progress Bar */}
            <div className="px-6 py-4 bg-gray-50">
              <div className="flex items-center space-x-4">
                {[1, 2, 3].map((stepNum) => (
                  <div key={stepNum} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                      step >= stepNum 
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {stepNum}
                    </div>
                    {stepNum < 3 && (
                      <div className={`w-16 h-1 mx-2 rounded-full transition-all ${
                        step > stepNum ? 'bg-gradient-to-r from-cyan-500 to-blue-500' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-600">
                <span>Услуги</span>
                <span>Параметры</span>
                <span>Время</span>
              </div>
            </div>

            <div className="overflow-y-auto max-h-[calc(90vh-280px)]">
              <div className="p-6">
                {/* Step 1: Service Selection */}
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {t('constructor.select_services')}
                      </h3>
                      <p className="text-gray-600">Выберите необходимые услуги для вашего объекта</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {Object.entries(siteData.services).map(([serviceId, service]) => (
                        <motion.div
                          key={serviceId}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            onClick={() => addService(serviceId)}
                            variant="outline"
                            className="w-full h-auto p-4 flex flex-col items-center space-y-3 hover:bg-gradient-to-br hover:from-blue-50 hover:to-cyan-50 hover:border-blue-300 transition-all duration-300 rounded-2xl"
                          >
                            <span className="text-3xl">{service.icon}</span>
                            <div className="text-center">
                              <div className="font-semibold text-sm leading-tight">
                                {t(`services.${serviceId}.title`)}
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                от {service.basePrice.toLocaleString()} сум
                              </div>
                            </div>
                          </Button>
                        </motion.div>
                      ))}
                    </div>

                    {/* Selected Services */}
                    {orderItems.length > 0 && (
                      <div className="mt-8">
                        <h4 className="text-lg font-semibold mb-4 flex items-center">
                          <Sparkles className="w-5 h-5 mr-2 text-blue-500" />
                          Выбранные услуги
                        </h4>
                        <div className="space-y-3">
                          {orderItems.map((item, index) => {
                            const service = siteData.services[item.serviceId];
                            return (
                              <Card key={index} className="border-l-4 border-l-blue-500">
                                <CardContent className="p-4">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                      <span className="text-2xl">{service.icon}</span>
                                      <div>
                                        <div className="font-semibold">
                                          {t(`services.${item.serviceId}.title`)}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                          {service.basePrice.toLocaleString()} сум / {service.priceType === 'perSqm' ? 'м²' : 'шт'}
                                        </div>
                                      </div>
                                    </div>
                                    <Button
                                      onClick={() => removeService(index)}
                                      variant="ghost"
                                      size="icon"
                                      className="text-red-500 hover:bg-red-50 rounded-full"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </CardContent>
                              </Card>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Step 2: Parameters */}
                {step === 2 && orderItems.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        Настройка параметров
                      </h3>
                      <p className="text-gray-600">Укажите детали для точного расчета стоимости</p>
                    </div>

                    {orderItems.map((item, index) => {
                      const service = siteData.services[item.serviceId];
                      return (
                        <Card key={index} className="border border-gray-200 rounded-2xl overflow-hidden">
                          <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b">
                            <CardTitle className="flex items-center space-x-3">
                              <span className="text-2xl">{service.icon}</span>
                              <span>{t(`services.${item.serviceId}.title`)}</span>
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="p-6 space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                              {/* Area/Quantity Input */}
                              <div>
                                <label className="block text-sm font-semibold mb-3 text-gray-700">
                                  {service.priceType === 'perSqm' 
                                    ? t('constructor.area') 
                                    : t('constructor.quantity')
                                  }
                                </label>
                                <div className="flex items-center space-x-3">
                                  <Button
                                    onClick={() => {
                                      const key = service.priceType === 'perSqm' ? 'area' : 'quantity';
                                      const currentValue = item[key] || 1;
                                      if (currentValue > 1) {
                                        updateItem(index, { [key]: currentValue - 1 });
                                      }
                                    }}
                                    variant="outline"
                                    size="icon"
                                    className="h-10 w-10 rounded-full"
                                  >
                                    <Minus className="w-4 h-4" />
                                  </Button>
                                  <Input
                                    type="number"
                                    min="1"
                                    value={service.priceType === 'perSqm' ? item.area || 1 : item.quantity || 1}
                                    onChange={(e) => {
                                      const key = service.priceType === 'perSqm' ? 'area' : 'quantity';
                                      updateItem(index, { [key]: Math.max(1, parseInt(e.target.value) || 1) });
                                    }}
                                    className="text-center h-10 text-lg font-semibold rounded-xl"
                                  />
                                  <Button
                                    onClick={() => {
                                      const key = service.priceType === 'perSqm' ? 'area' : 'quantity';
                                      const currentValue = item[key] || 1;
                                      updateItem(index, { [key]: currentValue + 1 });
                                    }}
                                    variant="outline"
                                    size="icon"
                                    className="h-10 w-10 rounded-full"
                                  >
                                    <Plus className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>

                              {/* Type Selection (for paving cleaning) */}
                              {item.serviceId === 'paving_cleaning' && (
                                <div>
                                  <label className="block text-sm font-semibold mb-3 text-gray-700">
                                    {t('constructor.type')}
                                  </label>
                                  <Select
                                    value={item.type || 'maintenance'}
                                    onValueChange={(value) => updateItem(index, { type: value })}
                                  >
                                    <SelectTrigger className="h-10 rounded-xl">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="maintenance">
                                        {t('constructor.type.maintenance')}
                                      </SelectItem>
                                      <SelectItem value="general">
                                        {t('constructor.type.general')}
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              )}

                              {/* Level Selection */}
                              {service.multipliers?.level && (
                                <div className={item.serviceId === 'paving_cleaning' ? 'md:col-span-2' : ''}>
                                  <label className="block text-sm font-semibold mb-3 text-gray-700">
                                    {t('constructor.level')}
                                  </label>
                                  <div className="grid grid-cols-3 gap-2">
                                    {['light', 'medium', 'heavy'].map((level) => (
                                      <Button
                                        key={level}
                                        onClick={() => updateItem(index, { level })}
                                        variant={item.level === level ? "default" : "outline"}
                                        className={`h-12 rounded-xl transition-all ${
                                          item.level === level 
                                            ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' 
                                            : 'hover:bg-gray-50'
                                        }`}
                                      >
                                        {t(`constructor.level.${level}`)}
                                      </Button>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>

                            <div className="flex justify-between items-center pt-4 border-t">
                              <span className="text-gray-600">Стоимость услуги:</span>
                              <div className="text-right">
                                <div className="text-2xl font-bold text-blue-600">
                                  {item.price.toLocaleString()} {t('constructor.sum')}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </motion.div>
                )}

                {/* Step 3: Schedule */}
                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        Выберите удобное время
                      </h3>
                      <p className="text-gray-600">Когда вам удобно провести уборку?</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <Card className="p-6 rounded-2xl">
                        <div className="flex items-center space-x-3 mb-4">
                          <Calendar className="w-6 h-6 text-blue-500" />
                          <label className="text-lg font-semibold text-gray-900">
                            {t('constructor.date')}
                          </label>
                        </div>
                        <Input
                          type="date"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          min={minDate}
                          className="h-12 text-lg rounded-xl"
                        />
                      </Card>

                      <Card className="p-6 rounded-2xl">
                        <div className="flex items-center space-x-3 mb-4">
                          <Clock className="w-6 h-6 text-blue-500" />
                          <label className="text-lg font-semibold text-gray-900">
                            {t('constructor.time')}
                          </label>
                        </div>
                        <Select value={selectedTime} onValueChange={setSelectedTime}>
                          <SelectTrigger className="h-12 text-lg rounded-xl">
                            <SelectValue placeholder="Выберите время" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </Card>
                    </div>

                    {/* Order Summary */}
                    <Card className="border-2 border-blue-200 rounded-2xl overflow-hidden">
                      <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
                        <CardTitle className="flex items-center space-x-2">
                          <Calculator className="w-6 h-6 text-blue-600" />
                          <span>Итоговый расчет</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="space-y-3">
                          {orderItems.map((item, index) => {
                            const service = siteData.services[item.serviceId];
                            return (
                              <div key={index} className="flex justify-between items-center py-2">
                                <div className="flex items-center space-x-3">
                                  <span className="text-lg">{service.icon}</span>
                                  <div>
                                    <div className="font-medium">
                                      {t(`services.${item.serviceId}.title`)}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      {service.priceType === 'perSqm' 
                                        ? `${item.area} м²` 
                                        : `${item.quantity} шт`
                                      }
                                      {item.level && ` • ${t(`constructor.level.${item.level}`)}`}
                                    </div>
                                  </div>
                                </div>
                                <div className="text-lg font-semibold">
                                  {item.price.toLocaleString()} сум
                                </div>
                              </div>
                            );
                          })}
                          
                          <div className="border-t pt-3 space-y-2">
                            <div className="flex justify-between text-lg">
                              <span>Подытог:</span>
                              <span>{subtotal.toLocaleString()} сум</span>
                            </div>
                            {discount > 0 && (
                              <div className="flex justify-between text-green-600">
                                <span>Скидка 3%:</span>
                                <span>-{discount.toLocaleString()} сум</span>
                              </div>
                            )}
                            <div className="flex justify-between text-xl font-bold text-blue-600 border-t pt-2">
                              <span>К оплате:</span>
                              <span>{total.toLocaleString()} сум</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t bg-gray-50 p-6">
              <div className="flex justify-between items-center">
                {step > 1 && (
                  <Button
                    onClick={() => setStep(step - 1)}
                    variant="outline"
                    className="px-6 py-3 rounded-xl flex items-center"
                  >
                    Назад
                  </Button>
                )}
                
                <div className="flex-1" />
                
                {step === 1 && (
                  <Button
                    onClick={() => setStep(2)}
                    disabled={!canProceedToStep2}
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 px-8 py-3 rounded-xl flex items-center"
                  >
                    Далее
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                )}
                
                {step === 2 && (
                  <Button
                    onClick={() => setStep(3)}
                    disabled={!canProceedToStep3}
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 px-8 py-3 rounded-xl flex items-center"
                  >
                    Далее
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                )}
                
                {step === 3 && (
                  <Button
                    onClick={handleOrderSubmit}
                    disabled={!canSubmitOrder}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 px-8 py-3 rounded-xl flex items-center"
                  >
                    <Star className="mr-2 w-4 h-4" />
                    {t('constructor.order')}
                  </Button>
                )}
              </div>
              
              {/* Total in footer */}
              {orderItems.length > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Общая стоимость:</span>
                    <div className="text-2xl font-bold text-blue-600">
                      {total.toLocaleString()} {t('constructor.sum')}
                    </div>
                  </div>
                  {discount > 0 && (
                    <Badge variant="secondary" className="mt-2 bg-green-100 text-green-700">
                      Скидка 3% применена!
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}