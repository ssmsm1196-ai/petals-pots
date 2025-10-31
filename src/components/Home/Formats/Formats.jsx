import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './Formats.css';
import ProductsSlider from '../ProductsSlider/ProductsSlider';

function Formats() {
  const { t } = useTranslation();
  const swiperRef = useRef(null);

  const products = [
    { id: 1, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRTwY5akqS6kZOGhO6VWO0uIw-26AhqREdFg&s', name: 'منتج صيغة 1', originalPrice: 100, discountPrice: 80, rating: 4 },
    { id: 2, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuhN_MQZxbabv7SfwcuMJuYOHb5KHhFdW89Q&s', name: 'منتج صيغة 2', originalPrice: 120, discountPrice: 95, rating: 5 },
    { id: 3, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPjU94XlE3ZM2YRJuSthTNM_I14icrwH-bSA&s', name: 'منتج صيغة 3', originalPrice: 90, discountPrice: 70, rating: 3 },
    { id: 4, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8AQCmAZn20tSA5CQIIeThMlhAxzYgk7ICXg&s', name: 'منتج صيغة 4', originalPrice: 90, discountPrice: 70, rating: 3 },
    { id: 5, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBfaEK41K369peY12En20_1bLnnNmZTKK_YQ&s', name: 'منتج صيغة 5', originalPrice: 90, discountPrice: 70, rating: 3 },
    { id: 6, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzPPsXynyPPDovhBw8O4NceDMWi7QZ9M1kSlrYwXkxgTMqh7hXy-4n8XsN85e3_3bqBeE&usqp=CAU', name: 'منتج صيغة 6', originalPrice: 90, discountPrice: 70, rating: 3 },
    { id: 7, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRW5MdseoXaDIuPNM7yWcYqTtoilEM0oKYHA&s', name: 'منتج صيغة 7', originalPrice: 90, discountPrice: 70, rating: 3 },
  ];

  return (
    <div className='Formats'>
      {/* Header مع العنوان والنافيجيشن */}
      <div className="slider-header">
        <h2 className="slider-title">{t('formats.title')}</h2>
        <div className="slider-navigation">
          <button onClick={() => swiperRef.current?.slidePrev()} className="btn-nav">{t('formats.slider.prev')}</button>
          <button onClick={() => swiperRef.current?.slideNext()} className="btn-nav">{t('formats.slider.next')}</button>
        </div>
      </div>

      {/* تمرير المنتجات إلى السلايدر */}
      <ProductsSlider products={products} ref={swiperRef} />
    </div>
  );
}

export default Formats;
