import React, { useState } from "react";
import "./Advertisements.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useProducts } from "../../../context/ProductContext";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import logo from "../../../assets/image/TITLE.jpg";

function Advertisements() {
  const { t, i18n } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const { advertisements, adsLoading, adsError } = useProducts();

  /** 🧠 دالة ترجمة العنوان */
  const getTitle = (ad) =>
    i18n.language === "ar"
      ? ad.title_ar || ad.title_en || ""
      : ad.title_en || ad.title_ar || "";

  /** ✅ دالة إرسال رسالة واتساب */
  const handleWhatsApp = (ad) => {
    const phoneNumber = "971544808838"; // ⚠️ استبدل هذا الرقم برقمك بدون "+"
    const title = getTitle(ad);
    const image = ad.images || logo;

    // نص الرسالة
    const message = `مرحباً 👋، أريد طلب هذا العرض:\n\n🛍 *${title}*\n📸 ${image}`;

    // رابط واتساب
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappURL, "_blank");
  };

  /** ⚙️ حالات التحميل أو عدم وجود بيانات */
  if (adsLoading) {
    return (
      <div className="Advertisements loading">
        <img src={logo} alt="Loading..." className="ad-fallback-logo" />
      </div>
    );
  }

  if (adsError || !advertisements.length) {
    return (
      <div className="Advertisements empty">
        <img src={logo} alt="No Ads" className="ad-fallback-logo" />
      </div>
    );
  }

  /** 🎬 السلايدر */
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
        dir={i18n.language === "ar" ? "rtl" : "ltr"}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        key={i18n.language}
        className="ad-swiper"
      >
        {advertisements.map((ad, index) => (
          <SwiperSlide key={ad.id} className="ad-slide">
            <img
              src={ad.images || logo}
              alt={getTitle(ad)}
              className="ad-image"
              loading="lazy"
            />

            <AnimatePresence mode="wait">
              {activeIndex === index && (
                <motion.div
                  className="ad-overlay"
                  initial={{ opacity: 0, x: 150 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 150 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                >
                  <motion.h3
                    className="ad-text"
                    initial={{ opacity: 0, x: 80 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
                  >
                    {getTitle(ad)}
                  </motion.h3>

                  <motion.button
                    className="ad-btn"
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: "#c1923d",
                      color: "#fff",
                    }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, x: 80 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
                    onClick={() => handleWhatsApp(ad)}
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
