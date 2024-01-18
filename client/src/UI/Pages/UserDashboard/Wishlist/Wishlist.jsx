import React from 'react';
import './Wishlist.scss';
import { deleteWishlistItem, selectWishlist } from '../../../../Redux/wishlistSlice';
import { selectCart, updateCart } from '../../../../Redux/cartSlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlist = useSelector(selectWishlist);
  const cart = useSelector(selectCart);

  const moveToCart = (product) => {
    dispatch(deleteWishlistItem(wishlist._id, product._id));
    dispatch(updateCart(cart._id, product, 1));
  };

  if (wishlist.wishlist) {
    let wishlistTotal = 0;
    let numOfItems = 0;
    wishlist.wishlist.map((x) => {
      wishlistTotal += x.price * x.quantity;
      numOfItems += x.quantity;
    });

    return (
      <div className='Wishlist'>
        <div className='ShoppingCart'>
          <div className='HeaderLine'>
            <h1>Shopping Wishlist</h1>
            <div className='SecondLine'>
              <p className='BlueText'>Deselect all items</p>
              <p>Price</p>
            </div>
          </div>
          <div className='Line' />

          {wishlist.wishlist.map((product, i) => {
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
                    <p
                      className='BlueText'
                      onClick={() => dispatch(deleteWishlistItem(wishlist._id, product._id))}
                    >
                      Delete
                    </p>
                    <div className='VLine' />
                    <p className='BlueText' onClick={() => moveToCart(product)}>
                      Move to Cart
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

export default Wishlist;
