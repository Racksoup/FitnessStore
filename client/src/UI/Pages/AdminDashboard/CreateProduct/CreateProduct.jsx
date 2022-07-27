import React, { useState } from 'react';
import './CreateProduct.scss';
import { createProduct } from '../../../../Redux/productSlice';
import { selectCategories } from '../../../../Redux/categorySlice';

import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faPlus } from '@fortawesome/free-solid-svg-icons';

const CreateProduct = () => {
  const categories = useSelector(selectCategories);
  const [showCategories, setShowCategories] = useState(false);
  const [file, setFile] = useState('');
  const [files, setFiles] = useState([]);
  const [product, setProduct] = useState({
    name: '',
    category: '',
    price: '',
    highlight: false,
    details: [{ key: '', value: '' }],
    tech_details: [{ key: '', value: '' }],
    about: [''],
  });
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct(product, file, files));
  };

  const addInputRow = (e, objName) => {
    e.preventDefault();
    setProduct({ ...product, [objName]: [...product[objName], { key: '', value: '' }] });
  };

  const deleteInputRow = (e, i, objName) => {
    e.preventDefault();
    setProduct({ ...product, [objName]: [...product[objName].filter((d, j) => j !== i)] });
  };

  const keyChange = (e, i, objName) => {
    let newArr = [...product[objName]];
    newArr[i]['key'] = e.target.value;
    setProduct({ ...product, [objName]: newArr });
  };

  const valueChange = (e, i, objName) => {
    let newArr = [...product[objName]];
    newArr[i]['value'] = e.target.value;
    setProduct({ ...product, [objName]: newArr });
  };

  const aboutChange = (e, i) => {
    let newArr = [...product.about];
    newArr[i] = e.target.value;
    setProduct({ ...product, about: newArr });
  };

  const addAboutRow = (e) => {
    e.preventDefault();
    setProduct({ ...product, about: [...product.about, ''] });
  };

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
        <div
          className='MainInput'
          onMouseEnter={() => setShowCategories(true)}
          onMouseLeave={() => setShowCategories(false)}
        >
          {showCategories && (
            <div className='Categories'>
              {categories.map((cat, i) => (
                <div
                  className='Category'
                  key={i}
                  onClick={() => setProduct({ ...product, category: cat.category })}
                >
                  {cat.category}
                </div>
              ))}
            </div>
          )}
          <p className='CategoryDisplay'>{product.category}</p>
        </div>
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
        <label>Highlight</label>
        <div className='CheckboxHolder'>
          <input
            className='Checkbox'
            type='checkbox'
            checked={product.highlight}
            onChange={() => setProduct({ ...product, highlight: !product.highlight })}
          />
        </div>
      </div>
      <div className='Row'>
        <label>Details</label>
        <button className='Btn' onClick={(e) => addInputRow(e, 'details')}>
          <FontAwesomeIcon icon={faPlus} className='Icon' />
        </button>
        <div className='MultiInputWidget'>
          {product.details.map((detail, i) => {
            return (
              <div className='SingleRow' key={i}>
                <button className='Btn' onClick={(e) => deleteInputRow(e, i, 'details')}>
                  <FontAwesomeIcon icon={faX} className='Icon' />
                </button>
                <div className='Inputs'>
                  <input
                    className='KeyInput'
                    type='text'
                    onChange={(e) => keyChange(e, i, 'details')}
                    value={detail.key}
                  />
                  <input
                    className='ValueInput'
                    type='text'
                    onChange={(e) => valueChange(e, i, 'details')}
                    value={detail.value}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className='Row'>
        <label>Technical Details</label>
        <button className='Btn' onClick={(e) => addInputRow(e, 'tech_details')}>
          <FontAwesomeIcon icon={faPlus} className='Icon' />
        </button>
        <div className='MultiInputWidget'>
          {product.tech_details.map((tech_details, i) => {
            return (
              <div className='SingleRow' key={i}>
                <button className='Btn' onClick={(e) => deleteInputRow(e, i, 'tech_details')}>
                  <FontAwesomeIcon icon={faX} className='Icon' />
                </button>
                <div className='Inputs'>
                  <input
                    className='KeyInput'
                    type='text'
                    onChange={(e) => keyChange(e, i, 'tech_details')}
                    value={tech_details.key}
                  />
                  <input
                    className='ValueInput'
                    type='text'
                    onChange={(e) => valueChange(e, i, 'tech_details')}
                    value={tech_details.value}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className='Row'>
        <label>About</label>
        <button className='Btn' onClick={(e) => addAboutRow(e)}>
          <FontAwesomeIcon icon={faPlus} className='Icon' />
        </button>
        <div className='MultiInputWidget'>
          {product.about.map((item, i) => {
            return (
              <div className='SingleRow' key={i}>
                <button className='Btn' onClick={(e) => deleteInputRow(e, i, 'about')}>
                  <FontAwesomeIcon icon={faX} className='Icon' />
                </button>
                <input
                  className='AboutInput'
                  type='text'
                  onChange={(e) => aboutChange(e, i)}
                  value={item.value}
                />
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
