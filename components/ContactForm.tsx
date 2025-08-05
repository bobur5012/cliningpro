'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Phone, User, MessageSquare, CheckCircle, AlertCircle, Loader2, Navigation, Star, Sparkles } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import InputMask from 'react-input-mask';
import { sendToTelegram } from '@/lib/telegram';
import { useLanguage } from '@/lib/i18n';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
  orderData: any;
}

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Имя должно содержать минимум 2 символа')
    .required('Введите ваше имя'),
  phone: Yup.string()
    .matches(/^\+998 \d{2} \d{3} \d{2} \d{2}$/, 'Введите корректный номер телефона')
    .required('Введите номер телефона'),
  address: Yup.string()
    .min(10, 'Адрес должен содержать минимум 10 символов')
    .required('Введите адрес'),
  comment: Yup.string()
});

export function ContactForm({ isOpen, onClose, orderData }: ContactFormProps) {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const getLocation = async (setFieldValue: any) => {
    if (!navigator.geolocation) {
      alert('Геолокация не поддерживается вашим браузером');
      return;
    }

    setIsLocationLoading(true);
    setSubmitError('');
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          
          // Using a free geocoding service (Nominatim)
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=ru`
          );
          
          if (response.ok) {
            const data = await response.json();
            const address = data.display_name || `${latitude}, ${longitude}`;
            setFieldValue('address', address);
          } else {
            setFieldValue('address', `${latitude}, ${longitude}`);
          }
        } catch (error) {
          console.error('Error getting address:', error);
          setFieldValue('address', `${position.coords.latitude}, ${position.coords.longitude}`);
        } finally {
          setIsLocationLoading(false);
        }
      },
      (error) => {
        console.error('Error getting location:', error);
        setSubmitError('Не удалось определить местоположение. Введите адрес вручную.');
        setIsLocationLoading(false);
      }
    );
  };

  const handleSubmit = async (values: any) => {
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      await sendToTelegram({
        ...orderData,
        customerInfo: values
      });

      setIsSuccess(true);
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError(error instanceof Error ? error.message : 'Произошла ошибка при отправке заказа. Попробуйте позже или свяжитесь с нами по телефону.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden border border-gray-100"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{t('contact.title')}</h2>
                  <p className="text-emerald-100 text-sm">Заполните форму для оформления заказа</p>
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

            <div className="overflow-y-auto max-h-[calc(90vh-100px)]">
              <div className="p-6">
                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="text-center py-12"
                    >
                      <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <CheckCircle className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        {t('contact.success')}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Мы получили ваш заказ и свяжемся с вами в течение 15 минут
                      </p>
                      <div className="flex items-center justify-center space-x-2 text-emerald-600">
                        <Star className="w-5 h-5 fill-current" />
                        <span className="font-semibold">Спасибо за выбор CliningPro!</span>
                        <Sparkles className="w-5 h-5" />
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {/* Order Summary */}
                      {orderData && (
                        <Card className="mb-6 border-2 border-blue-200 rounded-2xl overflow-hidden">
                          <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b">
                            <CardTitle className="flex items-center space-x-2 text-blue-700">
                              <Sparkles className="w-5 h-5" />
                              <span>Ваш заказ</span>
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="p-4">
                            <div className="space-y-3">
                              {orderData.services.map((service: any, index: number) => (
                                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                                  <div>
                                    <div className="font-medium text-gray-900">{service.name}</div>
                                    <div className="text-sm text-gray-500">
                                      {service.area && `${service.area} м²`}
                                      {service.quantity && `${service.quantity} шт`}
                                      {service.level && ` • ${service.level}`}
                                    </div>
                                  </div>
                                  <div className="font-semibold text-blue-600">
                                    {service.price.toLocaleString()} сум
                                  </div>
                                </div>
                              ))}
                              <div className="flex justify-between items-center pt-3 border-t-2 border-blue-200">
                                <span className="text-lg font-bold text-gray-900">Итого:</span>
                                <div className="text-right">
                                  <div className="text-xl font-bold text-blue-600">
                                    {orderData.finalTotal.toLocaleString()} сум
                                  </div>
                                  {orderData.discount > 0 && (
                                    <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                                      Скидка: {orderData.discount.toLocaleString()} сум
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              {orderData.date && (
                                <div className="text-sm text-gray-600 pt-2 border-t">
                                  📅 {orderData.date} {orderData.time && `в ${orderData.time}`}
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      <Formik
                        initialValues={{
                          name: '',
                          phone: '',
                          address: '',
                          comment: ''
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                      >
                        {({ setFieldValue, values, errors, touched }) => (
                          <Form className="space-y-6">
                            {/* Name */}
                            <div>
                              <label className="flex items-center text-sm font-semibold mb-3 text-gray-700">
                                <User className="w-4 h-4 mr-2 text-blue-500" />
                                {t('contact.name')} *
                              </label>
                              <Field
                                as={Input}
                                name="name"
                                placeholder="Введите ваше имя"
                                className={`h-12 rounded-xl transition-all ${
                                  errors.name && touched.name 
                                    ? 'border-red-300 focus:border-red-500' 
                                    : 'focus:border-blue-500'
                                }`}
                              />
                              <ErrorMessage
                                name="name"
                                component="div"
                                className="text-red-500 text-sm mt-2 flex items-center"
                              >
                                {(msg) => (
                                  <div className="flex items-center">
                                    <AlertCircle className="w-4 h-4 mr-1" />
                                    {msg}
                                  </div>
                                )}
                              </ErrorMessage>
                            </div>

                            {/* Phone */}
                            <div>
                              <label className="flex items-center text-sm font-semibold mb-3 text-gray-700">
                                <Phone className="w-4 h-4 mr-2 text-green-500" />
                                {t('contact.phone')} *
                              </label>
                              <Field name="phone">
                                {({ field }: any) => (
                                  <InputMask
                                    {...field}
                                    mask="+998 99 999 99 99"
                                    placeholder="+998 33 424 42 42"
                                  >
                                    {(inputProps: any) => (
                                      <Input 
                                        {...inputProps} 
                                        className={`h-12 rounded-xl transition-all ${
                                          errors.phone && touched.phone 
                                            ? 'border-red-300 focus:border-red-500' 
                                            : 'focus:border-green-500'
                                        }`}
                                      />
                                    )}
                                  </InputMask>
                                )}
                              </Field>
                              <ErrorMessage
                                name="phone"
                                component="div"
                                className="text-red-500 text-sm mt-2 flex items-center"
                              >
                                {(msg) => (
                                  <div className="flex items-center">
                                    <AlertCircle className="w-4 h-4 mr-1" />
                                    {msg}
                                  </div>
                                )}
                              </ErrorMessage>
                            </div>

                            {/* Address */}
                            <div>
                              <label className="flex items-center text-sm font-semibold mb-3 text-gray-700">
                                <MapPin className="w-4 h-4 mr-2 text-orange-500" />
                                {t('contact.address')} *
                              </label>
                              <div className="space-y-3">
                                <Field
                                  as={Textarea}
                                  name="address"
                                  placeholder="Введите полный адрес (район, улица, дом, квартира)"
                                  rows={3}
                                  className={`rounded-xl transition-all resize-none ${
                                    errors.address && touched.address 
                                      ? 'border-red-300 focus:border-red-500' 
                                      : 'focus:border-orange-500'
                                  }`}
                                />
                                <Button
                                  type="button"
                                  onClick={() => getLocation(setFieldValue)}
                                  disabled={isLocationLoading}
                                  variant="outline"
                                  className="w-full h-12 rounded-xl border-2 border-orange-200 hover:border-orange-300 hover:bg-orange-50 transition-all"
                                >
                                  {isLocationLoading ? (
                                    <>
                                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                      Определяем местоположение...
                                    </>
                                  ) : (
                                    <>
                                      <Navigation className="w-4 h-4 mr-2 text-orange-500" />
                                      {t('contact.location')}
                                    </>
                                  )}
                                </Button>
                              </div>
                              <ErrorMessage
                                name="address"
                                component="div"
                                className="text-red-500 text-sm mt-2 flex items-center"
                              >
                                {(msg) => (
                                  <div className="flex items-center">
                                    <AlertCircle className="w-4 h-4 mr-1" />
                                    {msg}
                                  </div>
                                )}
                              </ErrorMessage>
                            </div>

                            {/* Comment */}
                            <div>
                              <label className="flex items-center text-sm font-semibold mb-3 text-gray-700">
                                <MessageSquare className="w-4 h-4 mr-2 text-purple-500" />
                                {t('contact.comment')}
                              </label>
                              <Field
                                as={Textarea}
                                name="comment"
                                placeholder="Дополнительные пожелания, особенности объекта, время звонка..."
                                rows={4}
                                className="rounded-xl resize-none focus:border-purple-500 transition-all"
                              />
                            </div>

                            {/* Error Message */}
                            {submitError && (
                              <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start space-x-3"
                              >
                                <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                                <div className="text-red-700 text-sm">{submitError}</div>
                              </motion.div>
                            )}

                            <Button
                              type="submit"
                              disabled={isSubmitting}
                              className="w-full h-14 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
                            >
                              {isSubmitting ? (
                                <>
                                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                  Отправляем заказ...
                                </>
                              ) : (
                                <>
                                  <Star className="w-5 h-5 mr-2" />
                                  {t('contact.send')}
                                </>
                              )}
                            </Button>

                            <div className="text-center text-sm text-gray-500">
                              Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
                            </div>
                          </Form>
                        )}
                      </Formik>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}