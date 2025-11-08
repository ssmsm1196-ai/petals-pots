import React from "react";
import Advertisements from "./Advertisements/Advertisements";
import ProductsSlider from "./ProductsSlider/ProductsSlider";
import Panorama from "./Panorama/Panorama";
import Naturalrose from "./Naturalrose/Naturalrose";
import Formats from "./Formats/Formats";
import Products from "../Products/Products";

const Home = React.memo(() => {
  return (
    <>
      <Advertisements />
      <Naturalrose />
      <Panorama />
      <Formats />
      <Products />
    </>
  );
});

export default Home;
