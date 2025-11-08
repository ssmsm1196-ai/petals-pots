import React, { useMemo } from "react";
import "./Loader.css";

const Loader = React.memo(({ count = 6 }) => {
  const loaders = useMemo(() => Array.from({ length: count }), [count]);

  return (
    <div className="loader-grid">
      {loaders.map((_, i) => (
        <div key={i} className="loader-card">
          <div className="loader-image"></div>
          <div className="loader-text"></div>
          <div className="loader-text"></div>
          <div className="loader-btn"></div>
        </div>
      ))}
    </div>
  );
});

export default Loader;
