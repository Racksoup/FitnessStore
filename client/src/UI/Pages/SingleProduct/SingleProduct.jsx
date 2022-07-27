import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { selectProduct } from '../../../Redux/productSlice';

const SingleProduct = () => {
  const product = useSelector(selectProduct);
  const [currImage, setCurrImage] = useState('');

  useEffect(() => {
    if (product) {
      product.image_filenames.map((x) => {
        if (x.main) {
          setCurrImage(x);
        }
      });
    }
  }, [product]);

  console.log(currImage);

  return (
    <div className='SingleProduct'>
      <div className='Top'>
        <div className='Left'>
          <div className='Images'>
            {currImage && (
              <img
                className='Img'
                src={`api/product/image/${currImage.filename}`}
                alt='Product Image'
              />
            )}
          </div>
          <img className='MainImage' src={`api/product/image/${currImage}`} alt='Product Image' />
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
