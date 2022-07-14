import React from 'react';
import './Home.scss';
import Image from '../../../images/pexels-alexgtacar-1592384.jpg';

const Home = () => {
  return (
    <div className='Home'>
      <div className='HeaderBox'>
        <img src={Image} alt='image' className='HeaderImage' />
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
        <img src={Image} alt='image' className='Btn' />
        <img src={Image} alt='image' className='Btn' />
        <img src={Image} alt='image' className='Btn' />
        <img src={Image} alt='image' className='Btn' />
        <img src={Image} alt='image' className='Btn' />
        <img src={Image} alt='image' className='Btn' />
      </div>
    </div>
  );
};

export default Home;
