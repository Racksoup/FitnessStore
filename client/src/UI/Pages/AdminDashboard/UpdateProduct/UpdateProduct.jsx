import React, { useState, useEffect } from 'react';
import './UpdateProduct.scss';
import {
  updateProduct,
  getExtraProductImagesData,
  createExtraProductImage,
  deleteExtraProductImage,
  selectExtraProductImages,
} from '../../../../Redux/productSlice';

import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';

const UpdateProduct = ({ toggleModal, currProduct }) => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState(currProduct);
  const [file, setFile] = useState('');
  const [files, setFiles] = useState([]);
  const productImagesData = useSelector(selectExtraProductImages);

  useEffect(() => {
    dispatch(getExtraProductImagesData(currProduct._id));
  }, []);

  useEffect(() => {
    if (productImagesData !== null) {
      setFiles(productImagesData);
    }
  }, [productImagesData]);

  const submitClicked = (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(updateProduct(product, file));
  };

  const removeClicked = (item) => {
    setFiles(files.filter((x) => x.name !== item.name));
    dispatch(deleteExtraProductImage(item.filename));
  };

  const extraImageUploaded = (e) => {
    setFiles([...files, e.target.files[0]]);
    dispatch(createExtraProductImage(e.target.files[0], e.target.files[0].name, product._id));
  };

  return (
    <div className='UpdateProduct'>
      <div className='Content' onClick={(e) => e.stopPropagation()}>
        <button className='Btn-2' onClick={() => toggleModal(false)}>
          <FontAwesomeIcon icon={faX} className='Icon' />
        </button>
        <h2 className='Title'>Update Product</h2>
        <form onSubmit={(e) => submitClicked(e)}>
          <div className='Row'>
            <label>Name</label>
            <input
              type='text'
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              value={product.name}
            />
          </div>
          <div className='Row'>
            <label>Category</label>
            <input
              type='text'
              onChange={(e) => setProduct({ ...product, category: e.target.value })}
              value={product.category}
            />
          </div>
          <div className='Row'>
            <label>Description</label>
            <input
              type='text'
              onChange={(e) => setProduct({ ...product, description: e.target.value })}
              value={product.description}
            />
          </div>
          <div className='Row'>
            <label>Price</label>
            <input
              type='number'
              onChange={(e) => setProduct({ ...product, price: e.target.value })}
              value={product.price}
            />
          </div>
          <div className='Row'>
            <label>Main Image</label>
            <input type='file' onChange={(e) => setFile(e.target.files[0])} />
          </div>
          <div className='Row'>
            <label>Extra Images</label>
            <div className='ExtraImagesBox'>
              <input type='file' onChange={(e) => extraImageUploaded(e)} />
              {files.map((item, i) => {
                return (
                  <div className='ExtraImage' key={i}>
                    <FontAwesomeIcon
                      icon={faX}
                      className='Icon'
                      onClick={() => removeClicked(item)}
                    />
                    <img src={`/api/product/extra-image/${item.filename}`} alt='Extra Image' />
                  </div>
                );
              })}
            </div>
          </div>
          <input type='submit' className='Btn-1' value='Submit' />
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
