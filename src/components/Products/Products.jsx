// src/components/Products/Products.jsx
import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useCart } from "../../context/CartContext";
import { useProducts } from "../../context/ProductContext";
import DetailsProduct from "../DetailsProduct/DetailsProduct";
import "./Products.css";

function Products({ category: initialCategory }) {
  const { t } = useTranslation();
  const { addToCart } = useCart();
  const { allProducts, loading: contextLoading, getLocalizedProduct } =
    useProducts();

  const [category, setCategory] = useState(initialCategory || "all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const itemsPerPage = 8;

  // المنتجات بعد تصفية الكاتيجوري + ترجمة المحتوى
  const localizedProducts = useMemo(() => {
    if (!allProducts) return [];
    const filteredByCategory =
      category === "all"
        ? allProducts
        : allProducts.filter((p) => p.category === category);

    return filteredByCategory.map((p) => {
      const prod = getLocalizedProduct(p);
      const images = Array.isArray(prod.images) ? prod.images : [];
      return { ...prod, images };
    });
  }, [allProducts, category, getLocalizedProduct]);

  // المنتجات بعد البحث والترتيب
  const filteredProducts = useMemo(() => {
    let temp = [...localizedProducts];

    if (search) {
      temp = temp.filter((p) =>
        p.name?.toLowerCase().includes(search.toLowerCase())
      );
    }

    switch (sort) {
      case "az":
        temp.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "za":
        temp.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "low":
        temp.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
        break;
      case "high":
        temp.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
        break;
      default:
        break;
    }

    return temp;
  }, [localizedProducts, search, sort]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const categories = useMemo(() => {
    if (!allProducts) return [];
    return Array.from(new Set(allProducts.map((p) => p.category)));
  }, [allProducts]);

  const categoryName = useMemo(() => {
    switch (category) {
      case "all":
        return t("allProducts");
      case "natural":
        return t("natural");
      case "cake":
        return t("cake");
      case "arrangements":
        return t("arrangements");
      case "wedding":
        return t("weddings");
      case "graduations":
        return t("graduations");
      case "birthday":
        return t("birthdays");
      default:
        return category;
    }
  }, [category, t]);

  const isNewProduct = (product) => {
    if (!product.created_at) return false;
    const diffHours = (new Date() - new Date(product.created_at)) / 36e5;
    return diffHours <= 24;
  };

  return (
    <div className="Products">
      <motion.h2
        className="products-name"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {categoryName}
      </motion.h2>

      {/* ===== Filter & Search ===== */}
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
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          className="sort-select"
        >
          <option value="all">{t("allProducts")}</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {t(cat) || cat}
            </option>
          ))}
        </select>

        <select
          onChange={(e) => setSort(e.target.value)}
          value={sort}
          className="sort-select"
        >
          <option value="">{t("sortBy")}</option>
          <option value="az">{t("filters.az")}</option>
          <option value="za">{t("filters.za")}</option>
          <option value="low">{t("filters.low")}</option>
          <option value="high">{t("filters.high")}</option>
        </select>
      </motion.div>

      {/* ===== Products Grid ===== */}
      <motion.div
        className="products-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        {contextLoading
          ? Array.from({ length: itemsPerPage }).map((_, i) => (
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
                  ? +(price - (price * discount) / 100).toFixed(2)
                  : price;
              const mainImage =
                Array.isArray(product.images) && product.images.length > 0
                  ? product.images[0]
                  : "/placeholder.jpg";

              return (
                <motion.div
                  key={`${product.category}-${product.id}`}
                  className="product-card"
                  style={{ position: "relative" }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  {isNewProduct(product) && <div className="new-badge">NEW</div>}

                  <div className="product-image-container">
                    <img
                      src={mainImage}
                      alt={product.name}
                      className="product-image"
                      onClick={() => setSelectedProduct(product)}
                    />
                    {discount > 0 && (
                      <span className="discount-badge">{discount}%</span>
                    )}
                  </div>

                  <div className="product-details">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-description">{product.description}</p>

                    <div className="product-price">
                      {discount > 0 && (
                        <span className="original-price">
                          {price} {t("currency")}
                        </span>
                      )}
                      <span className="discount-price">
                        {discountedPrice} {t("currency")}
                      </span>
                    </div>

                    <div className="product-actions-vertical">
                      <button
                        className="btn-buy"
                        onClick={() => setSelectedProduct(product)}
                      >
                        {t("orderNow")}
                      </button>
                      <button
                        className="btn-cart"
                        onClick={() =>
                          addToCart({
                            ...product,
                            qty: 1,
                            price: discountedPrice,
                          })
                        }
                      >
                        {t("addToCart")}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
      </motion.div>

      {/* ===== Pagination ===== */}
      {!contextLoading && totalPages > 1 && (
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

      {/* ===== Product Details Modal ===== */}
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
