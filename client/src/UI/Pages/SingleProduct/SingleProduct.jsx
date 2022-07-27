import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { selectProduct } from '../../../Redux/productSlice';

const SingleProduct = () => {
  const product = useSelector(selectProduct);
  const [currImage, setCurrImage] = useState('');

  useEffect(() => {
    product.map((x) => {
      if (x.main) {
        setCurrImage(x.filename);
      }
    });
    setCurrImage();
  }, [product]);

  console.log(product);

  return (
    <div className='SingleProduct'>
      <div className='Top'>
        <div className='Left'>
          <div className='Images'>
            {product.image_filenames.map((x, i) => (
              <img
                key={i}
                className='Img'
                src={`api/product/image/${x.filename}`}
                alt='Product Image'
              />
            ))}
          </div>
          <img className='MainImage' src={`api/product/image/${currImage}`} alt='Product Image' />
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
