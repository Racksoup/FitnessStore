import React, { useState, useEffect } from 'react';
import UpdateProduct from '../UpdateProduct/UpdateProduct.jsx';
import { getAllProducts, selectProducts, removeProduct } from '../../../../Redux/productSlice';
import './ViewProducts.scss';

import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

const ViewProducts = () => {
  const [updateModal, toggleUpdateModal] = useState(false);
  const [currProduct, setCurrProduct] = useState(null);
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();

  const updateClicked = (product) => {
    setCurrProduct(product);
    toggleUpdateModal(true);
  };

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  return (
    <div className='ViewProducts'>
      {updateModal && <UpdateProduct toggleModal={toggleUpdateModal} currProduct={currProduct} />}
      {products &&
        products.map((v, i) => (
          <div className='Product' key={i}>
            <img src={`/api/product/primary-image/${v.image_filename}`} alt='Product Image' />
            <div className='Info'>
              <p className='InfoItem'>Name: {v.name}</p>
              <p className='InfoItem'>Category: {v.category}</p>
              <p className='InfoItem'>Price: {v.price}</p>
              <p className='InfoItem'>Description: {v.description}</p>
            </div>
            <div className='Btns'>
              <button className='Btn-1' onClick={() => updateClicked(v)}>
                Update
              </button>
              <button className='Btn-2' onClick={() => dispatch(removeProduct(v._id))}>
                <FontAwesomeIcon icon={faX} className='Icon' />
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ViewProducts;
