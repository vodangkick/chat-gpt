'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { store } from '../../store/store';
import translationVI from './locales/vi.json';


i18n.use(initReactI18next).init({
    resources: {
      vi: {
        translation: translationVI
      }
    },
    lng: store.getState().setting.lang, // Ngôn ngữ mặc định
    fallbackLng: 'en', // Ngôn ngữ fallback nếu không tìm thấy translation cho ngôn ngữ hiện tại
    interpolation: {
      escapeValue: false // Cho phép sử dụng HTML tags trong translation
    }
  });

export default i18n;
