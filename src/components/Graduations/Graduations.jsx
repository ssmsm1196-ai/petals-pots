import React from 'react';
import '../Natural/Natural.css';
import Products from '../Products/Products';

const Graduations = React.memo(function Graduations() {
  return (
    <div className='Graduations'>
      {/* تمرير كاتيجوري ورد مع كيك */}
      <Products category="graduations" />
    </div>
  );
});

export default Graduations;
