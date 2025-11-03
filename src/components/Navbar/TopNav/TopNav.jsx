import React, { useEffect } from 'react';
import { IoLogoWhatsapp } from "react-icons/io";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebookF, FaTiktok } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import './TopNav.css';

function TopNav() {
  const { t, i18n } = useTranslation();

  // تبديل اللغة وزيادة RTL/LTR فورًا
  const toggleLanguage = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('language', newLang);
  };

  // تحميل اللغة المحفوظة عند أول تشغيل
  useEffect(() => {
    const savedLang = localStorage.getItem('language') || 'ar';
    i18n.changeLanguage(savedLang);
    document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
  }, [i18n]);

  return (
    <div className='TopNav d-flex justify-content-between align-items-center'>
      
      {/* نص التوصيل المجاني */}
      <p className='top-text'>{t('freeDelivery')}</p>

      {/* روابط السوشيال + زر اللغة */}
      <div className='SocialLinksWrapper d-flex align-items-center gap-2'>
        <button
          onClick={toggleLanguage}
          className="lang-btn"
        >
          {i18n.language === 'ar' ? 'EN' : 'AR'}
        </button>
        <div className='SocialLinks d-flex gap-2'>
          <a href="#"><IoLogoWhatsapp/></a>
          <a href="#"><AiFillInstagram/></a>
          <a href="#"><FaFacebookF/></a>
          <a href="#"><FaTiktok/></a>
        </div>
      </div>
    </div>
  );
}

export default TopNav;
