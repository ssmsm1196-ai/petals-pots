// context/ProductContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

// إنشاء الكونتكست
const ProductContext = createContext();

// هوك جاهز للاستخدام في أي كومبوننت
export const useProducts = () => useContext(ProductContext);

// البروفايدر الذي يلتف حول الأبناء
export const ProductProvider = ({ children }) => {
  const [productsNatural, setProductsNatural] = useState([]);
  const [productsArtificial, setProductsArtificial] = useState([]);
  const [productsWeddings, setProductsWeddings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // دالة عامة لجلب جدول محدد بطريقة آمنة
  const fetchTableSafe = async (tableName, setState) => {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        if (error.message.includes("Could not find the table")) {
          console.warn(`Warning: Table '${tableName}' does not exist yet.`);
          setState([]);
          return;
        }
        throw error;
      }

      setState(data || []);
    } catch (err) {
      console.error(`Error fetching ${tableName}:`, err.message);
      setState([]);
    }
  };

  // دالة لجلب كل الجداول مرة واحدة
  const fetchAllProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      await Promise.all([
        fetchTableSafe("natural", setProductsNatural),
        fetchTableSafe("artificial", setProductsArtificial),
        fetchTableSafe("weddings", setProductsWeddings),
      ]);
    } catch (err) {
      setError("Failed to fetch products");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // جلب البيانات عند أول تحميل
  useEffect(() => {
    fetchAllProducts();
  }, []);

  // القيم التي سنشاركها مع أي كومبوننت يستخدم الكونتكست
  return (
    <ProductContext.Provider
      value={{
        productsNatural,
        productsArtificial,
        productsWeddings,
        loading,
        error,
        refetch: fetchAllProducts, // يمكن استخدامه لإعادة الجلب عند الحاجة
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
