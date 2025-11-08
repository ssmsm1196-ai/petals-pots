import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useProducts } from "./ProductContext";
import { useTranslation } from "react-i18next";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { getLocalizedProduct } = useProducts();
  const { i18n } = useTranslation();

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // دالة لحساب السعر الكلي
  const calculateTotalPrice = useCallback((price, qty) => +(price * qty).toFixed(2), []);

  // حفظ العربه في localStorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // تحديث بيانات المنتجات عند تغيير اللغة
  useEffect(() => {
    setCartItems((prev) =>
      prev.map((item) => {
        const original = item.originalItem || item;
        const localized = getLocalizedProduct(original);
        const qty = item.qty || 1;
        return {
          ...item,
          name: localized.name,
          description: localized.description,
          displayImage:
            localized.images && localized.images.length > 0
              ? localized.images[0]
              : "/default-image.png",
          images: localized.images,
          price: localized.price,
          totalPrice: calculateTotalPrice(localized.price, qty),
        };
      })
    );
  }, [i18n.language, getLocalizedProduct, calculateTotalPrice]);

  // إضافة منتج للعربة
  const addToCart = useCallback(
    (product) => {
      const localized = getLocalizedProduct(product);
      const qty = product.qty || 1;

      setCartItems((prev) => {
        const exist = prev.find((item) => item.id === product.id);
        if (exist) {
          return prev.map((item) =>
            item.id === product.id
              ? { ...item, qty: item.qty + qty, totalPrice: calculateTotalPrice(item.price, item.qty + qty) }
              : item
          );
        } else {
          const newItem = {
            id: product.id,
            name: localized.name,
            description: localized.description,
            displayImage:
              localized.images && localized.images.length > 0
                ? localized.images[0]
                : "/default-image.png",
            images: localized.images,
            qty,
            price: localized.price,
            totalPrice: calculateTotalPrice(localized.price, qty),
            originalItem: product,
          };
          return [...prev, newItem];
        }
      });

      toast.success(`${localized.name || "المنتج"} تم إضافته للسلة!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
      });
    },
    [getLocalizedProduct, calculateTotalPrice]
  );

  // زيادة الكمية
  const increaseQty = useCallback(
    (id) =>
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, qty: item.qty + 1, totalPrice: calculateTotalPrice(item.price, item.qty + 1) }
            : item
        )
      ),
    [calculateTotalPrice]
  );

  // تقليل الكمية
  const decreaseQty = useCallback(
    (id) =>
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === id && item.qty > 1
            ? { ...item, qty: item.qty - 1, totalPrice: calculateTotalPrice(item.price, item.qty - 1) }
            : item
        )
      ),
    [calculateTotalPrice]
  );

  // إزالة عنصر
  const removeItem = useCallback((id) => setCartItems((prev) => prev.filter((item) => item.id !== id)), []);

  // إجمالي السعر
  const total = useMemo(() => cartItems.reduce((acc, item) => acc + item.totalPrice, 0), [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQty,
        decreaseQty,
        removeItem,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
