// src/components/Loader/Loader.jsx
import React from "react";
import "./Loader.css";

export default function Loader({ count = 6 }) {
  return (
    <div className="loader-grid">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="loader-card">
          <div className="loader-image"></div>
          <div className="loader-text"></div>
          <div className="loader-text"></div>
          <div className="loader-btn"></div>
        </div>
      ))}
    </div>
  );
}
