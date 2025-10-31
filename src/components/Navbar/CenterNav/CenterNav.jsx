import React, { useState, useEffect } from 'react';
import './CenterNav.css';
import logo from '../../../assets/image/logo.png';
import { FaHeart } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { BiSolidShoppingBagAlt, BiMenu } from "react-icons/bi";
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ShoppingCart from '../../ShoppingCart/ShoppingCart';
import { useCart } from '../../../context/CartContext';

function CenterNav() {
  const [showMenu, setShowMenu] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const { cartItems } = useCart();
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
          onClick={() => setShowCart(true)}
        >
          <BiSolidShoppingBagAlt className='w-100' aria-hidden="true" />
          <span>{t('cart')}</span>
        </div>
      </div>

      <div className='logo col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center flex-column align-items-center'>
        <img src={logo} alt="logo" />
        <div className='logo-text' style={{ color: 'var(--main-color)', textAlign: 'center', fontSize: '15px' }}>
          PETALS & POTS <br />
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

      <div className='search col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center flex-column align-items-center nav-section'>
        <input placeholder={t('searchPlaceholder')} type="text" aria-label={t('search')} />
        <button aria-label={t('searchButton')}></button>
      </div>

      <ul className='main-menu' role="menubar" aria-label={t('mainMenu')}>
        <li><NavLink to='/' end>{t('home')}</NavLink></li>
        <li><NavLink to='/natural'>{t('natural')}</NavLink></li>
        <li><NavLink to='/artificial'>{t('artificial')}</NavLink></li>
        <li><NavLink to='/arrangements'>{t('arrangements')}</NavLink></li>
        <li><NavLink to='/weddings'>{t('weddings')}</NavLink></li>
        <li><NavLink to='/birthdays'>{t('birthdays')}</NavLink></li>
        <li><NavLink to='/graduations'>{t('graduations')}</NavLink></li>
        <li><NavLink to='/contact'>{t('contact')}</NavLink></li>
      </ul>

      <div className={`menu-modal ${showMenu ? 'show' : ''}`}>
        <div className="menu-content">
          <button className='close-btn' onClick={() => setShowMenu(false)}>&times;</button>
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

      {showCart && <ShoppingCart onClose={() => setShowCart(false)} />}
    </div>
  );
}

export default CenterNav;
