import React from 'react';
import '../Natural/Natural.css';
import Products from '../Products/Products';

function Wedding() {
  return (
    <div className='Wedding'>
      {/* تمرير كاتيجوري ورد مع كيك  */}
      <Products category="wedding" />
    </div>
  );
}

export default Wedding;
