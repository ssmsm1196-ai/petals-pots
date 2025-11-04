// src/components/Products/Products.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useCart } from "../../context/CartContext";
import { useProducts } from "../../context/ProductContext";
import DetailsProduct from "../DetailsProduct/DetailsProduct";
import "./Products.css";

function Products({ category }) {
  const { t } = useTranslation();
  const { addToCart } = useCart();
  const {
    productsNatural,
    productsArtificial,
    productsWeddings,
    loading: contextLoading,
  } = useProducts();

  const [filtered, setFiltered] = useState([]);
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const itemsPerPage = 8;

  // تحديد المنتجات حسب الفئة
  useEffect(() => {
    let categoryProducts = [];
    switch (category) {
      case "natural":
        categoryProducts = productsNatural;
        break;
      case "artificial":
        categoryProducts = productsArtificial;
        break;
      case "weddings":
        categoryProducts = productsWeddings;
        break;
      default:
        categoryProducts = [
          ...productsNatural,
          ...productsArtificial,
          ...productsWeddings,
        ];
    }
    setFiltered(categoryProducts);
    setCurrentPage(1);
  }, [productsNatural, productsArtificial, productsWeddings, category]);

  // تطبيق البحث والفرز
  useEffect(() => {
    let temp = [...filtered];
    if (search)
      temp = temp.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    if (sort === "az") temp.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "za") temp.sort((a, b) => b.name.localeCompare(a.name));
    if (sort === "low") temp.sort((a, b) => a.price - b.price);
    if (sort === "high") temp.sort((a, b) => b.price - a.price);
    setFiltered(temp);
    setCurrentPage(1);
  }, [search, sort]);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProducts = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const categoryname =
    category === "natural"
      ? t("natural")
      : category === "artificial"
      ? t("artificial")
      : category === "weddings"
      ? t("weddings")
      : t("home");

  const renderStars = (count) =>
    Array.from({ length: 5 }, (_, i) => (
      <span key={i} style={{ color: "#ffcc00", fontSize: "1rem" }}>
        {i < count ? "★" : "☆"}
      </span>
    ));

  return (
    <div className="Products">
      <motion.h2
        className="products-name"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {categoryname}
      </motion.h2>

      {/* ===== فلترة ===== */}
      <motion.div
        className="filter-bar"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <input
          type="text"
          placeholder={t("searchPlaceholder")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <select
          onChange={(e) => setSort(e.target.value)}
          value={sort}
          className="sort-select"
        >
          <option value="">{t("search")}</option>
          <option value="az">{t("filters.az")}</option>
          <option value="za">{t("filters.za")}</option>
          <option value="low">{t("filters.low")}</option>
          <option value="high">{t("filters.high")}</option>
        </select>
      </motion.div>

      {/* ===== الشبكة ===== */}
      <motion.div
        className="products-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        {contextLoading
          ? Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="skeleton-card">
                <div className="skeleton-image"></div>
                <div className="skeleton-text"></div>
                <div className="skeleton-text" style={{ width: "50%" }}></div>
                <div className="skeleton-btn"></div>
                <div className="skeleton-btn"></div>
              </div>
            ))
          : currentProducts.map((product) => {
              const price = product.price ?? 0;
              const discount = product.discount ?? 0;
              const discountedPrice =
                discount > 0
                  ? (price - (price * discount) / 100).toFixed(2)
                  : price.toFixed(2);

              let images = [];
              try {
                images =
                  typeof product.images === "string"
                    ? JSON.parse(product.images)
                    : product.images || [];
              } catch {
                images = [];
              }

              const mainImage = images.length > 0 ? images[0] : "/placeholder.jpg";

              return (
                <motion.div
                  key={product.id}
                  className="product-card"
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <div className="product-image-container" style={{ position: "relative" }}>
                    <img
                      src={mainImage}
                      alt={product.name}
                      className="product-image"
                      onClick={() => setSelectedProduct(product)}
                    />
                    {discount > 0 && (
                      <span
                        className="discount-badge"
                        style={{
                          position: "absolute",
                          top: "10px",
                          left: "10px",
                          backgroundColor: "green",
                          color: "white",
                          padding: "5px 8px",
                          borderRadius: "5px",
                          fontWeight: "bold",
                          fontSize: "0.9rem",
                        }}
                      >
                        {discount}%
                      </span>
                    )}
                  </div>
                  <div className="product-details">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    <div className="product-price">
                      {discount > 0 && (
                        <span
                          className="original-price"
                          style={{
                            textDecoration: "line-through",
                            color: "#888",
                            display: "block",
                          }}
                        >
                          {price} {t("currency")}
                        </span>
                      )}
                      <span className="discount-price" style={{ fontWeight: "bold" }}>
                        {discountedPrice} {t("currency")}
                      </span>
                    </div>
                    <div className="product-rating">{renderStars(product.rating ?? 0)}</div>
                    <div className="product-actions-vertical">
                      <button
                        className="btn-buy"
                        onClick={() => setSelectedProduct(product)}
                      >
                        {t("orderNow")}
                      </button>
                      <button
                        className="btn-cart"
                        onClick={() => addToCart({ ...product, qty: 1, price })}
                      >
                        {t("addToCart")}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
      </motion.div>

      {/* ===== الباجينيشن ===== */}
      {!contextLoading && (
        <motion.div
          className="pagination"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`page-btn ${index + 1 === currentPage ? "active" : ""}`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </motion.div>
      )}

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
}

export default Products;
