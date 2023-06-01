import React from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const CompMultilLanguage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('Hello')}</h1>
      <LanguageSwitcher/>
    </div>
  );
};

export default CompMultilLanguage;