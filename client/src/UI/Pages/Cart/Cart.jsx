import React from 'react';
import './Cart.scss';
import Car from '../../../images/car.jpg';
import { selectCart } from '../../../Redux/cartSlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);

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

        {cart.cart.map((product, i) => {
          return (
            <div className='Item'>
              <input type='checkbox' />
              {product.image_filenames.map((img) => {
                console.log(img);
                if (img.main) {
                  return <img src={`/api/product/image/${img.filename}`} alt='Product Image' />;
                }
              })}
              <div className='Info'>
                <div className='TitleLine'>
                  <h4>{product.name}</h4>
                  <p>{product.price}</p>
                </div>
                <p className='Brand'>{product.brand}</p>
                <p className='GreenText'>{product.stock}</p>
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
          );
        })}
      </div>
      <div className='Right'>
        <div className='CheckoutModule'>
          <h4>Subtotal (2 items): $60.46</h4>
          <button className='Btn'>Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
