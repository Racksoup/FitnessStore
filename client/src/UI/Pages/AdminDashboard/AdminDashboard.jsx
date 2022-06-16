import React, { useState, useEffect } from 'react';
import './AdminDashboard.scss';
import { selectIsAuthenticated, logout, loadAdmin } from '../../../Redux/adminSlice';
import CreateProduct from './CreateProduct/CreateProduct.jsx';
import ViewProducts from './ViewProducts/ViewProducts';
import UpdateCategories from './UpdateCategories/UpdateCategories';

import { useSelector, useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [view, setView] = useState('createProduct');
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAdmin());
  }, []);

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
            View Products
          </div>
        ) : (
          <div className='SelectedItem'>View Products</div>
        )}
        {view !== 'updateCategories' ? (
          <div className='Item' onClick={() => setView('updateCategories')}>
            Update Categories
          </div>
        ) : (
          <div className='SelectedItem'>Update Categories</div>
        )}
      </div>
      {view === 'createProduct' && <CreateProduct />}
      {view === 'viewProducts' && <ViewProducts />}
      {view === 'updateCategories' && <UpdateCategories />}
    </div>
  );
};

export default AdminDashboard;
