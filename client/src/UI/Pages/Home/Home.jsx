import React, { useEffect } from 'react';
import './Home.scss';
import { getHighlightProducts, selectProducts, setCurrProduct } from '../../../Redux/productSlice';
import Car from '../../../images/car.jpg';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);

  useEffect(() => {
    dispatch(getHighlightProducts());
  }, []);

  return (
    <div className='Home'>
      <div className='HeaderBox'>
        <img src={Car} alt='image' className='HeaderImage' />
        <div className='Gradient' />
        <h1 className='Title'>GET FIT TODAY!</h1>
        <div className='Header'>
          <div className='Btn'>
            <img src={Car} alt='x' />
            <p>Weights</p>
          </div>
          <div className='Btn'>
            <img src={Car} alt='x' />
            <p>Gym Systems</p>
          </div>
          <div className='Btn'>
            <img src={Car} alt='x' />
            <p>Plate Loaded</p>
          </div>
          <div className='Btn'>
            <img src={Car} alt='x' />
            <p>Accessories</p>
          </div>
        </div>
      </div>
      <div className='Section1'>
        {products &&
          products.map((x, i) => {
            if (i < 6)
              return (
                <>
                  {x.image_filenames.map((c, j) => {
                    if (c.main) {
                      return (
                        <Link key={i} className='product' to='/product'>
                          <img
                            src={`/api/product/image/${c.filename}`}
                            alt='image'
                            onClick={() => dispatch(setCurrProduct(x))}
                          />
                        </Link>
                      );
                    }
                  })}
                </>
              );
          })}
      </div>
      <div className='Section2'>
        <img className='promo' src={Car} alt='' />
        <div className='category'>
          <h2>Bicycles</h2>
          <img src={Car} alt='' />
        </div>
        <div className='category'>
          <h2>Bicycles</h2>
          <img src={Car} alt='' />
        </div>
      </div>
    </div>
  );
};

export default Home;
