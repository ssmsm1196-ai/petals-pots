import { useEffect, useState, Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import { CartProvider } from "./context/CartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowUp } from "react-icons/fa";
import Loader from "./components/Loader/Loader";
import i18n from "./i18n"; 
import Article from "./components/Home/Article/Article";

// Lazy Loading للكومبوننتات الثقيلة
const Home = lazy(() => import("./components/Home/Home"));
const Natural = lazy(() => import("./components/Natural/Natural"));
const Cake = lazy(() => import("./components/Cake/Cake"));
const Arrangements = lazy(() => import("./components/Arrangements/Arrangements"));
const Wedding = lazy(() => import("./components/Wedding/Wedding"));
const Birthday = lazy(() => import("./components/Birthday/Birthday"));
const Graduations = lazy(() => import("./components/Graduations/Graduations"));
const Contact = lazy(() => import("./components/Contact/Contact"));

function App() {
  // استرجاع اللغة من localStorage أو افتراضي "en"
  const [lang, setLang] = useState(() => localStorage.getItem("language") || "en");
  const [showScroll, setShowScroll] = useState(false);

  // تغيير اللغة
  const changeLanguage = (newLang) => {
    setLang(newLang);
    localStorage.setItem("language", newLang);
  };

  // ضبط الـ document و i18n عند تغيير اللغة
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    i18n.changeLanguage(lang);
  }, [lang]);

  // Scroll Up button
  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // إعداد الـ Router
  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout changeLanguage={changeLanguage} />,
      errorElement: <h1>Page Not Found</h1>,
      children: [
        { index: true, element: <Home /> },
        { path: "/natural", element: <Natural /> },
        { path: "/cake", element: <Cake /> },
        { path: "/arrangements", element: <Arrangements /> },
        { path: "/wedding", element: <Wedding /> },
        { path: "/birthday", element: <Birthday /> },
        { path: "/graduations", element: <Graduations /> },
        { path: "/contact", element: <Contact /> },
        { path: "/article", element: <Article /> },
      ],
    },
  ]);

  return (
    <CartProvider>
      <Suspense fallback={<Loader />}>
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
            theme="colored"
          />

          {showScroll && (
            <button
              className="scroll-to-top"
              onClick={scrollToTop}
              aria-label="Scroll to top"
            >
              <FaArrowUp />
            </button>
          )}
        </main>
      </Suspense>
    </CartProvider>
  );
}

export default App;
