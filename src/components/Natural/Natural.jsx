import React from 'react';
import './Natural.css';
import Products from '../Products/Products';

function Natural() {
  return (
    <div className='Natural'>
      {/* تمرير كاتيجوري الورد الطبيعي */}
      <Products category="natural" />
    </div>
  );
}

export default Natural;
