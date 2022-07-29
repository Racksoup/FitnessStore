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
        <div className='Header'>
          <div />
          <h1 className='Title'>GET FIT TODAY!</h1>
          <div />
          <div className='Btn'>Weights</div>
          <div className='Btn'>Gym Systems</div>
          <div className='Btn'>Plate Loaded</div>
          <div className='Btn'>Cardio</div>
          <div className='Btn'>Accessories</div>
          <div className='Btn'>Bicycles</div>
        </div>
      </div>
      <div className='Section1'>
        {products &&
          products.map((x, i) => {
            return (
              <>
                {x.image_filenames.map((c, j) => {
                  if (c.main) {
                    return (
                      <Link key={i} className='Link' to='/product'>
                        <img
                          src={`api/product/image/${c.filename}`}
                          alt='image'
                          className='Btn'
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
    </div>
  );
};

export default Home;
