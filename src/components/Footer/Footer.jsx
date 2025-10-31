// Footer.jsx
import React from "react";
import "./Footer.css";
import { FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="Footer">
      <div className="footer-container">
        {/* ===== Logo & About ===== */}
        <div className="footer-section about">
          <h2 className="footer-logo">
            {t("footer.logoAr")}<br />
            <em>{t("footer.logoEn")}</em>
          </h2>
          <p>{t("footer.description")}</p>
        </div>

        {/* ===== Quick Links ===== */}
        <div className="footer-section links">
          <h3>{t("footer.quickLinks")}</h3>
          <ul>
            <li><a href="#">{t("footer.aboutStore")}</a></li>
            <li><a href="#">{t("footer.products")}</a></li>
            <li><a href="#">{t("footer.partyPlanning")}</a></li>
            <li><a href="#">{t("footer.giftWrapping")}</a></li>
            <li><a href="#">{t("footer.contactUs")}</a></li>
          </ul>
        </div>

        {/* ===== Contact & Social ===== */}
        <div className="footer-section contact">
          <h3>{t("footer.contact")}</h3>
          <p>{t("footer.address")}</p>
          <p>{t("footer.phone")}: <a href="tel:0544808838">054 480 8838</a></p>
          <div className="social-icons">
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="Facebook"><FaFacebookF /></a>
            <a href="#" aria-label="WhatsApp"><FaWhatsapp /></a>
          </div>
        </div>
      </div>

      {/* ===== Bottom Copyright ===== */}
      <div className="footer-bottom">
        <p>{t("footer.copyright")}</p>
      </div>
    </footer>
  );
}

export default Footer;
