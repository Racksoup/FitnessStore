import React, { useState } from 'react';
import './UserLogin.scss';
import { login, selectIsAuthenticated, selectLoading } from '../../../Redux/userSlice';

import { useSelector, useDispatch } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';

const AdminLogin = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const submitForm = (e) => {
    e.preventDefault();
    dispatch(login(form));
  };

  if (isAuthenticated) {
    return <Navigate to='/user-dashboard' />;
  }

  return (
    <div className='UserLogin'>
      <h1 className='Title'>Login</h1>
      <form className='Form' onSubmit={(e) => submitForm(e)}>
        <label htmlFor='' className='Label'>
          Username or Email
        </label>
        <input
          type='text'
          className='Input'
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <label htmlFor='' className='Label'>
          Password
        </label>
        <input
          type='password'
          className='Input'
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <input type='submit' className='Btn' />
      </form>
      <Link to='/create-user' className='Link'>
        <button className='CreateUserLink'>Create Account</button>
      </Link>
    </div>
  );
};

export default AdminLogin;
