import React, { useState } from 'react';
import './UpdateProduct.scss';
import productSlice, { updateProduct } from '../../../../Redux/productSlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';

const UpdateProduct = ({ toggleModal, currProduct }) => {
  const [file, setFile] = useState('');
  const [files, setFiles] = useState([]);
  const [product, setProduct] = useState(currProduct);
  const [newMain, setNewMain] = useState('');
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct(product, file, files));
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

  const setMainImage = (e) => {
    setNewMain(e.target.name);

    setProduct(() => ({
      ...product,
      image_filenames: [
        ...product.image_filenames.map((x) => {
          if (x.filename === e.target.name) {
            let f = { filename: x.filename, main: !x.main };
            return f;
          } else {
            let f = { filename: x.filename, main: false };
            return f;
          }
        }),
      ],
    }));
  };

  return (
    <div className='UpdateProduct'>
      <div className='Content' onClick={(e) => e.stopPropagation()}>
        <button className='Btn-2 CloseBtn' onClick={() => toggleModal(false)}>
          <FontAwesomeIcon icon={faX} className='Icon' />
        </button>
        <h2 className='Title'>Update Product</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className='Row'>
            <label>Name</label>
            <input
              className='MainInput'
              type='text'
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              value={product.name}
            />
          </div>
          <div className='Row'>
            <label>Category</label>
            <input
              className='MainInput'
              type='text'
              onChange={(e) => setProduct({ ...product, category: e.target.value })}
              value={product.category}
            />
          </div>
          <div className='Row'>
            <label>Price</label>
            <input
              className='MainInput'
              type='number'
              onChange={(e) => setProduct({ ...product, price: e.target.value })}
              value={product.price}
            />
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
                      value={item}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* <div className='Row'>
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
          </div> */}

          <div>
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

          <div className='Row'>
            <div className='ImagesRow'>
              {product.image_filenames.map((item, i) => {
                return (
                  <div className='ImageBox' key={i}>
                    <div className='Top'>
                      <FontAwesomeIcon icon={faX} className='Icon' />
                      <input
                        type='checkbox'
                        className='Input'
                        checked={item.main}
                        onChange={(e) => setMainImage(e)}
                        name={item.filename}
                      />
                    </div>
                    <img src={`api/product/image/${item.filename}`} alt='image' className='Image' />
                    <p className='Text'>{item.filename}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <input type='submit' className='Btn' />
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
