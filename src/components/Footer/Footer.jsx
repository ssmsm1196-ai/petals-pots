// Footer.jsx
import React from "react";
import "./Footer.css";
import { FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Footer = React.memo(function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="Footer">
      <div className="footer-container">
        {/* ===== Logo & About ===== */}
        <div className="footer-section about">
          <h2 className="footer-logo">
            {t("footer.logoAr")}
            <br />
            <em>{t("footer.logoEn")}</em>
          </h2>
          <p>{t("footer.description")}</p>
        </div>

        {/* ===== Quick Links ===== */}
        <div className="footer-section links">
          <h3>{t("footer.quickLinks")}</h3>
          <ul>
            <li>
              <Link to={"/article"}> {t("footer.aboutStore")}</Link>
            </li>
            <li>
              <Link to={""}> {t("footer.contactUs")}</Link>
            </li>
          </ul>
        </div>

        {/* ===== Contact & Social ===== */}
        <div className="footer-section contact">
          <h3>{t("footer.contact")}</h3>
          <p>{t("footer.address")}</p>
          <p>
            {t("footer.phone")}: <a href="tel:0544808838">054 480 8838</a>
          </p>
          <div className="social-icons">
            <a href="https://www.instagram.com/petals_and_potss?igsh=MTRxOXpybTY4bm5xag%3D%3D&utm_source=qr" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://www.facebook.com/share/1A4453xfN1/?mibextid=wwXIfr" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://wa.me/971544808838" aria-label="WhatsApp">
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>

      {/* ===== Bottom Copyright ===== */}
      <div className="footer-bottom">
        <p>{t("footer.copyright")}</p>
      </div>
    </footer>
  );
});

export default Footer;
