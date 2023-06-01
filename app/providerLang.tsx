"use client";

import { I18nextProvider } from 'react-i18next';
import i18n from '../lib/multil_language/i18n';
import {useSelector} from 'react-redux';
import { useEffect } from 'react';
import { RootState } from '../store/store';

export function ProviderLang({ children }: { children: React.ReactNode }) {
  const langNew = useSelector((state : RootState) => state.setting.lang);
  useEffect(() => {
    i18n.changeLanguage(langNew);
  }, [langNew])

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}
