import React, { useEffect, useCallback } from 'react';
import { IoLogoWhatsapp } from "react-icons/io";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebookF, FaTiktok } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import './TopNav.css';

function TopNav() {
  const { t, i18n } = useTranslation();

  // تبديل اللغة مع تحديث RTL/LTR وتخزين اللغة
  const toggleLanguage = useCallback(() => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('language', newLang);
  }, [i18n]);

  // تحميل اللغة المحفوظة عند أول تحميل الكمبوننت
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
          aria-label={t('toggleLanguage')}
        >
          {i18n.language === 'ar' ? 'EN' : 'AR'}
        </button>
        <div className='SocialLinks d-flex gap-2'>
          <a href="https://wa.me/971544808838" aria-label="WhatsApp"><IoLogoWhatsapp /></a>
          <a href="https://www.instagram.com/petals_and_potss?igsh=MTRxOXpybTY4bm5xag%3D%3D&utm_source=qr"  aria-label="Instagram"><AiFillInstagram /></a>
          <a href="https://www.facebook.com/share/1A4453xfN1/?mibextid=wwXIfr" aria-label="Facebook" ><FaFacebookF /></a>
          <a href="https://www.tiktok.com/@petals_and_potss?_r=1&_t=ZS-91ECrldGzJs" aria-label="TikTok" ><FaTiktok /></a>
        </div>
      </div>
    </div>
  );
}

export default React.memo(TopNav);
