import React, { useState, useEffect } from 'react';
import './AdminDashboard.scss';
import { selectIsAuthenticated, logout, loadAdmin } from '../../../Redux/adminSlice';
import {
  getCategories,
  deleteCategory,
  createCategory,
  selectCategories,
} from '../../../Redux/categorySlice';
import CreateProduct from './CreateProduct/CreateProduct.jsx';
import ViewProducts from './ViewProducts/ViewProducts';
import CreateModal from '../../Components/Modals/CreateModal.jsx';

import { useSelector, useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

const AdminDashboard = () => {
  const [view, setView] = useState('createProduct');
  const [createCategoryModal, toggleCreateCategoryModal] = useState(false);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const categories = useSelector(selectCategories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAdmin());
    dispatch(getCategories());
  }, []);

  if (!isAuthenticated) {
    return <Navigate to='/admin-login' />;
  }

  return (
    <div className='AdminDashboard'>
      {createCategoryModal && (
        <CreateModal
          toggleModal={toggleCreateCategoryModal}
          func={createCategory}
          state={{ category: '' }}
          title='Create Category'
        />
      )}
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
      {view === 'updateCategories' && (
        <div className='UpdateCategories'>
          <button className='Btn-1' onClick={() => toggleCreateCategoryModal(true)}>
            Create Category
          </button>
          <div className='CategoriesView'>
            {categories &&
              categories.map((cat, i) => {
                return (
                  <div className='Category' key={i}>
                    <p>{cat.category}</p>
                    <FontAwesomeIcon
                      icon={faX}
                      className='Btn-3 Icon'
                      onClick={() => dispatch(deleteCategory(cat._id))}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
