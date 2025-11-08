import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

// Layout الأب لجميع الصفحات
function Layout() {
  return (
    <>
      {/* Navbar ثابت في الأعلى */}
      <Navbar />

      {/* مكان عرض كل صفحة حسب الـ Route */}
      <main>
        <Outlet />
      </main>

      {/* Footer ثابت في الأسفل */}
      <Footer />
    </>
  );
}

export default Layout;
