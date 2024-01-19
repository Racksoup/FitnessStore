import React, { useEffect } from 'react';
import './UserDashboard.scss';
import { logout, selectUser } from '../../../Redux/userSlice';
import { checkSub, selectSubscribed, subToNewsletter, unsub } from '../../../Redux/mailSlice';
import Car from '../../../images/car.jpg';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const UserDashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const subscribed = useSelector(selectSubscribed);

  useEffect(() => {
    if (user) {
      dispatch(checkSub(user.email));
    }
  }, [user]);

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
        <Link className='Link' to='/wishlist'>
          <div className='Item'>
            <img src={Car} alt='Img' />
            <div className='Info'>
              <h4>Wishlist</h4>
              <p>Update Wishlist</p>
            </div>
          </div>
        </Link>
        {/* <div className='Item'>
          <img src={Car} alt='Img' />
          <div className='Info'>
            <h4>Gift Cards</h4>
            <p>View balance or redeem a card</p>
          </div>
        </div> */}
        <Link className='Link' to='/security'>
          <div className='Item'>
            <img src={Car} alt='Img' />
            <div className='Info'>
              <h4>Login & Security</h4>
              <p>Edit info, change password</p>
            </div>
          </div>
        </Link>
        <Link className='Link' to='/address'>
          <div className='Item'>
            <img src={Car} alt='Img' />
            <div className='Info'>
              <h4>Address</h4>
              <p>Edit delivery address</p>
            </div>
          </div>
        </Link>
        <div className='ItemBox'>
          {subscribed ? (
            <button className='red' onClick={() => dispatch(unsub(user.email))}>
              Un-subscribe from Newsletter
            </button>
          ) : (
            <button
              className='green'
              onClick={() => dispatch(subToNewsletter(user.email, 'This-Is-A-Test'))}
            >
              Subscribe to Newsletter
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
