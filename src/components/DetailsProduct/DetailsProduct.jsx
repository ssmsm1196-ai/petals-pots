import React, { useState, useRef } from "react";
import "./DetailsProduct.css";

function DetailsProduct({ product, onClose, onAddToCart }) {
  if (!product) return null;

  const [mainImage, setMainImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [backgroundPos, setBackgroundPos] = useState("center");
  const imgContainerRef = useRef(null);

  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const discountedPrice = product.discount
    ? (product.price - (product.price * product.discount) / 100).toFixed(2)
    : product.price.toFixed(2);

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      imgContainerRef.current.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    setBackgroundPos(`${x}% ${y}%`);
  };

  const handleMouseLeave = () => {
    setBackgroundPos("center");
  };

  const handleAddToCart = () => {
    // ✅ تمرير الكمية الصحيحة للعربة
    onAddToCart(product, quantity);
  };

  return (
    <div className="DetailsProduct-overlay" onClick={onClose}>
      <div
        className="DetailsProduct-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>

        <div className="DetailsProduct-content">
          {/* ✅ قسم الصور */}
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
              <img src={mainImage} alt={product.name} className="main-image" />
            </div>

            <div className="thumbnail-list">
              {product.images.map((img, i) => (
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

          {/* ✅ قسم التفاصيل */}
          <div className="info-section">
            <h2 className="product-name">{product.name}</h2>
            <p className="description">{product.description}</p>

            <div className="price-box">
              {product.discount > 0 && (
                <span className="old-price">{product.price.toFixed(2)} AED</span>
              )}
              <span className="new-price">{discountedPrice} AED</span>
              {product.discount > 0 && (
                <span className="discount">-{product.discount}%</span>
              )}
            </div>

            {/* ✅ التحكم في الكمية */}
            <div className="quantity-control">
              <button onClick={decreaseQty}>-</button>
              <span>{quantity}</span>
              <button onClick={increaseQty}>+</button>
            </div>

            {/* ✅ الأزرار (تحت التفاصيل مباشرة وبشكل عمودي) */}
            <div className="action-buttons column-layout">
              <button className="order-now">اطلب الآن</button>
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
