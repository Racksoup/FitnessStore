import React, { useState } from 'react';
import './AdminDashboard.scss';
import { selectIsAuthenticated, logout } from '../../../Redux/adminSlice';

import { useSelector, useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [view, setView] = useState('createProduct');
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();

  if (!isAuthenticated) {
    return <Navigate to='/admin-login' />;
  }

  return (
    <div className='AdminDashboard'>
      <div className='PageHeader'>
        <Link className='Link' to='/'>
          <button className='Btn'>Home</button>
        </Link>
        <h1 className='Title'>Admin Dashboard</h1>
        <Link className='Link' to='/admin-login'>
          <button className='Btn' onClick={() => logout()}>
            Logout
          </button>
        </Link>
      </div>
      <div className='PageNav'>
        {view !== 'createProduct' ? (
          <div className='Item' onClick={() => setView('createProduct')}>
            Create Product
          </div>
        ) : (
          <div className='SelectedItem'>Create Product</div>
        )}
        {view !== 'viewProducts' ? (
          <div className='Item' onClick={() => setView('viewProducts')}>
            View Product
          </div>
        ) : (
          <div className='SelectedItem'>View Products</div>
        )}
      </div>
      {view === 'createProduct' && (
        <div className='CreateProduct'>
          <div className='Row'>
            <label>Name</label>
            <input type='text' />
          </div>
          <div className='Row'>
            <label>Category</label>
            <input type='text' />
          </div>
          <div className='Row'>
            <label>Description</label>
            <input type='text' />
          </div>
          <div className='Row'>
            <label>Price</label>
            <input type='text' />
          </div>
          <div className='Row'>
            <label>Image</label>
            <input type='file' />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
