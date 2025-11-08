import React from 'react';
import '../Natural/Natural.css';
import Products from '../Products/Products';

const Birthday = React.memo(() => {
  return (
    <div className='Birthday'>
      {/* تمرير كاتيجوري Birthday */}
      <Products category="birthday" />
    </div>
  );
});

export default Birthday;
