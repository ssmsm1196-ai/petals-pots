import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import Home from "./components/Home/Home";
import Natural from "./components/Natural/Natural";
import "./i18n";
import { useTranslation } from "react-i18next";
import { CartProvider } from "./context/CartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      element: <Layout changeLanguage={changeLanguage} />,
      errorElement: <h1>Page Not Found</h1>,
      children: [
        { index: true, element: <Home /> },
        { path: "/natural", element: <Natural /> },
        // يمكنك إضافة أي صفحات أخرى هنا
      ],
    },
  ]);

  return (
    <CartProvider>
      <RouterProvider router={router} />
      <ToastContainer 
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={i18n.language === "ar"}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </CartProvider>
  );
}

export default App;
