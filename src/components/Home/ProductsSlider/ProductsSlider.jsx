import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import './ProductsSlider.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { useTranslation } from 'react-i18next';
import 'swiper/css';
import { useCart } from '../../../context/CartContext'; // استدعاء الكونتكست

const ProductsSlider = forwardRef(({ products }, ref) => {
  const { t, i18n } = useTranslation();
  const { addToCart } = useCart(); // استخدام الدالة لإضافة المنتج للعربة
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [isRTL, setIsRTL] = useState(false);

  useEffect(() => {
    const rtl = i18n.language === 'ar';
    setIsRTL(rtl);
    document.documentElement.setAttribute('dir', rtl ? 'rtl' : 'ltr');
  }, [i18n.language]);

  useImperativeHandle(ref, () => ({
    slideNext: () => swiperInstance?.slideNext(),
    slidePrev: () => swiperInstance?.slidePrev(),
  }));

  const renderStars = (count) =>
    Array.from({ length: 5 }, (_, i) => (
      <span key={i} style={{ color: '#ffcc00', fontSize: '1rem' }}>
        {i < count ? '★' : '☆'}
      </span>
    ));

  return (
    <div
      className={`ProductsSlider ${isRTL ? 'rtl-slider' : 'ltr-slider'}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <Swiper
        key={isRTL ? 'rtl' : 'ltr'}
        onSwiper={setSwiperInstance}
        modules={[Autoplay]}
        spaceBetween={10}
        slidesPerView={5}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        loop={true}
        speed={800}
        breakpoints={{
          0: { slidesPerView: 1 },
          480: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          992: { slidesPerView: 4 },
          1200: { slidesPerView: 5 },
        }}
        dir={isRTL ? 'rtl' : 'ltr'}
        className="product-swiper"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} className="product-card">
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
              loading="lazy"
            />
            <div className="product-details">
              <h3 className="product-name">{product.name}</h3>
              <div className="product-price">
                <span className="discount-price">
                  {product.discountPrice} {t('currency')}
                </span>
                <span className="original-price">
                  {product.originalPrice} {t('currency')}
                </span>
              </div>
              <div className="product-rating">{renderStars(product.rating)}</div>
              <div className="product-actions-vertical">
                <button
                  className="btn-buy"
                  onClick={() => addToCart(product)} // إضافة المنتج للعربة
                >
                  {t('orderNow')}
                </button>
                <button
                  className="btn-cart"
                  onClick={() => addToCart(product)} // نفس الدالة للزر الثاني
                >
                  {t('addToCart')}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
});

export default ProductsSlider;
