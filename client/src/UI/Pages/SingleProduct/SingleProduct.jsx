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

  console.log(product);

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
              <div className='PriceLine'>
                <p className='DollarSign'>$</p>
                <p className='Dollars'>{product.price}</p>
                <p className='Cents'>99</p>
              </div>
              {product.details.map((x, i) => {
                return (
                  <div className='DetailLine' key={i}>
                    <div className='Key'>{x.key}</div>
                    <div className='Value'>{x.value}</div>
                  </div>
                );
              })}
              <div className='HLine' />
              <div className='AboutTitle'>About This Item</div>
              {product.about.map((x, i) => (
                <div className='AboutLine' key={i}>
                  <div className='Dot' />
                  <div className='About'>{x}</div>
                </div>
              ))}
            </div>
            <div className='Purchase'>
              <div className='PriceLine'>
                <p className='DollarSign'>$</p>
                <p className='Dollars'>{product.price}</p>
                <p className='Cents'>99</p>
              </div>
              <p className='DeliveryDetails'>Delivery Details</p>
              <div className='AddressLine'>
                <div className='Dot' />
                <div className='Address'>User Address Goes Here</div>
              </div>
              <p className='Stock'>In Stock / Out of Stock</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default SingleProduct;
