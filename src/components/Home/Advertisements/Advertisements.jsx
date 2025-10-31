import React, { useState } from "react";
import "./Advertisements.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function Advertisements() {
  const { t, i18n } = useTranslation(); // استخدام الترجمة
  const [activeIndex, setActiveIndex] = useState(0);

  // محتوى السلايدر ثابت، الصور لا تتغير
  const ads = [
    {
      id: 1,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5C1bXM52jn90O9MsMuHrDO7ViD3XDF9iKJA&s",
      title: "خصومات تصل إلى 50%",
    },
    {
      id: 2,
      image: "https://www.fnp.ae/images/pr/m/v20240808140950/bunch-of-beautiful-6-red-roses.jpg",
      title: "عرض جديد على المنتجات الموسمية",
    },
    {
      id: 3,
      image: "https://www.fnp.ae/images/pr/m/v20240206130208/sophistication-reprised.jpg",
      title: "توصيل مجاني للطلبات فوق 100 درهم",
    },
  ];

  return (
    <div className="Advertisements">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
        dir={i18n.language === "ar" ? "rtl" : "ltr"} // ضبط اتجاه السلايدر حسب اللغة
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        key={i18n.language} // إعادة ريندر للسلايدر عند تغيير اللغة
        className="ad-swiper"
      >
        {ads.map((ad, index) => (
          <SwiperSlide key={ad.id} className="ad-slide">
            {/* الصورة ثابتة */}
            <img src={ad.image} alt={ad.title} className="ad-image" />

            {/* المحتوى يظهر مع انيميشن */}
            <AnimatePresence mode="wait">
              {activeIndex === index && (
                <motion.div
                  className="ad-overlay"
                  initial={{ opacity: 0, x: 150 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 150 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                >
                  {/* العنوان ثابت لكل slide */}
                  <motion.h3
                    className="ad-text"
                    initial={{ opacity: 0, x: 80 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
                  >
                    {ad.title}
                  </motion.h3>

                  {/* زر مترجم فقط */}
                  <motion.button
                    className="ad-btn"
                    whileHover={{ scale: 1.1, backgroundColor: "#c1923d", color: "#fff" }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, x: 80 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
                  >
                    {t("orderNow")}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Advertisements;
