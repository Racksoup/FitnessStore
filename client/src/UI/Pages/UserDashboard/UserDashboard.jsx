import React from 'react';
import './UserDashboard.scss';
import { logout } from '../../../Redux/userSlice';
import Car from '../../../images/car.jpg';

import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const UserDashboard = () => {
  const dispatch = useDispatch();

  return (
    <div className='UserDashboard'>
      <div className='HeaderLine'>
        <h1 className='MainTitle'>Your Account</h1>
        <Link className='Link' to='/'>
          <button className='Btn' onClick={() => dispatch(logout())}>
            Logout
          </button>
        </Link>
      </div>
      <div className='Grid'>
        <Link className='Link' to='/orders'>
          <div className='Item'>
            <img src={Car} alt='Img' />
            <div className='Info'>
              <h4>Your Orders</h4>
              <p>Track, return, or buy something again</p>
            </div>
          </div>
        </Link>
        <Link className='Link' to='/cart'>
          <div className='Item'>
            <img src={Car} alt='Img' />
            <div className='Info'>
              <h4>Cart</h4>
              <p>Go to Cart, Checkout</p>
            </div>
          </div>
        </Link>
        <div className='Item'>
          <img src={Car} alt='Img' />
          <div className='Info'>
            <h4>Wishlist</h4>
            <p>Update Wishlist</p>
          </div>
        </div>
        <div className='Item'>
          <img src={Car} alt='Img' />
          <div className='Info'>
            <h4>Your Payments</h4>
            <p>Manage payment methods and settings, view all transactions</p>
          </div>
        </div>
        <div className='Item'>
          <img src={Car} alt='Img' />
          <div className='Info'>
            <h4>Gift Cards</h4>
            <p>View balance or redeem a card</p>
          </div>
        </div>
        <div className='Item'>
          <img src={Car} alt='Img' />
          <div className='Info'>
            <h4>Email Alerts</h4>
            <p>Change email notifications and subscriptions</p>
          </div>
        </div>
        <div className='Item'>
          <img src={Car} alt='Img' />
          <div className='Info'>
            <h4>Login & Security</h4>
            <p>Edit login, name, and cell phone number</p>
          </div>
        </div>
        <div className='Item'>
          <img src={Car} alt='Img' />
          <div className='Info'>
            <h4>Delivery Address</h4>
            <p>Edit addresses for orders and gifts</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
