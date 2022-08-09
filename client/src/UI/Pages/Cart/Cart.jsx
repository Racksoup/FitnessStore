import React from 'react';
import './Cart.scss';
import Car from '../../../images/car.jpg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const Cart = () => {
  return (
    <div className='Cart'>
      <div className='ShoppingCart'>
        <div className='HeaderLine'>
          <h1>Shopping Cart</h1>
          <div className='SecondLine'>
            <p className='BlueText'>Deselect all items</p>
            <p>Price</p>
          </div>
        </div>
        <div className='Line' />
        <div className='Item'>
          <input type='checkbox' />
          <img src={Car} alt='Product Image' />
          <div className='Info'>
            <div className='TitleLine'>
              <h4>Title</h4>
              <p>Price</p>
            </div>
            <p className='Brand'>Brand</p>
            <p className='GreenText'>In Stock</p>
            <p className='Shipping'>Ships from FedEx, sold by Fitness Store</p>
            <p className='Size'>Size: 1kg (Pack of 1)</p>
            <div className='QuantityLine'>
              <div className='Quantity'>
                <p>Qty: 1</p>
                <FontAwesomeIcon className='Icon' icon={faChevronDown}></FontAwesomeIcon>
              </div>
              <div className='VLine' />
              <p className='BlueText'>Delete</p>
              <div className='VLine' />
              <p className='BlueText'>Save for later</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
