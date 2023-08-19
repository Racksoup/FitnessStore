import React, { useState, useEffect } from 'react';
import './AdminDashboard2.scss';
import { logout, loadAdmin, selectIsAuthenticated, selectLoading } from '../../../Redux/adminSlice';
import ViewProducts from './ViewProducts/ViewProducts.jsx';
import UpdateCategories from './UpdateCategories/UpdateCategories.jsx';
import UpdateImages from './UpdateImages/UpdateImages.jsx';
import ViewOrders from './ViewOrders/ViewOrders.jsx';

import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const AdminDashboard2 = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectLoading);
  const [tab, setTab] = useState('orders');

  useEffect(() => {
    dispatch(loadAdmin());
  }, []);

  if (!isAuthenticated && !loading) {
    return <Navigate to='/admin-login' />;
  }

  return (
    <div
      className='adminDashboard2'
      onClick={() => {
        if (
          document.getElementById('check01') &&
          document.getElementById('check01').checked === true
        ) {
          document.getElementById('check01').click();
        }
      }}
    >
      <div className='sideBar'>
        <p onClick={() => setTab('home')}>Dashboard</p>
        <p onClick={() => setTab('products')}>Products</p>
        <p onClick={() => setTab('orders')}>Orders</p>
        <p onClick={() => setTab('tickets')}>Tickets / Returns</p>
        <p onClick={() => setTab('analytics')}>Analytics</p>
        <p className='grey'>Website Content</p>
        <p onClick={() => setTab('categories')} className='indent1'>
          Update Categories
        </p>
        <p onClick={() => setTab('images')} className='indent1'>
          Update Images
        </p>
        <p onClick={() => setTab('newsletter')} className='indent1'>
          Newsletter
        </p>
        <div className='bottom'>
          <Link to='/'>
            <button>Store Landing</button>
          </Link>
          <Link to='/'>
            <button onClick={() => dispatch(logout())}>Logout</button>
          </Link>
        </div>
      </div>
      <div className='content'>
        {tab == 'home' && <div>Admin Dashboard</div>}
        {tab == 'products' && <ViewProducts />}
        {tab == 'orders' && (
          <div>
            <ViewOrders />
          </div>
        )}
        {tab == 'tickets' && <div>Tickets / Returns</div>}
        {tab == 'analytics' && <div>Analytics</div>}
        {tab == 'categories' && <UpdateCategories />}
        {tab == 'images' && <UpdateImages />}
        {tab == 'newsletter' && <div>Newsletter</div>}
      </div>
    </div>
  );
};

export default AdminDashboard2;
