import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useCart } from "../../context/CartContext";
import DetailsProduct from "../DetailsProduct/DetailsProduct";
import "./Products.css";

function Products({ category }) {
  const { t } = useTranslation();
  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const itemsPerPage = 8;

  const dataMap = {
    natural: [
      {
        id: 1,
        name: t("naturalRoses.name") + " 1",
        price: 120,
        description: t("naturalRoses.desc"),
        images: [
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7Nxa8OR296EqB_WuVNYOXJ0lrrGR4dsKdUg&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReFhlzSoWKexxrPbE9o8ERa-6iqvYqOSOOhg&s",
        ],
        discount: 10,
        rating: 4,
      },
      {
        id: 2,
        name: t("naturalRoses.name") + " 2",
        price: 150,
        description: t("naturalRoses.desc"),
        images: [
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReFhlzSoWKexxrPbE9o8ERa-6iqvYqOSOOhg&s",
        ],
        discount: 0,
        rating: 5,
      },
    ],
    artificial: [
      {
        id: 1,
        name: t("artificial") + " 1",
        price: 80,
        description: t("artificialDesc"),
        images: ["/images/artificial1.jpg"],
        discount: 5,
        rating: 3,
      },
      {
        id: 2,
        name: t("artificial") + " 2",
        price: 90,
        description: t("artificialDesc"),
        images: ["/images/artificial2.jpg"],
        discount: 0,
        rating: 4,
      },
    ],
    weddings: [
      {
        id: 1,
        name: t("weddings") + " 1",
        price: 250,
        description: t("weddingDesc"),
        images: ["/images/wedding1.jpg"],
        discount: 15,
        rating: 5,
      },
      {
        id: 2,
        name: t("weddings") + " 2",
        price: 280,
        description: t("weddingDesc"),
        images: ["/images/wedding2.jpg"],
        discount: 0,
        rating: 4,
      },
    ],
  };

  useEffect(() => {
    const data = dataMap[category] || [];
    setProducts(data);
    setFiltered(data);
  }, [category, t]);

  useEffect(() => {
    let temp = [...products];
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
  }, [search, sort, products]);

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
      <span key={i} style={{ color: '#ffcc00', fontSize: '1rem' }}>
        {i < count ? '★' : '☆'}
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

      <motion.div
        className="filter-bar"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
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

      <motion.div
        className="products-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        {currentProducts.map((product) => {
          const price = product.price ?? 0;
          const discount = product.discount ?? 0;
          const discountedPrice = discount > 0 ? (price - (price * discount) / 100).toFixed(2) : price.toFixed(2);

          return (
            <motion.div
              key={product.id}
              className="product-card"
              transition={{ type: "spring", stiffness: 200 }}
            >
              {/* فتح التفاصيل عند الضغط على الصورة */}
              <img
                src={product.images[0]}
                alt={product.name}
                className="product-image"
                onClick={() => setSelectedProduct(product)}
              />
              <div className="product-details">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-price">
                  {discount > 0 && (
                    <span className="original-price">{price} {t("currency")}</span>
                  )}
                  <span className="discount-price">{discountedPrice} {t("currency")}</span>
                  {discount > 0 && <span className="discount">-{discount}%</span>}
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
