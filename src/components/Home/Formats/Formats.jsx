import React, { useRef, useState, useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useProducts } from "../../../context/ProductContext";
import { useCart } from "../../../context/CartContext";
import ProductsSlider from "../ProductsSlider/ProductsSlider";
import DetailsProduct from "../../DetailsProduct/DetailsProduct";
import "./Formats.css";

function Formats() {
  const { t } = useTranslation();
  const { allProducts, loading, getLocalizedProduct } = useProducts();
  const { addToCart } = useCart();
  const swiperRef = useRef(null);

  const [selectedProduct, setSelectedProduct] = useState(null);

  // 🔹 Products filtered & localized
  const productsArrangements = useMemo(() => {
    if (!allProducts) return [];
    return allProducts
      .filter((p) => p.category === "arrangements")
      .map((p) => getLocalizedProduct(p));
  }, [allProducts, getLocalizedProduct]);

  // 🔹 Callbacks to avoid re-creation on every render
  const handleViewDetails = useCallback((product) => setSelectedProduct(product), []);
  const handleCloseDetails = useCallback(() => setSelectedProduct(null), []);
  const handleAddToCart = useCallback((productData) => addToCart(productData), [addToCart]);
  const handlePrevSlide = useCallback(() => swiperRef.current?.slidePrev(), []);
  const handleNextSlide = useCallback(() => swiperRef.current?.slideNext(), []);

  if (loading) {
    return <p style={{ textAlign: "center", margin: "20px 0" }}>{t("loading")}</p>;
  }

  return (
    <div className="Formats">
      {/* ===== رأس السلايدر ===== */}
      <div className="slider-header">
        <h2 className="slider-title">{t("formats.title")}</h2>
        <div className="slider-navigation">
          <button onClick={handlePrevSlide} className="btn-nav">
            {t("formats.slider.prev")}
          </button>
          <button onClick={handleNextSlide} className="btn-nav">
            {t("formats.slider.next")}
          </button>
        </div>
      </div>

      {/* ===== Products Slider ===== */}
      <ProductsSlider
        products={productsArrangements}
        ref={swiperRef}
        addToCart={handleAddToCart}
        onViewDetails={handleViewDetails}
      />

      {/* ===== Modal تفاصيل المنتج ===== */}
      {selectedProduct && (
        <DetailsProduct
          product={selectedProduct}
          onClose={handleCloseDetails}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
}

export default React.memo(Formats);
