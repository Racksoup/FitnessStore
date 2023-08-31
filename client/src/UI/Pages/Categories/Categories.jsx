import React from 'react';
import './Categories.scss';
import Car from '../../../images/car.jpg';

import { Link } from 'react-router-dom';

const Categories = () => {
  return (
    <div className='categories'>
      <h1>SHOP BY CATEGORY</h1>
      <div className='grid'>
        <Link to='/category' className='item' onClick={() => catClicked('')}>
          <img src={Car} alt='car' />
          <p>Balls</p>
        </Link>
        <Link to='/category' className='item' onClick={() => catClicked('')}>
          <img src={Car} alt='car' />
          <p>Balls</p>
        </Link>
        <Link to='/category' className='item' onClick={() => catClicked('')}>
          <img src={Car} alt='car' />
          <p>Balls</p>
        </Link>
        <Link to='/category' className='item' onClick={() => catClicked('')}>
          <img src={Car} alt='car' />
          <p>Balls</p>
        </Link>
        <Link to='/category' className='item' onClick={() => catClicked('')}>
          <img src={Car} alt='car' />
          <p>Balls</p>
        </Link>
        <Link to='/category' className='item' onClick={() => catClicked('')}>
          <img src={Car} alt='car' />
          <p>Balls</p>
        </Link>
        <Link to='/category' className='item' onClick={() => catClicked('')}>
          <img src={Car} alt='car' />
          <p>Balls</p>
        </Link>
        <Link to='/category' className='item' onClick={() => catClicked('')}>
          <img src={Car} alt='car' />
          <p>Balls</p>
        </Link>
        <Link to='/category' className='item' onClick={() => catClicked('')}>
          <img src={Car} alt='car' />
          <p>Balls</p>
        </Link>
        <Link to='/category' className='item' onClick={() => catClicked('')}>
          <img src={Car} alt='car' />
          <p>Balls</p>
        </Link>
        <Link to='/category' className='item' onClick={() => catClicked('')}>
          <img src={Car} alt='car' />
          <p>Balls</p>
        </Link>
        <Link to='/category' className='item' onClick={() => catClicked('')}>
          <img src={Car} alt='car' />
          <p>Balls</p>
        </Link>
      </div>
    </div>
  );
};

export default Categories;
