import React, { useState, forwardRef, useImperativeHandle, useEffect, useMemo, useCallback } from "react";
import "./ProductsSlider.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useTranslation } from "react-i18next";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ProductsSlider = forwardRef(({ products = [], addToCart, onViewDetails }, ref) => {
  const { t, i18n } = useTranslation();
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [isRTL, setIsRTL] = useState(false);

  useEffect(() => {
    const rtl = i18n.language === "ar";
    setIsRTL(rtl);
    document.documentElement.setAttribute("dir", rtl ? "rtl" : "ltr");
  }, [i18n.language]);

  useImperativeHandle(ref, () => ({
    slideNext: () => swiperInstance?.slideNext(),
    slidePrev: () => swiperInstance?.slidePrev(),
  }));

  const handleViewDetails = useCallback(
    (product) => {
      onViewDetails && onViewDetails(product);
    },
    [onViewDetails]
  );

  const handleAddToCart = useCallback(
    (product, discountedPrice) => {
      addToCart && addToCart({ ...product, qty: 1, price: discountedPrice });
    },
    [addToCart]
  );

  const isNewProduct = useCallback((product) => {
    if (!product.created_at) return false;
    const createdAt = new Date(product.created_at);
    const now = new Date();
    return (now - createdAt) / (1000 * 60 * 60) <= 24;
  }, []);

  const truncateWords = useCallback((text, wordLimit = 3) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : text;
  }, []);

  const processedProducts = useMemo(
    () =>
      products.map((product) => {
        const mainImage =
          Array.isArray(product.images) && product.images.length > 0
            ? product.images[0]
            : "/placeholder.jpg";

        const price = product.price ?? 0;
        const discount = product.discount ?? 0;
        const discountedPrice = discount > 0 ? +(price - (price * discount) / 100).toFixed(2) : price;

        const productName = truncateWords(product.name, 3);
        const productDescription = truncateWords(product.description, 3);

        return {
          ...product,
          mainImage,
          price,
          discount,
          discountedPrice,
          productName,
          productDescription,
        };
      }),
    [products, truncateWords]
  );

  if (!products || products.length === 0) {
    return <p className="no-products">{t("noProducts")}</p>;
  }

  return (
    <div className={`ProductsSlider ${isRTL ? "rtl-slider" : "ltr-slider"}`} dir={isRTL ? "rtl" : "ltr"}>
      <Swiper
        key={isRTL ? "rtl" : "ltr"}
        onSwiper={setSwiperInstance}
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={15}
        slidesPerView={Math.min(products.length, 5)}
        loop={products.length > 1}
        speed={800}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        breakpoints={{
          0: { slidesPerView: Math.min(products.length, 1) },
          480: { slidesPerView: Math.min(products.length, 2) },
          768: { slidesPerView: Math.min(products.length, 3) },
          992: { slidesPerView: Math.min(products.length, 4) },
          1200: { slidesPerView: Math.min(products.length, 5) },
        }}
        dir={isRTL ? "rtl" : "ltr"}
        className="product-swiper"
      >
        {processedProducts.map((product) => (
          <SwiperSlide key={product.id} className="product-card">
            <div className="product-image-container">
              <img
                src={product.mainImage}
                alt={product.name}
                className="product-image"
                onClick={() => handleViewDetails(product)}
              />
              {product.discount > 0 && <span className="discount-badge">{product.discount}%</span>}
              {isNewProduct(product) && <span className="new-badge">NEW</span>}
            </div>

            <div className="product-details">
              <h3 className="product-name">{product.productName}</h3>
              <p className="product-description">{product.productDescription}</p>

              <div className="product-price">
                {product.discount > 0 && <span className="original-price">{product.price} {t("currency")}</span>}
                <span className="discount-price">{product.discountedPrice} {t("currency")}</span>
              </div>

              <div className="product-actions-vertical">
                <button className="btn-buy" onClick={() => handleViewDetails(product)}>
                  {t("orderNow")}
                </button>
                <button className="btn-cart" onClick={() => handleAddToCart(product, product.discountedPrice)}>
                  {t("addToCart")}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
});

export default React.memo(ProductsSlider);
