import React from 'react';
import './Cart.scss';
import { deleteCartItem, selectCart, setCheckout, updateCart } from '../../../../Redux/cartSlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);

  if (cart.cart) {
    let cartTotal = 0;
    let numOfItems = 0;
    cart.cart.map((x) => {
      cartTotal += x.price * x.quantity;
      numOfItems += x.quantity;
    });

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
              <div className='Item' key={i}>
                <input type='checkbox' />
                {product.image_filenames.map((img, q) => {
                  if (img.main) {
                    return (
                      <img src={`/api/product/image/${img.filename}`} alt='Product Image' key={q} />
                    );
                  }
                })}
                <div className='Info'>
                  <div className='TitleLine'>
                    <h4>{product.name}</h4>
                    <p>{product.price / 100}</p>
                  </div>
                  <p className='Brand'>{product.brand}</p>
                  <p className='GreenText'>{product.stock}</p>
                  <p className='Shipping'>Ships from FedEx, sold by Fitness Store</p>
                  <p className='Size'>Size: 1kg (Pack of 1)</p>
                  <div className='QuantityLine'>
                    <div className='Quantity'>
                      <p>Qty: {product.quantity}</p>
                      <FontAwesomeIcon
                        className='Icon'
                        icon={faPlus}
                        onClick={() =>
                          dispatch(updateCart(cart._id, product, product.quantity + 1))
                        }
                      ></FontAwesomeIcon>
                      <FontAwesomeIcon
                        className='Icon'
                        icon={faMinus}
                        onClick={() =>
                          dispatch(updateCart(cart._id, product, product.quantity - 1))
                        }
                      ></FontAwesomeIcon>
                    </div>
                    <div className='VLine' />
                    <p
                      className='BlueText'
                      onClick={() => dispatch(deleteCartItem(cart._id, product._id))}
                    >
                      Delete
                    </p>
                    <div className='VLine' />
                    <p className='BlueText'>Move to Wishlist</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className='Right'>
          <div className='CheckoutModule'>
            <h4>
              Subtotal ({numOfItems} items): ${cartTotal / 100}
            </h4>

            <Link to='/checkout' className='Btn' onClick={() => dispatch(setCheckout(cart))}>
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    );
  }
};

export default Cart;