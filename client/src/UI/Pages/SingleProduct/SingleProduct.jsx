import React, { useState, useEffect } from 'react';
import './SingleProduct.scss';

import { useSelector, useDispatch } from 'react-redux';
import { selectProduct, getCurrProduct } from '../../../Redux/productSlice';

const SingleProduct = () => {
  const dispatch = useDispatch();
  const product = useSelector(selectProduct);
  const [currImage, setCurrImage] = useState('');

  useEffect(() => {
    if (!product) {
      console.log('nnn');
      dispatch(getCurrProduct());
    }
  }, []);

  useEffect(() => {
    if (product) {
      product.image_filenames.map((x) => {
        if (x.main) {
          setCurrImage(x);
        }
      });
    }
  }, [product]);

  if (product) {
    return (
      <div className='SingleProduct'>
        <div className='Top'>
          <div className='Left'>
            <div className='Images'>
              {product.image_filenames.map((x, i) => (
                <img
                  className='Img'
                  src={`api/product/image/${x.filename}`}
                  alt='Product Image'
                  key={i}
                />
              ))}
            </div>
            <img
              src={`api/product/image/${currImage.filename}`}
              alt='Curr Image'
              className='CurrImage'
            />
          </div>
          <div className='Right'>
            <div className='Info'>
              <h1 className='Title'>{product.name}</h1>
              {/* <p className='Brand'>{product.brand}</p> */}
              {/* <div className='Rating'></div> */}
              <div className='HLine' />
            </div>
            <div className='Purchase'></div>
          </div>
        </div>
      </div>
    );
  }
};

export default SingleProduct;
