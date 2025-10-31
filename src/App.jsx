import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import Home from "./components/Home/Home";
import Natural from "./components/Natural/Natural";
import "./i18n";
import { useTranslation } from "react-i18next";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";

function App() {
  const { i18n } = useTranslation();

  // 🔹 تغيير اللغة وتحديث الاتجاه
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    localStorage.setItem("language", lang);
  };

  // 🔹 عند أول تحميل للصفحة
  useEffect(() => {
    const savedLang = localStorage.getItem("language") || "en";
    i18n.changeLanguage(savedLang);
    document.documentElement.lang = savedLang;
    document.documentElement.dir = savedLang === "ar" ? "rtl" : "ltr";
  }, [i18n]);

  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout changeLanguage={changeLanguage} />, // ⬅️ نمرر الدالة للناف بار
      errorElement: <h1>Page Not Found</h1>,
      children: [
        { index: true, element: <Home /> },
        { path: "/natural", element: <Natural /> },
        // { path: "/shoppingCart", element: <ShoppingCart/> },
      ],
    },
  ]);

  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
