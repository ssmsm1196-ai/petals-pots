import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './Naturalrose.css';
import ProductsSlider from '../ProductsSlider/ProductsSlider';

function Naturalrose() {
  const swiperRef = useRef(null);
  const { t } = useTranslation();

  const products = [
    {
      id: 1,
      image: 'https://cdn.salla.sa/wQYpe/971a56aa-88e9-4198-ba85-cb5e0de724b1-1000x1000-UgGCUwRCCyFwHIcDc7MrINCRumB7i2XwOaKwXAtn.jpg',
      name: 'باقة ورد جوري فاخر',
      originalPrice: 150,
      discountPrice: 120,
      rating: 4
    },
    {
      id: 2,
      image: 'https://cdn.salla.sa/qQqQlm/f6da8978-a72e-44fd-82a9-fd9601ffcea6-1000x1000-Ia8bG6hqPfSgLWLTo6WDg1BsnfbBcG851RR8J3ZK.jpg',
      name: 'باقة ورد مختلطة',
      originalPrice: 130,
      discountPrice: 100,
      rating: 5
    },
    {
      id: 3,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRknbTknEtn_mcKQnsES0vOWzTiFzwTuBUqzg&s',
      name: 'باقة ورد ملونة',
      originalPrice: 140,
      discountPrice: 110,
      rating: 3
    },
    {
      id: 4,
      image: 'https://www.fnp.ae/images/pr/m/v20240206130756/bright-roses-vase.jpg',
      name: 'باقة ورد ملونة',
      originalPrice: 140,
      discountPrice: 110,
      rating: 3
    },
    {
      id: 5,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS78d5F18Lmfe5nsy3Rim4nEgpM0Ftx87JI0Q&s',
      name: 'باقة ورد ملونة',
      originalPrice: 140,
      discountPrice: 110,
      rating: 3
    },
    {
      id: 6,
      image: 'https://pic.i7lm.com/wp-content/uploads/2019/07/%D8%A8%D9%88%D9%83%D9%8A%D9%87-%D9%88%D8%B1%D8%AF-%D8%A3%D8%AD%D9%85%D8%B1.jpg',
      name: 'باقة ورد ملونة',
      originalPrice: 140,
      discountPrice: 110,
      rating: 3
    },
    {
      id: 7,
      image: 'https://pic.i7lm.com/wp-content/uploads/2019/07/%D8%A8%D9%88%D9%83%D9%8A%D9%87-%D9%88%D8%B1%D8%AF-%D8%A3%D8%AD%D9%85%D8%B1.jpg',
      name: 'باقة ورد ملونة',
      originalPrice: 140,
      discountPrice: 110,
      rating: 3
    },
    {
      id: 8,
      image: 'https://www.ml7oza.com/wp-content/uploads/2022/02/%D9%88%D8%B1%D8%AF-1.jpg',
      name: 'باقة ورد ملونة',
      originalPrice: 140,
      discountPrice: 110,
      rating: 3
    },
    {
      id: 9,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6FNt1UuwTIPxL-IQGYPTkrr5CJpRLwwxs3Q&s',
      name: 'باقة ورد ملونة',
      originalPrice: 140,
      discountPrice: 110,
      rating: 3
    }
  ];

  return (
    <div className="Naturalrose my-5">
      {/* ===== Header مع العنوان والنافيجيشن ===== */}
      <div className="slider-header">
        <h2 className="slider-title">{t('naturalRoses.title')}</h2>
        <div className="slider-navigation">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="btn-nav"
            aria-label={t('naturalRoses.slider.prev')}
          >
            {t('naturalRoses.slider.prev')}
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="btn-nav"
            aria-label={t('naturalRoses.slider.next')}
          >
            {t('naturalRoses.slider.next')}
          </button>
        </div>
      </div>

      {/* ===== تمرير المنتجات إلى السلايدر ===== */}
      <ProductsSlider products={products} ref={swiperRef} />
    </div>
  );
}

export default Naturalrose;
