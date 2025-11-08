import React, { useState, useEffect, useCallback, useMemo } from "react";
import "./CenterNav.css";
import logo from "../../../assets/image/logo.png";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdCart } from "react-icons/io";
import { BiMenu } from "react-icons/bi";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ShoppingCart from "../../ShoppingCart/ShoppingCart";
import { useCart } from "../../../context/CartContext";
import { useProducts } from "../../../context/ProductContext";

const navLinks = [
  { path: "/", labelKey: "home", end: true },
  { path: "/natural", labelKey: "natural" },
  { path: "/cake", labelKey: "cake" },
  { path: "/arrangements", labelKey: "arrangements" },
  { path: "/wedding", labelKey: "weddings" },
  { path: "/birthday", labelKey: "birthdays" },
  { path: "/graduations", labelKey: "graduations" },
  { path: "/contact", labelKey: "contact" },
];

function CenterNav() {
  const [showMenu, setShowMenu] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [searchText, setSearchText] = useState("");
  const { t, i18n } = useTranslation();
  const { cartItems } = useCart();
  const { allProducts, getLocalizedProduct } = useProducts();
  const navigate = useNavigate();

  useEffect(() => {
    const savedLang = localStorage.getItem("language") || "ar";
    i18n.changeLanguage(savedLang);
    document.documentElement.lang = savedLang;
    document.documentElement.dir = savedLang === "ar" ? "rtl" : "ltr";
  }, [i18n]);

  const handleNavClick = useCallback(() => setShowMenu(false), []);
  const openCart = useCallback(() => setShowCart(true), []);
  const closeCart = useCallback(() => setShowCart(false), []);
  const openMenu = useCallback(() => setShowMenu(true), []);
  const closeMenu = useCallback(() => setShowMenu(false), []);
  const isRTL = useMemo(() => i18n.language === "ar", [i18n.language]);

  const searchResults = useMemo(() => {
    if (!searchText.trim()) return [];
    const lowerText = searchText.toLowerCase();

    const productResults = allProducts
      .map(getLocalizedProduct)
      .filter(
        (p) =>
          p.name?.toLowerCase().includes(lowerText) ||
          p.category?.toLowerCase().includes(lowerText)
      )
      .map((p) => ({ type: "product", label: p.name, path: `/${p.category}` }));

    const navResults = navLinks
      .filter((link) => t(link.labelKey).toLowerCase().includes(lowerText))
      .map((link) => ({ type: "nav", label: t(link.labelKey), path: link.path }));

    return [...productResults, ...navResults].slice(0, 10);
  }, [searchText, allProducts, getLocalizedProduct, t]);

  const handleSearchSelect = (path) => {
    navigate(path);
    setSearchText("");
  };

  // فتح الخرائط عند الضغط على أيقونة الموقع
  const handleLocationClick = () => {
    // يمكن تغيير الرابط هنا حسب الرابط الفعلي للمحل على Google Maps
    window.open("https://maps.app.goo.gl/y1kveQ4R7wzfEupF9", "_blank");
  };

  return (
    <div
      className={`CenterNav d-flex justify-content-between align-items-center row ${
        isRTL ? "rtl" : "ltr"
      }`}
    >
      {/* اللوجو */}
      <div className="logo col-lg-3 col-md-6 col-sm-12 d-flex justify-content-center flex-column align-items-center">
        <img src={logo} alt="logo" />
        <h1 className="logo-text" style={{ textAlign: "center", fontSize: "15px" }}>
          PETALS & POTS <br />
          <span className="d-flex justify-content-center">FLOWER</span>
        </h1>
        <button
          className="menu-btn d-lg-none"
          onClick={openMenu}
          aria-label={t("openMenu")}
          aria-expanded={showMenu}
        >
          <BiMenu />
        </button>
      </div>

      {/* البحث */}
      <div className="search1 search col-lg-6 col-md-6 d-flex justify-content-center flex-column align-items-center nav-section">
        <input
          placeholder={t("searchPlaceholder")}
          type="text"
          aria-label={t("search")}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button aria-label={t("searchButton")}></button>

        {searchResults.length > 0 && (
          <ul className="search-dropdown">
            {searchResults.map((res, idx) => (
              <li key={idx} onClick={() => handleSearchSelect(res.path)}>
                {res.label}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* الموقع و العربة */}
      <div className="continarFixed my-3 col-lg-3 col-md-12 col-sm-12 d-flex justify-content-center gap-4 align-items-center nav-section">
        <div
          className="rightNav d-flex justify-content-center flex-column align-items-center"
          role="button"
          tabIndex={0}
          onClick={handleLocationClick}
        >
          <FaLocationDot className="w-100" aria-hidden="true" />
          <span>{t("storeLocation")}</span>
        </div>

        <div
          className="rightNav d-flex justify-content-center flex-column align-items-center"
          role="button"
          tabIndex={0}
          onClick={openCart}
        >
          <IoMdCart className="fs-3 w-100" aria-hidden="true" />
          <span>{t("cart")}</span>
        </div>
      </div>

      {/* القائمة العلوية */}
      <ul className="main-menu" role="menubar" aria-label={t("mainMenu")}>
        {navLinks.map((link) => (
          <li key={link.labelKey}>
            <NavLink to={link.path} end={link.end}>
              {t(link.labelKey)}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* القائمة على الجوال */}
      <div className={`menu-modal ${showMenu ? "show" : ""}`}>
        <div className="menu-content">
          <button className="close-btn" onClick={closeMenu}>
            &times;
          </button>
          <ul>
            {/* البحث داخل الموبايل */}
            <div className="search2 search col-lg-6 col-md-6 d-flex justify-content-center flex-column align-items-center nav-section">
              <input
                placeholder={t("searchPlaceholder")}
                type="text"
                aria-label={t("search")}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button aria-label={t("searchButton")}></button>

              {searchResults.length > 0 && (
                <ul className="search-dropdown">
                  {searchResults.map((res, idx) => (
                    <li key={idx} onClick={() => handleSearchSelect(res.path)}>
                      {res.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {navLinks.map((link) => (
              <li key={link.labelKey}>
                <NavLink to={link.path} end={link.end} onClick={handleNavClick}>
                  {t(link.labelKey)}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {showCart && <ShoppingCart onClose={closeCart} />}
    </div>
  );
}

export default React.memo(CenterNav);
