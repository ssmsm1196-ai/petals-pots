import React from 'react';
import './Natural.css';
import Products from '../Products/Products';

const Natural = React.memo(() => {
  return (
    <div className='Natural'>
      {/* تمرير كاتيجوري الورد الطبيعي */}
      <Products category="natural" />
    </div>
  );
});

export default Natural;
