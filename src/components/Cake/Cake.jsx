import React from 'react';
import '../Natural/Natural.css';
import Products from '../Products/Products';

const Cake = React.memo(() => {
  return (
    <div className='cake'>
      {/* تمرير كاتيجوري cake */}
      <Products category="cake" />
    </div>
  );
});

export default Cake;
