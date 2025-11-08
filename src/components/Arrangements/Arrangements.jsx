import React from 'react';
import '../Natural/Natural.css';
import Products from '../Products/Products';

const Arrangements = React.memo(() => {
  return (
    <div className='arrangements'>
      {/* تمرير كاتيجوري ورد مع كيك  */}
      <Products category="arrangements" />
    </div>
  );
});

export default Arrangements;
