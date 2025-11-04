// context/ProductContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [productsNatural, setProductsNatural] = useState([]);
  const [productsArtificial, setProductsArtificial] = useState([]);
  const [productsWeddings, setProductsWeddings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTable = async (tableName, setState) => {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setState(data || []);
    } catch (err) {
      console.error(`Error fetching ${tableName}:`, err.message);
      setState([]);
    }
  };

  const fetchAllProducts = async () => {
    setLoading(true);
    await Promise.all([
      fetchTable("natural", setProductsNatural),
      fetchTable("artificial", setProductsArtificial),
      fetchTable("weddings", setProductsWeddings),
    ]);
    setLoading(false);
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        productsNatural,
        productsArtificial,
        productsWeddings,
        loading,
        refetch: fetchAllProducts, // لإعادة الجلب عند الحاجة
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
