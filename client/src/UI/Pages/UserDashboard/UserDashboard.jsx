import React from 'react';
import './UserDashboard.scss';
import { logout } from '../../../Redux/userSlice';

import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const UserDashboard = () => {
  const dispatch = useDispatch();

  return (
    <div className='UserDashboard'>
      <Link className='Link' to='/'>
        <button className='Btn' onClick={() => dispatch(logout())}>
          Logout
        </button>
      </Link>
    </div>
  );
};

export default UserDashboard;
