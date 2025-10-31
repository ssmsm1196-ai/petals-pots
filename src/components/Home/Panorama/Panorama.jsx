import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useTranslation } from "react-i18next"; // ✅ استدعاء i18next
import "./Panorama.css";

const images = [
  {
    id: 1,
    src: "https://alamphoto.com/wp-content/uploads/2017/11/Nice-girl-carry-Beautiful-love-bouquet-flower.jpg",
    alt: "زهور طبيعية حمراء جميلة",
    title: "أفضل أنواع الزهور الحمراء الطبيعية",
    description:
      "تعرف على أجمل الزهور الحمراء التي تضيف لمسة رومانسية لمناسباتك الخاصة. زهور طبيعية مختارة بعناية لمحبّي الجمال.",
  },
  {
    id: 2,
    src: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh5Mnkdpmqvru4vhDkuxSOwqSyNb4U52n6auzBC4GrniVj9zpsbTWxEhtaGvy2U1DmtWpe4xRrj_z0HXmMvtHKD6rIc4CeGACVd0TsaiImqtnYvXJ_SR44dr1kvo3uiXJa8DcfThZwGKMiK/w1600/%25D8%25B5%25D9%2588%25D8%25B1+%25D9%2588%25D8%25B1%25D8%25AF+%25D8%25AC%25D9%2588%25D8%25B1%25D9%258A+%25D9%2588%25D8%25B1%25D8%25AF%25D9%258A+%25D8%25B7%25D8%25A8%25D9%258A%25D8%25B9%25D9%258A+%25D8%25A8%25D8%25AF%25D9%2582%25D8%25A9+HD.jpg",
    alt: "زهور بيضاء فخمة",
    title: "زهور بيضاء فخمة للأعراس والمناسبات",
    description:
      "اكتشف روعة الزهور البيضاء التي تعبّر عن النقاء والجمال. مثالية لتزيين حفلات الزفاف والمناسبات الرسمية.",
  },
  // باقي الصور...
];

function Panorama() {
  const { t } = useTranslation(); // ✅ hook الترجمة
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % images.length;
      setActiveIndex(nextIndex);
      swiperRef.current?.slideTo(nextIndex);
    }, 5000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  const goPrev = () => {
    const prevIndex = (activeIndex - 1 + images.length) % images.length;
    setActiveIndex(prevIndex);
    swiperRef.current?.slideTo(prevIndex);
  };

  const goNext = () => {
    const nextIndex = (activeIndex + 1) % images.length;
    setActiveIndex(nextIndex);
    swiperRef.current?.slideTo(nextIndex);
  };

  const activeImage = images[activeIndex];

  return (
    <section className="Panorama" aria-label="معرض بانوراما الزهور">
      <div className="slider-header">
        {/* ✅ الترجمة فقط على العنوان */}
        <h2 className="slider-title">{t("panorama.header.title")}</h2>
        <div className="slider-navigation">
          <button onClick={goPrev} className="btn-nav">‹</button>
          <button onClick={goNext} className="btn-nav">›</button>
        </div>
      </div>

      <div
        className="Panorama-main-image"
        style={{ backgroundImage: `url(${activeImage.src})` }}
      >
        <div className="Panorama-text-container">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeImage.id}
              initial={{ x: -80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 80, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="Panorama-text-box"
            >
              <h1 className="Panorama-seo-title">{activeImage.title}</h1>
              <p className="Panorama-seo-description">{activeImage.description}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="Panorama-thumbnails-container">
          <Swiper
            modules={[Navigation]}
            spaceBetween={10}
            slidesPerView={4}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            breakpoints={{
              320: { slidesPerView: 2 },
              480: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
          >
            {images.map((img, index) => (
              <SwiperSlide key={img.id}>
                <button
                  className={`Panorama-thumb ${activeIndex === index ? "active" : ""}`}
                  onClick={() => {
                    setActiveIndex(index);
                    swiperRef.current?.slideTo(index);
                  }}
                  aria-label={img.alt}
                >
                  <img src={img.src} alt={img.alt} loading="lazy" />
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

export default Panorama;
