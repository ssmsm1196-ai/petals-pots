import React from "react";
import { IoLogoWhatsapp } from "react-icons/io";
import { AiFillInstagram } from "react-icons/ai";
import {
  FaFacebookF,
  FaTiktok,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaClock,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";
import "./Contact.css";

function Contact() {
  const { t } = useTranslation();

  return (
    <div className="Contact container">
      <h1 className="contact-title">{t("contactCOM.title")}</h1>

      <div className="contact-content">
        <div className="contact-info">
          {/* ✅ العنوان */}
          <div className="info-item">
            <FaMapMarkerAlt className="info-icon" />
            <span>{t("contactCOM.address")}</span>
          </div>

          {/* ✅ الهاتف كـ لينك مباشر */}
          <div className="info-item">
            <FaPhoneAlt className="info-icon" />
            <a href="tel:0544808838">{t("contactCOM.phone")}</a>
          </div>

          {/* ✅ ساعات العمل */}
          <div className="info-item">
            <FaClock className="info-icon" />
            <span>{t("contactCOM.hours")}</span>
          </div>

          {/* ✅ وسائل التواصل */}
          <div className="social-section">
            <p className="social-title">{t("contactCOM.followUs")}</p>
            <div className="social-links">
              <a
                href="https://wa.me/971544808838"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <IoLogoWhatsapp />
              </a>
              <a
                href="https://www.instagram.com/petals_and_potss?igsh=MTRxOXpybTY4bm5xag%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <AiFillInstagram />
              </a>
              <a
                href="https://www.facebook.com/share/1A4453xfN1/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://www.tiktok.com/@petals_and_potss?_r=1&_t=ZS-91ECrldGzJs"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
              >
                <FaTiktok />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
