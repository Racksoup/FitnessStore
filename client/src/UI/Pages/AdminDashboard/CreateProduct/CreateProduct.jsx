import React, { useState } from 'react';
import './CreateProduct.scss';
import { createProduct } from '../../../../Redux/productSlice';

import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faPlus } from '@fortawesome/free-solid-svg-icons';

const CreateProduct = () => {
  const [file, setFile] = useState('');
  const [files, setFiles] = useState([]);
  const [details, setDetails] = useState([{ key: '', value: '' }]);
  const [product, setProduct] = useState({
    name: '',
    category: '',
    price: '',
    details: [],
    tech_details: [],
    about: [],
  });
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct(product, file, files));
  };

  const addDetailClicked = (e) => {
    e.preventDefault();
    setDetails([...details, { key: '', value: '' }]);
  };

  const deleteDetailClicked = (e, i) => {
    e.preventDefault();
    setDetails([...details.filter((d, j) => j !== i)]);
  };

  const keyChange = (e, i) => {
    let newArr = [...details];
    newArr[i]['key'] = e.target.value;
    setDetails(newArr);
  };

  const valueChange = (e, i) => {
    let newArr = [...details];
    newArr[i]['value'] = e.target.value;
    setDetails(newArr);
  };

  console.log(details);

  return (
    <form className='CreateProduct' onSubmit={(e) => onSubmit(e)}>
      <div className='Row'>
        <label>Name</label>
        <input
          className='MainInput'
          type='text'
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
        />
      </div>
      <div className='Row'>
        <label>Category</label>
        <input
          className='MainInput'
          type='text'
          onChange={(e) => setProduct({ ...product, category: e.target.value })}
        />
      </div>
      <div className='Row'>
        <label>Price</label>
        <input
          className='MainInput'
          type='number'
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
        />
      </div>
      <div className='Row'>
        <label>Details</label>
        <button className='Btn' onClick={(e) => addDetailClicked(e)}>
          <FontAwesomeIcon icon={faPlus} className='Icon' />
        </button>
        <div className='DetailsInput'>
          {details.map((detail, i) => {
            return (
              <div className='DetailsRow' key={i}>
                <button className='Btn' onClick={(e) => deleteDetailClicked(e, i)}>
                  <FontAwesomeIcon icon={faX} className='Icon' />
                </button>
                <div className='InputGroup'>
                  <input
                    className='KeyInput'
                    type='text'
                    onChange={(e) => keyChange(e, i)}
                    value={detail.key}
                  />
                  <input
                    className='ValueInput'
                    type='text'
                    onChange={(e) => valueChange(e, i)}
                    value={detail.value}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className='Row'>
        <label>Main Image</label>
        <input className='MainInput' type='file' onChange={(e) => setFile(e.target.files[0])} />
      </div>
      <div className='Row'>
        <label>Extra Images</label>
        <div className='ExtraImagesBox'>
          <input
            className='MainInput'
            type='file'
            onChange={(e) => setFiles([...files, e.target.files[0]])}
          />
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
