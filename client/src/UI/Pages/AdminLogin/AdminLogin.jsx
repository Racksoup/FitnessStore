import React, { useState } from 'react';
import './AdminLogin.scss';
import { login, selectIsAuthenticated, selectLoading } from '../../../Redux/adminSlice';

import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

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
    return <Navigate to='/admin-dashboard' />;
  }

  return (
    <div className='AdminLogin'>
      <h1 className='Title'>AdminLogin</h1>
      <form className='Form' onSubmit={(e) => submitForm(e)}>
        <label htmlFor='' className='Label'>
          Username
        </label>
        <input
          type='text'
          className='Input'
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          tabIndex='1'
        />
        <label htmlFor='' className='Label'>
          Password
        </label>
        <input
          type='password'
          className='Input'
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          tabIndex='2'
        />
        <input type='submit' className='Btn' />
      </form>
    </div>
  );
};

export default AdminLogin;
