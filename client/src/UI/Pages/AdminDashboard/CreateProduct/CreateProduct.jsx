import React, { useState } from 'react';
import './CreateProduct.scss';
import { createProduct } from '../../../../Redux/productSlice';

import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

const CreateProduct = () => {
  const [file, setFile] = useState('');
  const [files, setFiles] = useState([]);
  const [product, setProduct] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    details: {},
  });
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct(product, file, files));
  };

  return (
    <form className='CreateProduct' onSubmit={(e) => onSubmit(e)}>
      <div className='Row'>
        <label>Name</label>
        <input type='text' onChange={(e) => setProduct({ ...product, name: e.target.value })} />
      </div>
      <div className='Row'>
        <label>Category</label>
        <input type='text' onChange={(e) => setProduct({ ...product, category: e.target.value })} />
      </div>
      <div className='Row'>
        <label>Description</label>
        <input
          type='text'
          onChange={(e) => setProduct({ ...product, description: e.target.value })}
        />
      </div>
      <div className='Row'>
        <label>Price</label>
        <input type='number' onChange={(e) => setProduct({ ...product, price: e.target.value })} />
      </div>
      <div className='Row'>
        <label>Main Image</label>
        <input type='file' onChange={(e) => setFile(e.target.files[0])} />
      </div>
      <div className='Row'>
        <label>Extra Images</label>
        <div className='ExtraImagesBox'>
          <input type='file' onChange={(e) => setFiles([...files, e.target.files[0]])} />
          {files.map((item, i) => {
            return (
              <div className='ExtraImage' key={i}>
                <FontAwesomeIcon
                  icon={faX}
                  className='Icon'
                  onClick={() => setFiles(files.filter((x) => x.name !== item.name))}
                />
                <p>{item.name}</p>
              </div>
            );
          })}
        </div>
      </div>

      <input type='submit' className='Btn' />
    </form>
  );
};

export default CreateProduct;
