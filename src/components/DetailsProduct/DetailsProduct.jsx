import React, { useState, useRef, useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useProducts } from "../../context/ProductContext";
import "./DetailsProduct.css";

const DetailsProduct = React.memo(function DetailsProduct({ product, onClose, onAddToCart }) {
  const { i18n } = useTranslation();
  const { getLocalizedProduct } = useProducts();

  if (!product) return null;

  // جلب المنتج حسب اللغة
  const localized = useMemo(() => getLocalizedProduct(product), [product, getLocalizedProduct]);
  const productName = i18n.language === "ar" ? localized.nameAR : localized.nameEN;
  const productDescription = i18n.language === "ar" ? localized.descriptionAR : localized.descriptionEN;

  // معالجة الصور
  const allImages = useMemo(() => {
    try {
      let parsed = [];
      if (typeof product.images === "string") parsed = JSON.parse(product.images);
      else if (Array.isArray(product.images)) parsed = product.images;
      return parsed.length > 0 ? parsed : [product.image || "https://via.placeholder.com/400"];
    } catch (err) {
      console.error("Error parsing images:", err);
      return [product.image || "https://via.placeholder.com/400"];
    }
  }, [product]);

  const [mainImage, setMainImage] = useState(allImages[0]);
  const [quantity, setQuantity] = useState(1);
  const [backgroundPos, setBackgroundPos] = useState("center");
  const imgContainerRef = useRef(null);

  const increaseQty = useCallback(() => setQuantity((prev) => prev + 1), []);
  const decreaseQty = useCallback(() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1)), []);

  const price = product.price ?? 0;
  const discount = product.discount ?? 0;

  // السعر بعد الخصم لكل وحدة
  const discountedPricePerItem = useMemo(
    () => (discount > 0 ? price - (price * discount) / 100 : price),
    [price, discount]
  );

  // السعر الإجمالي
  const totalPrice = useMemo(
    () => (discountedPricePerItem * quantity).toFixed(2),
    [discountedPricePerItem, quantity]
  );

  // تحسين الماوس للـ zoom
  const handleMouseMove = useCallback((e) => {
    if (!imgContainerRef.current) return;
    const { left, top, width, height } = imgContainerRef.current.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    requestAnimationFrame(() => setBackgroundPos(`${x}% ${y}%`));
  }, []);

  const handleMouseLeave = useCallback(() => setBackgroundPos("center"), []);

  // إرسال المنتج للعربة مع السعر بعد الخصم لكل وحدة
  const handleAddToCart = useCallback(() => {
    onAddToCart({
      ...product,
      qty: quantity,
      price: discountedPricePerItem, // ✅ السعر بعد الخصم
      discount: discount,
      name: productName,
      description: productDescription,
      mainImage,
    });
  }, [onAddToCart, product, quantity, discountedPricePerItem, discount, productName, productDescription, mainImage]);

  const handleOrderNow = useCallback(() => {
    const whatsappNumber = "971544808838";
    const message = `طلب منتج:
الاسم: ${productName}
الكمية: ${quantity}
السعر الإجمالي: ${totalPrice} AED
الوصف: ${productDescription || "لا يوجد وصف"}
رابط الصورة: ${mainImage}`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  }, [productName, quantity, totalPrice, productDescription, mainImage]);

  return (
    <div className="DetailsProduct-overlay" onClick={onClose}>
      <div className="DetailsProduct-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>&times;</button>

        <div className="DetailsProduct-content">
          <div className={`image-section ${allImages.length === 1 ? "single" : ""}`}>
            <div
              className="zoom-container"
              ref={imgContainerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ backgroundImage: `url(${mainImage})`, backgroundPosition: backgroundPos }}
            >
              <img src={mainImage} alt={productName} className="main-image" />
            </div>

            {allImages.length > 1 && (
              <div className="thumbnail-list">
                {allImages.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt=""
                    className={`thumbnail ${mainImage === img ? "active" : ""}`}
                    onClick={() => setMainImage(img)}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="info-section">
            <h2 className="product-name">{productName}</h2>
            <p className="description">{productDescription || "لا يوجد وصف للمنتج"}</p>

            <div className="price-box">
              {discount > 0 && <span className="old-price">{price.toFixed(2)} AED</span>}
              <span className="new-price">{totalPrice} AED</span>
              {discount > 0 && <span className="discount">-{discount}%</span>}
            </div>

            <div className="quantity-control">
              <button onClick={decreaseQty}>-</button>
              <span>{quantity}</span>
              <button onClick={increaseQty}>+</button>
            </div>

            <div className="action-buttons column-layout">
              <button className="order-now" onClick={handleOrderNow}>اطلب الآن</button>
              <button className="add-to-cart" onClick={handleAddToCart}>أضف إلى العربة ({quantity})</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default DetailsProduct;
