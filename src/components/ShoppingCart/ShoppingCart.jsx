import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../../context/CartContext";
import { useTranslation } from "react-i18next";
import { FiX } from "react-icons/fi";
import "./ShoppingCart.css";

function ShoppingCart({ onClose }) {
  const { t, i18n } = useTranslation();
  const { cartItems, increaseQty, decreaseQty, removeItem, total } = useCart();
  const whatsappNumber = "971544808838";

  const dir = i18n.language === "ar" ? "rtl" : "ltr";

  // إنشاء رسالة الواتساب فقط إذا تغيرت العناصر أو المجموع
  const whatsappMessage = useMemo(() => {
    if (cartItems.length === 0) return "";
    const message =
      cartItems
        .map((item, index) => {
          const imageLink = item.images && item.images.length > 0 ? item.images[0] : "";
          return (
            `🔹 ${index + 1}. ${item.name}\n` +
            `${t("quantity")}: ${item.qty}\n` +
            `${t("price")}: ${item.totalPrice.toFixed(2)} ${t("currency")}\n` +
            (imageLink ? `📷 ${imageLink}\n` : "")
          );
        })
        .join("\n") +
      `\n-------------------\n💰 ${t("total")}: ${total.toFixed(2)} ${t("currency")}`;
    return encodeURIComponent(message);
  }, [cartItems, total, t]);

  const handleWhatsAppOrder = () => {
    if (cartItems.length === 0) return alert(t("cartEmpty"));
    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, "_blank");
  };

  return (
    <div className="ShoppingCart" dir={dir}>
      <AnimatePresence>
        {onClose && (
          <motion.div
            key="cart-modal"
            initial={{ opacity: 0, y: -50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.8 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="cart-modal show"
          >
            <div className="cart-content">
              <button
                className={`close-btn-modal ${dir}`}
                onClick={onClose}
                aria-label={t("closeMenu")}
              >
                ×
              </button>

              <h2>🛍 {t("cart")}</h2>

              {cartItems.length === 0 ? (
                <p className="empty-msg">{t("cartEmpty")}</p>
              ) : (
                <>
                  <div className="cart-items">
                    {cartItems.map((item) => (
                      <div className="cart-item" key={item.id}>
                        <img
                          src={item.displayImage || "/default-image.png"}
                          alt={item.name}
                          loading="lazy"
                        />
                        <div className="item-info">
                          <h4>{item.name}</h4>
                          <p>{item.description}</p>
                          <p>
                            {t("price")}: {item.totalPrice.toFixed(2)} {t("currency")}
                          </p>

                          <div className="qty-controls">
                            <button
                              onClick={() => decreaseQty(item.id)}
                              disabled={item.qty <= 1}
                            >
                              -
                            </button>
                            <span>{item.qty}</span>
                            <button onClick={() => increaseQty(item.id)}>+</button>
                          </div>
                        </div>

                        <button
                          className={`delete-btn ${dir}`}
                          onClick={() => removeItem(item.id)}
                          aria-label={t("removeItem")}
                        >
                          <FiX size={22} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="cart-footer">
                    <h3>
                      {t("total")}: {total.toFixed(2)} {t("currency")}
                    </h3>
                    <button className="whatsapp-btn" onClick={handleWhatsAppOrder}>
                      {t("orderNow")} 📱
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ShoppingCart;
