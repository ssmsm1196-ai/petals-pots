import React, { useState, useEffect } from 'react';
import './CenterNav.css';
import logo from '../../../assets/image/logo.png';
import { FaSearch, FaHeart } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { BiSolidShoppingBagAlt, BiMenu } from "react-icons/bi";
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ShoppingCart from '../../ShoppingCart/ShoppingCart'; // استدعاء الكمبوننت

function CenterNav() {
  const [showMenu, setShowMenu] = useState(false);
  const [showCart, setShowCart] = useState(false); // حالة ظهور السلة
  const { t, i18n } = useTranslation();

  const handleNavClick = () => setShowMenu(false);

  useEffect(() => {
    const savedLang = localStorage.getItem('language') || 'ar';
    i18n.changeLanguage(savedLang);
    document.documentElement.lang = savedLang;
    document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
  }, [i18n]);

  return (
    <div className={`CenterNav d-flex justify-content-between align-items-center row ${i18n.language === 'ar' ? 'rtl' : 'ltr'}`}>

      {/* القسم الأيمن / الأيسر حسب اللغة */}
      <div className='my-3 col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center gap-4 align-items-center nav-section'>
        <div className='rightNav d-flex justify-content-center flex-column align-items-center' role="button" tabIndex={0}>
          <FaLocationDot className='w-100' aria-hidden="true" />
          <span>{t('storeLocation')}</span>
        </div>
        <div className='rightNav d-flex justify-content-center flex-column align-items-center' role="button" tabIndex={0}>
          <FaHeart className='w-100' aria-hidden="true" />
          <span>{t('favorites')}</span>
        </div>
        <div
          className='rightNav d-flex justify-content-center flex-column align-items-center'
          role="button"
          tabIndex={0}
          onClick={() => setShowCart(true)} // فتح السلة
        >
          <BiSolidShoppingBagAlt className='w-100' aria-hidden="true" />
          <span>{t('cart')}</span>
        </div>
      </div>

      {/* اللوجو */}
      <div className='logo col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center flex-column align-items-center'>
        <img src={logo} alt="logo" />
        <div className='logo-text' style={{ color: 'var(--main-color)', textAlign: 'center', fontSize: '15px' }}>
          PETALS &amp; POTS <br />
          <span className='d-flex justify-content-center'>FLOWER</span>
        </div>

        <button
          className='menu-btn d-lg-none'
          onClick={() => setShowMenu(true)}
          aria-label={t('openMenu')}
          aria-expanded={showMenu}
        >
          <BiMenu />
        </button>
      </div>

      {/* البحث */}
      <div className='search col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center flex-column align-items-center nav-section'>
        <input placeholder={t('searchPlaceholder')} type="text" aria-label={t('search')} />
        <button aria-label={t('searchButton')}><FaSearch /></button>
      </div>

      {/* القائمة الرئيسية */}
      <ul className='main-menu' role="menubar" aria-label={t('mainMenu')}>
        <li><NavLink to='/' end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>{t('home')}</NavLink></li>
        <li><NavLink to='/natural' className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>{t('natural')}</NavLink></li>
        <li><NavLink to='/artificial' className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>{t('artificial')}</NavLink></li>
        <li><NavLink to='/arrangements' className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>{t('arrangements')}</NavLink></li>
        <li><NavLink to='/weddings' className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>{t('weddings')}</NavLink></li>
        <li><NavLink to='/birthdays' className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>{t('birthdays')}</NavLink></li>
        <li><NavLink to='/graduations' className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>{t('graduations')}</NavLink></li>
        <li><NavLink to='/contact' className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>{t('contact')}</NavLink></li>
      </ul>

      {/* مودال المينيو */}
      <div className={`menu-modal ${showMenu ? 'show' : ''}`} role="dialog" aria-modal={showMenu} aria-label={t('navMenu')}>
        <div className="menu-content">
          <button className='close-btn' onClick={() => setShowMenu(false)} aria-label={t('closeMenu')}>&times;</button>
          <ul>
            <li><NavLink to='/' end onClick={handleNavClick}>{t('home')}</NavLink></li>
            <li><NavLink to='/natural' onClick={handleNavClick}>{t('natural')}</NavLink></li>
            <li><NavLink to='/artificial' onClick={handleNavClick}>{t('artificial')}</NavLink></li>
            <li><NavLink to='/arrangements' onClick={handleNavClick}>{t('arrangements')}</NavLink></li>
            <li><NavLink to='/weddings' onClick={handleNavClick}>{t('weddings')}</NavLink></li>
            <li><NavLink to='/birthdays' onClick={handleNavClick}>{t('birthdays')}</NavLink></li>
            <li><NavLink to='/graduations' onClick={handleNavClick}>{t('graduations')}</NavLink></li>
            <li><NavLink to='/contact' onClick={handleNavClick}>{t('contact')}</NavLink></li>
          </ul>
        </div>
      </div>

      {/* مودال السلة */}
      {showCart && <ShoppingCart onClose={() => setShowCart(false)} />}
    </div>
  );
}

export default CenterNav;
