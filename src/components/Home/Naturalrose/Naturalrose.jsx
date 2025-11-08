import React, { useRef, useState, useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useProducts } from "../../../context/ProductContext";
import { useCart } from "../../../context/CartContext";
import ProductsSlider from "../ProductsSlider/ProductsSlider";
import DetailsProduct from "../../DetailsProduct/DetailsProduct";
import "./Naturalrose.css";

function Naturalrose() {
  const { t } = useTranslation();
  const { allProducts, loading, getLocalizedProduct } = useProducts();
  const { addToCart } = useCart();
  const swiperRef = useRef(null);

  const [selectedProduct, setSelectedProduct] = useState(null);

  // 🔹 Products filtered & localized
  const productsNatural = useMemo(() => {
    if (!allProducts) return [];
    return allProducts
      .filter((p) => p.category === "natural")
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
    <div className="Naturalrose my-5">
      {/* ===== رأس السلايدر ===== */}
      <div className="slider-header">
        <h2 className="slider-title">{t("naturalRoses.title")}</h2>
        <div className="slider-navigation">
          <button onClick={handlePrevSlide} className="btn-nav">
            {t("naturalRoses.slider.prev")}
          </button>
          <button onClick={handleNextSlide} className="btn-nav">
            {t("naturalRoses.slider.next")}
          </button>
        </div>
      </div>

      {/* ===== Products Slider ===== */}
      <ProductsSlider
        products={productsNatural}
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

export default React.memo(Naturalrose);
