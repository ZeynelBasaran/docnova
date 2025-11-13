// src/components/LanguageSwitcher.jsx

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Select } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

const languageOptions = [
  {
    value: 'tr',
    label: 'Türkçe',
  },
  {
    value: 'en',
    label: 'English',
  },
];


const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLanguageChange = (value) => {
    const short = value.split('-')[0];
    const newPath = `/${short}` + location.pathname.replace(/^\/(en|tr)/, '');
    i18n.changeLanguage(short);
    navigate(newPath, { replace: true });
  };

  // Tarayıcı dili 'en-US' gibi detaylı gelebilir, 
  // 'en' kısmını almak için split kullanmak güvenli bir yöntemdir.
  const currentLanguage = i18n.language.split('-')[0];

  return (
    <Select
      value={currentLanguage}
      style={{ width: 120 }}
      onChange={handleLanguageChange}
      options={languageOptions}
    />
  );
};

export default LanguageSwitcher;