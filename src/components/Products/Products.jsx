import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useCart } from "../../context/CartContext";
import "./Products.css";

function Products({ category }) {
  const { t } = useTranslation();
  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const dataMap = {
    natural: [
      { id: 1, title: t("naturalRoses.title") + " 1", price: 120, image: "data:image/jpeg;base64,/9j/" },
      { id: 2, title: t("naturalRoses.title") + " 2", price: 150, image: "data:image/jpeg;base64,/9j/k=" },
      { id: 3, title: t("naturalRoses.title") + " 3", price: 180, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7Nxa8OR296EqB_WuVNYOXJ0lrrGR4dsKdUg&s" },
      { id: 4, title: t("naturalRoses.title") + " 4", price: 100, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReFhlzSoWKexxrPbE9o8ERa-6iqvYqOSOOhg&s" },
    ],
    artificial: [
      { id: 1, title: t("artificial") + " 1", price: 80, image: "/images/artificial1.jpg" },
      { id: 2, title: t("artificial") + " 2", price: 90, image: "/images/artificial2.jpg" },
    ],
    weddings: [
      { id: 1, title: t("weddings") + " 1", price: 250, image: "/images/wedding1.jpg" },
      { id: 2, title: t("weddings") + " 2", price: 280, image: "/images/wedding2.jpg" },
    ],
  };

  useEffect(() => {
    const data = dataMap[category] || [];
    setProducts(data);
    setFiltered(data);
  }, [category, t]);

  useEffect(() => {
    let temp = [...products];
    if (search) temp = temp.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));
    if (sort === "az") temp.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "za") temp.sort((a, b) => b.title.localeCompare(a.title));
    if (sort === "low") temp.sort((a, b) => a.price - b.price);
    if (sort === "high") temp.sort((a, b) => b.price - a.price);
    setFiltered(temp);
    setCurrentPage(1);
  }, [search, sort, products]);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProducts = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const categoryTitle =
    category === "natural" ? t("natural") :
    category === "artificial" ? t("artificial") :
    category === "weddings" ? t("weddings") : t("home");

  return (
    <div className="Products">
      <motion.h2 className="products-title" initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        {categoryTitle}
      </motion.h2>

      <motion.div className="filter-bar" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
        <input type="text" placeholder={t("searchPlaceholder")} value={search} onChange={(e) => setSearch(e.target.value)} className="search-input"/>
        <select onChange={(e) => setSort(e.target.value)} value={sort} className="sort-select">
          <option value="">{t("search")}</option>
          <option value="az">{t("filters.az")}</option>
          <option value="za">{t("filters.za")}</option>
          <option value="low">{t("filters.low")}</option>
          <option value="high">{t("filters.high")}</option>
        </select>
      </motion.div>

      <motion.div className="products-grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.6 }}>
        {currentProducts.map((product) => (
          <motion.div key={product.id} className="product-card" transition={{ type: "spring", stiffness: 200 }}>
            <img src={product.image} alt={product.title} className="product-image"/>
            <div className="product-details">
              <h3 className="product-name">{product.title}</h3>
              <div className="product-price"><span>{product.price} {t("currency")}</span></div>
              <div className="product-actions-vertical">
                <button className="btn-buy">{t("orderNow")}</button>
                <button className="btn-cart" onClick={() => addToCart(product)}>{t("addToCart")}</button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div className="pagination" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
        {Array.from({ length: totalPages }).map((_, index) => (
          <button key={index} className={`page-btn ${index + 1 === currentPage ? "active" : ""}`} onClick={() => setCurrentPage(index + 1)}>
            {index + 1}
          </button>
        ))}
      </motion.div>
    </div>
  );
}

export default Products;
