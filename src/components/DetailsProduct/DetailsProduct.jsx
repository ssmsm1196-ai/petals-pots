import React, { useState, useRef } from "react";
import "./DetailsProduct.css";

function DetailsProduct({ product, onClose, onAddToCart }) {
  if (!product) return null;

  const images =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : [product.image || "https://via.placeholder.com/400"];

  const [mainImage, setMainImage] = useState(images[0]);
  const [quantity, setQuantity] = useState(1);
  const [backgroundPos, setBackgroundPos] = useState("center");
  const imgContainerRef = useRef(null);

  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const price = product.price ?? 0;
  const discount = product.discount ?? 0;

  // السعر بعد الخصم للقطعة الواحدة
  const discountedPricePerItem =
    discount > 0 ? price - (price * discount) / 100 : price;

  // السعر الكلي حسب الكمية
  const totalPrice = (discountedPricePerItem * quantity).toFixed(2);

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      imgContainerRef.current.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    setBackgroundPos(`${x}% ${y}%`);
  };

  const handleMouseLeave = () => setBackgroundPos("center");

  const handleAddToCart = () => {
    onAddToCart({ ...product, qty: quantity, price: discountedPricePerItem });
  };

  // إرسال رسالة واتساب
  const handleOrderNow = () => {
    const whatsappNumber = "971544808838"; // ضع رقم واتسابك بدون +
    const message = `
طلب منتج:
الاسم: ${product.name}
الكمية: ${quantity}
السعر الإجمالي: ${totalPrice} AED
الوصف: ${product.description || "لا يوجد وصف"}
رابط الصورة: ${mainImage}
    `;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div className="DetailsProduct-overlay" onClick={onClose}>
      <div className="DetailsProduct-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>

        <div className="DetailsProduct-content">
          {/* قسم الصور */}
          <div className="image-section">
            <div
              className="zoom-container"
              ref={imgContainerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                backgroundImage: `url(${mainImage})`,
                backgroundPosition: backgroundPos,
              }}
            >
              <img
                src={mainImage}
                alt={product.name || "منتج"}
                className="main-image"
              />
            </div>

            <div className="thumbnail-list">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt=""
                  className={`thumbnail ${mainImage === img ? "active" : ""}`}
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
          </div>

          {/* قسم التفاصيل */}
          <div className="info-section">
            <h2 className="product-name">{product.name || "بدون اسم"}</h2>
            <p className="description">{product.description || "لا يوجد وصف للمنتج"}</p>

            <div className="price-box">
              {discount > 0 && (
                <span className="old-price">{price.toFixed(2)} AED</span>
              )}
              <span className="new-price">{totalPrice} AED</span>
              {discount > 0 && <span className="discount">-{discount}%</span>}
            </div>

            {/* التحكم في الكمية */}
            <div className="quantity-control">
              <button onClick={decreaseQty}>-</button>
              <span>{quantity}</span>
              <button onClick={increaseQty}>+</button>
            </div>

            {/* الأزرار */}
            <div className="action-buttons column-layout">
              <button className="order-now" onClick={handleOrderNow}>
                اطلب الآن
              </button>
              <button className="add-to-cart" onClick={handleAddToCart}>
                أضف إلى العربة ({quantity})
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsProduct;
