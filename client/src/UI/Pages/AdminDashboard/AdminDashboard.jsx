import React, { useState, useEffect } from 'react';
import './AdminDashboard.scss';
import { selectIsAuthenticated, logout, loadAdmin } from '../../../Redux/adminSlice';
import CreateProduct from './CreateProduct/CreateProduct.jsx';
import ViewProducts from './ViewProducts/ViewProducts';
import UpdateCategories from './UpdateCategories/UpdateCategories';
import CreateFileModal from '../../Components/Modals/CreateFileModal';

import { useSelector, useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';

import {
  createHeaderImage,
  deleteHeaderImage,
  getHeaderImages,
  selectHeaderImages,
} from '../../../Redux/headerImageSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

const AdminDashboard = () => {
  const [view, setView] = useState('createProduct');
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();

  const headerImages = useSelector(selectHeaderImages);
  const [createHeaderImgModal, toggleCreateHeaderImgModal] = useState(false);

  useEffect(() => {
    dispatch(loadAdmin());
    dispatch(getHeaderImages());
  }, []);

  if (!isAuthenticated) {
    return <Navigate to='/admin-login' />;
  }

  return (
    <div className='AdminDashboard'>
      {createHeaderImgModal && (
        <CreateFileModal
          toggleModal={toggleCreateHeaderImgModal}
          func={createHeaderImage}
          title='Create Header Image'
        />
      )}
      <div className='PageHeader'>
        <Link className='Link' to='/'>
          <button className='Btn'>Home</button>
        </Link>
        <h1 className='Title'>Admin Dashboard</h1>
        <Link className='Link' to='/admin-login'>
          <button className='Btn' onClick={() => dispatch(logout())}>
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
        {view !== 'updateImages' ? (
          <div className='Item' onClick={() => setView('updateImages')}>
            Update Images
          </div>
        ) : (
          <div className='SelectedItem'>Update Images</div>
        )}
      </div>
      {view === 'createProduct' && <CreateProduct />}
      {view === 'viewProducts' && <ViewProducts />}
      {view === 'updateCategories' && <UpdateCategories />}
      {view === 'updateImages' && (
        <div className='UpdateImages'>
          <div className='Half'>
            <h2>Update Header Images</h2>
            <button className='Btn-1' onClick={() => toggleCreateHeaderImgModal(true)}>
              Create Header Image
            </button>
            <div className='ViewImages'>
              {headerImages &&
                headerImages.map((img, i) => (
                  <div className='ImageBox' key={i}>
                    <button
                      className='Btn-3'
                      onClick={() => dispatch(deleteHeaderImage(img.filename))}
                    >
                      <FontAwesomeIcon icon={faX} />
                    </button>
                    <img src={`api/header-images/${img.filename}`} alt='Header Image' />
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
