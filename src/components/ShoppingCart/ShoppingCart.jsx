import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../../context/CartContext";
import "./ShoppingCart.css";

function ShoppingCart({ onClose }) {
  const { cartItems, increaseQty, decreaseQty, removeItem, total } = useCart();
  const whatsappNumber = "971500000000";

  const handleWhatsAppOrder = () => {
    if (cartItems.length === 0) return alert("السلة فارغة");
    const message =
      cartItems
        .map(
          (item) =>
            `🔹 ${item.title || item.name}\nالكمية: ${item.qty}\nالسعر: ${item.price} درهم\n`
        )
        .join("\n") +
      `\n-------------------\n💰 الإجمالي: ${total} درهم`;
    const encodedMsg = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMsg}`, "_blank");
  };

  return (
    <div className="ShoppingCart">
      <AnimatePresence>
        {onClose && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.8 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="cart-modal show"
          >
            <div className="cart-content">
              <button
                className="close-btn"
                onClick={onClose}
                aria-label="Close Cart"
              >
                ×
              </button>

              <h2>🛍 سلة المشتريات</h2>

              {cartItems.length === 0 ? (
                <p className="empty-msg">السلة فارغة</p>
              ) : (
                <>
                  <div className="cart-items">
                    {cartItems.map((item) => (
                      <div className="cart-item" key={item.id}>
                        <img src={item.image || item.img} alt={item.title || item.name} />
                        <div className="item-info">
                          <h4>{item.title || item.name}</h4>
                          <p>{item.price * item.qty} درهم</p>
                          <div className="qty-controls">
                            <button onClick={() => decreaseQty(item.id)}>-</button>
                            <span>{item.qty}</span>
                            <button onClick={() => increaseQty(item.id)}>+</button>
                          </div>
                        </div>
                        <button
                          className="delete-btn"
                          onClick={() => removeItem(item.id)}
                        >
                          🗑
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="cart-footer">
                    <h3>الإجمالي: {total} درهم</h3>
                    <button
                      className="whatsapp-btn"
                      onClick={handleWhatsAppOrder}
                    >
                      اطلب الآن عبر واتساب
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
