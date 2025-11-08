import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { supabase } from "../supabaseClient";
import { useTranslation } from "react-i18next";

const ProductContext = createContext();
export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const { i18n } = useTranslation();

  /** 🛍️ المنتجات */
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /** 🧾 الإعلانات */
  const [advertisements, setAdvertisements] = useState([]);
  const [adsLoading, setAdsLoading] = useState(true);
  const [adsError, setAdsError] = useState(null);

  /** 🌄 بانوراما الصور */
  const [panoramaImages, setPanoramaImages] = useState([]);
  const [panoramaLoading, setPanoramaLoading] = useState(true);
  const [panoramaError, setPanoramaError] = useState(null);

  /** ✅ تحويل الصور لـ array دائمًا */
  const parseImages = useCallback((images) => {
    if (!images) return [];
    if (Array.isArray(images)) return images;
    try {
      return JSON.parse(images);
    } catch {
      return [images];
    }
  }, []);

  /** ✅ جلب جدول محدد */
  const fetchTable = useCallback(async (tableName) => {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.error(`Error fetching ${tableName}:`, error.message);
        return [];
      }

      return data.map((item) => ({ ...item, category: tableName }));
    } catch (err) {
      console.error(`Error fetching ${tableName}:`, err.message);
      return [];
    }
  }, []);

  /** ✅ جلب جميع المنتجات */
  const fetchAllProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const tables = ["natural", "cake", "arrangements", "wedding", "birthday", "graduations"];
      const results = await Promise.all(tables.map(fetchTable));
      setAllProducts(results.flat());
    } catch (err) {
      console.error("Failed to fetch all products:", err);
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  }, [fetchTable]);

  /** ✅ جلب الإعلانات */
  const fetchAdvertisements = useCallback(async () => {
    setAdsLoading(true);
    setAdsError(null);
    try {
      const { data, error } = await supabase.from("advertisements").select("*").order("id", { ascending: false });
      if (error) throw error;
      setAdvertisements(data || []);
    } catch (err) {
      console.error("Failed to fetch advertisements:", err.message);
      setAdsError("Failed to fetch advertisements");
    } finally {
      setAdsLoading(false);
    }
  }, []);

  /** ✅ جلب بانوراما الصور */
  const fetchPanoramaImages = useCallback(async () => {
    setPanoramaLoading(true);
    setPanoramaError(null);
    try {
      const { data, error } = await supabase.from("panorama").select("*").order("id", { ascending: true });
      if (error) throw error;

      const formattedData = (data || []).map((item) => ({
        ...item,
        images: parseImages(item.images),
        title: i18n.language === "ar" ? item.titleAR || item.titleEN || "" : item.titleEN || item.titleAR || "",
        description: i18n.language === "ar" ? item.descriptionAR || "" : item.descriptionEN || "",
      }));

      setPanoramaImages(formattedData);
    } catch (err) {
      console.error("Failed to fetch panorama images:", err.message);
      setPanoramaError("Failed to fetch panorama images");
    } finally {
      setPanoramaLoading(false);
    }
  }, [i18n.language, parseImages]);

  /** ✅ جلب البيانات عند التحميل */
  useEffect(() => {
    fetchAllProducts();
    fetchAdvertisements();
    fetchPanoramaImages();
  }, [fetchAllProducts, fetchAdvertisements, fetchPanoramaImages]);

  /** ✅ تجهيز المنتج للغة الحالية */
  const getLocalizedProduct = useCallback(
    (product) => {
      if (!product) return {};

      const images = parseImages(product.images);
      const price = product.price ?? 0;
      const discount = product.discount ?? 0;
      const finalPrice = discount > 0 ? +(price - (price * discount) / 100).toFixed(2) : price;

      const name = i18n.language === "ar" ? product.nameAR || product.nameEN || "" : product.nameEN || product.nameAR || "";
      const description = i18n.language === "ar" ? product.descriptionAR || product.descriptionEN || "" : product.descriptionEN || product.descriptionAR || "";

      return { ...product, name, description, images, price, discount, finalPrice };
    },
    [i18n.language, parseImages]
  );

  return (
    <ProductContext.Provider
      value={{
        /** 🛍️ المنتجات */
        allProducts,
        loading,
        error,
        refetch: fetchAllProducts,
        getLocalizedProduct,

        /** 🧾 الإعلانات */
        advertisements,
        adsLoading,
        adsError,
        refetchAds: fetchAdvertisements,

        /** 🌄 بانوراما الصور */
        panoramaImages,
        panoramaLoading,
        panoramaError,
        refetchPanorama: fetchPanoramaImages,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
