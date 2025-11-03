import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import './ProductsSlider.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { useTranslation } from 'react-i18next';
import 'swiper/css';
import { useCart } from '../../../context/CartContext';
import DetailsProduct from '../../DetailsProduct/DetailsProduct';

const ProductsSlider = forwardRef(({ products }, ref) => {
  const { t, i18n } = useTranslation();
  const { addToCart } = useCart();
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [isRTL, setIsRTL] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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
    <div className={`ProductsSlider ${isRTL ? 'rtl-slider' : 'ltr-slider'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <Swiper
        key={isRTL ? 'rtl' : 'ltr'}
        onSwiper={setSwiperInstance}
        modules={[Autoplay]}
        spaceBetween={10}
        slidesPerView={5}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
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
        {products.map((product) => {
          const images = Array.isArray(product.images) && product.images.length > 0
            ? product.images
            : [product.image || "https://via.placeholder.com/300"];
          const price = product.price ?? 0;
          const discount = product.discount ?? 0;
          const discountPrice = discount > 0 ? (price - (price * discount) / 100).toFixed(2) : price.toFixed(2);
          const description = product.description ?? "لا يوجد وصف للمنتج";
          const rating = product.rating ?? 0;
          const name = product.name ?? "بدون اسم";

          const productData = {
            ...product,
            images,
            price,
            discount,
            description,
            rating,
            name
          };

          return (
            <SwiperSlide key={product.id} className="product-card">
              {/* فتح التفاصيل عند الضغط على الصورة */}
              <img
                src={images[0]}
                alt={name}
                className="product-image"
                loading="lazy"
                onClick={() => setSelectedProduct(productData)}
              />
              <div className="product-details">
                <h3 className="product-name">{name}</h3>
                <p className="product-description">{description}</p>
                <div className="product-price">
                  {discount > 0 && <span className="original-price">{price.toFixed(2)} {t('currency')}</span>}
                  <span className="discount-price">{discountPrice} {t('currency')}</span>
                  {discount > 0 && <span className="discount">-{discount}%</span>}
                </div>
                <div className="product-rating">{renderStars(rating)}</div>
                <div className="product-actions-vertical">
                  {/* زر "اطلب الآن" يفتح مودال التفاصيل */}
                  <button className="btn-buy" onClick={() => setSelectedProduct(productData)}>
                    {t('orderNow')}
                  </button>
                  {/* زر "أضف للعربة" يضيف مباشرة */}
                  <button className="btn-cart" onClick={() => addToCart({ ...productData, qty: 1, price })}>
                    {t('addToCart')}
                  </button>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* مودال التفاصيل */}
      {selectedProduct && (
        <DetailsProduct
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      )}
    </div>
  );
});

export default ProductsSlider;
