import { useEffect, useState, Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import { CartProvider } from "./context/CartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowUp } from "react-icons/fa";
import Loader from "./components/Loader/Loader";
import i18n from "./i18n"; 

// Lazy Loading للكومبوننتات الثقيلة
const Home = lazy(() => import("./components/Home/Home"));
const Natural = lazy(() => import("./components/Natural/Natural"));

function App() {
  const [showScroll, setShowScroll] = useState(false);
  const [lang, setLang] = useState("en");

  // تغيير اللغة
  const changeLanguage = (lang) => {
    setLang(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    localStorage.setItem("language", lang);
  };

  // Scroll up button
  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout changeLanguage={changeLanguage} />,
      errorElement: <h1>Page Not Found</h1>,
      children: [
        { index: true, element: <Suspense fallback={<Loader />}> <Home /> </Suspense> },
        { path: "/natural", element: <Suspense fallback={<Loader />}> <Natural /> </Suspense> },
      ],
    },
  ]);

  return (
    <CartProvider>
      <main>
        <RouterProvider router={router} />
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={lang === "ar"}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        {showScroll && (
          <button className="scroll-to-top" onClick={scrollToTop} aria-label="Scroll to top">
            <FaArrowUp />
          </button>
        )}
      </main>
    </CartProvider>
  );
}

export default App;
