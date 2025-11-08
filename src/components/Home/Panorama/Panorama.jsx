import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useTranslation } from "react-i18next";
import { useProducts } from "../../../context/ProductContext";
import logo from "../../../assets/image/TITLE.jpg"; // 🟢 استدعاء اللوغو
import "./Panorama.css";

function Panorama() {
  const { t, i18n } = useTranslation();
  const { panoramaImages, panoramaLoading } = useProducts();
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  // التأكد من وجود صور
  const hasImages = useMemo(() => panoramaImages && panoramaImages.length > 0, [panoramaImages]);

  // الصورة النشطة
  const activeImage = useMemo(() => {
    if (!hasImages) return null;

    const img = panoramaImages[activeIndex];
    const imagesArray = Array.isArray(img.images) ? img.images : [img.images];

    return {
      ...img,
      images: imagesArray,
      title: i18n.language === "ar" ? img.titleAR || img.titleEN : img.titleEN || img.titleAR,
      description: i18n.language === "ar" ? img.descriptionAR || "" : img.descriptionEN || "",
    };
  }, [hasImages, panoramaImages, activeIndex, i18n.language]);

  // الانتقال التلقائي للصور
  useEffect(() => {
    if (!hasImages) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % panoramaImages.length;
        swiperRef.current?.slideTo(next);
        return next;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [hasImages, panoramaImages.length]);

  // أزرار السابق / التالي
  const goPrev = useCallback(() => {
    if (!hasImages) return;
    setActiveIndex((prev) => {
      const prevIndex = (prev - 1 + panoramaImages.length) % panoramaImages.length;
      swiperRef.current?.slideTo(prevIndex);
      return prevIndex;
    });
  }, [hasImages, panoramaImages.length]);

  const goNext = useCallback(() => {
    if (!hasImages) return;
    setActiveIndex((prev) => {
      const nextIndex = (prev + 1) % panoramaImages.length;
      swiperRef.current?.slideTo(nextIndex);
      return nextIndex;
    });
  }, [hasImages, panoramaImages.length]);

  if (panoramaLoading) return <p>Loading...</p>;

  return (
    <section className="Panorama" aria-label={t("panorama.header.title")}>
      {/* عنوان وشريط التنقل */}
      <div className="slider-header">
        <h2 className="slider-title">{t("panorama.header.title")}</h2>
        <div className="slider-navigation">
          <button onClick={goPrev} className="btn-nav">‹</button>
          <button onClick={goNext} className="btn-nav">›</button>
        </div>
      </div>

      {/* الصورة الرئيسية */}
      <div
        className="Panorama-main-image"
        style={{
          backgroundImage: `url(${hasImages ? activeImage.images[0] : logo})`,
        }}
      >
        <div className="Panorama-text-container">
          <AnimatePresence mode="wait">
            {hasImages ? (
              <motion.div
                key={activeImage.id}
                className="Panorama-text-box"
                initial={{ x: -80, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 80, opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <h1 className="Panorama-seo-title">{activeImage.title}</h1>
                <p className="Panorama-seo-description">{activeImage.description}</p>
              </motion.div>
            ) : (
              <motion.div
                key="logo"
                className="Panorama-text-box"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="Panorama-seo-title">Petals & Pots</h1>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* التومبنيال */}
        {hasImages && (
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
              {panoramaImages.map((img, index) => {
                const imgSrc = Array.isArray(img.images) ? img.images[0] : img.images;
                const title = i18n.language === "ar" ? img.titleAR || img.titleEN : img.titleEN || img.titleAR;

                return (
                  <SwiperSlide key={img.id}>
                    <button
                      className={`Panorama-thumb ${activeIndex === index ? "active" : ""}`}
                      onClick={() => {
                        setActiveIndex(index);
                        swiperRef.current?.slideTo(index);
                      }}
                      aria-label={title}
                    >
                      <img src={imgSrc} alt={title} loading="lazy" />
                    </button>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        )}
      </div>
    </section>
  );
}

export default Panorama;
