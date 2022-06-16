import React, { useState, useEffect } from 'react';
import './AdminDashboard.scss';
import { selectIsAuthenticated, logout, loadAdmin } from '../../../Redux/adminSlice';
import CreateProduct from './CreateProduct/CreateProduct.jsx';
import UpdateProduct from './UpdateProduct/UpdateProduct.jsx';

import { useSelector, useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { getAllProducts, selectProducts, removeProduct } from '../../../Redux/productSlice';

const AdminDashboard = () => {
  const [view, setView] = useState('createProduct');
  const [updateModal, toggleUpdateModal] = useState(false);
  const [currProduct, setCurrProduct] = useState(null);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAdmin());
    dispatch(getAllProducts());
  }, []);

  const updateClicked = (product) => {
    setCurrProduct(product);
    toggleUpdateModal(true);
  };

  if (!isAuthenticated) {
    return <Navigate to='/admin-login' />;
  }

  return (
    <div className='AdminDashboard'>
      {updateModal && <UpdateProduct toggleModal={toggleUpdateModal} currProduct={currProduct} />}
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
      </div>
      {view === 'createProduct' && <CreateProduct />}
      {view === 'viewProducts' && products && (
        <div className='ViewProducts'>
          {products.map((v, i) => (
            <div className='Product' key={i}>
              <img src={`/api/product/primary-image/${v.image_filename}`} alt='Product Image' />
              <div className='Info'>
                <p className='InfoItem'>{v.name}</p>
                <p className='InfoItem'>{v.category}</p>
                <p className='InfoItem'>{v.price}</p>
                <p className='InfoItem'>{v.description}</p>
              </div>
              <div className='Btns'>
                <button className='Btn-1' onClick={() => updateClicked(v)}>
                  Update
                </button>
                <button className='Btn-2' onClick={() => dispatch(removeProduct(v._id))}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
