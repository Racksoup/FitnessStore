import React, { useState } from 'react';
import './UpdateProduct.scss';
import productSlice, { updateProduct } from '../../../../Redux/productSlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';

const UpdateProduct = ({ toggleModal, currProduct }) => {
  const [files, setFiles] = useState([]);
  const [product, setProduct] = useState(currProduct);
  const [newMain, setNewMain] = useState('');
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct(product, files, newMain));
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
    setProduct({
      ...product,
      [objName]: [
        ...product[objName].map((x, j) => {
          if (i === j) {
            let f = { key: x.key, value: x.value };
            f.key = e.target.value;
            return f;
          } else {
            return x;
          }
        }),
      ],
    });
  };

  const valueChange = (e, i, objName) => {
    setProduct({
      ...product,
      [objName]: [
        ...product[objName].map((x, j) => {
          if (i === j) {
            let f = { key: x.key, value: x.value };
            f.value = e.target.value;
            return f;
          } else {
            return x;
          }
        }),
      ],
    });
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

    setFiles([
      ...files.map((x) => {
        x.main = false;
        return x;
      }),
    ]);
  };

  const setMainImageNew = (e) => {
    setNewMain(e.target.name);

    setProduct(() => ({
      ...product,
      image_filenames: [
        ...product.image_filenames.map((x) => {
          let f = { filename: x.filename, main: false };
          return f;
        }),
      ],
    }));

    setFiles([
      ...files.map((x) => {
        if (x.file.name === e.target.name) {
          let n = { main: x.main, file: x.file };
          n.main = true;
          return n;
        } else {
          let n = { main: x.main, file: x.file };
          n.main = false;
          return n;
        }
      }),
    ]);
  };

  const fileChanged = (e) => {
    e.preventDefault();
    let x = { main: false, file: e.target.files[0] };
    setFiles([...files, x]);
  };

  const removeOGImage = (item) => {
    setProduct({
      ...product,
      image_filenames: [...product.image_filenames.filter((x) => x.filename !== item.filename)],
    });
  };

  const removeNewImage = (item) => {
    setFiles([...files.filter((x) => x.file.name !== item.file.name)]);
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

          <input type='file' onChange={(e) => fileChanged(e)} />

          <div className='Row'>
            <div className='ImagesRow'>
              {product.image_filenames.map((item, i) => {
                return (
                  <div className='ImageBox' key={i}>
                    <div className='Top'>
                      <input
                        type='checkbox'
                        className='Input'
                        checked={item.main}
                        onChange={(e) => setMainImage(e)}
                        name={item.filename}
                      />
                      <button className='Btn' onClick={() => removeOGImage(item)}>
                        <FontAwesomeIcon icon={faX} className='Icon' />
                      </button>
                    </div>
                    <img src={`api/product/image/${item.filename}`} alt='image' className='Image' />
                  </div>
                );
              })}
              {files.map((item, i) => {
                let newSrc = URL.createObjectURL(item.file);
                return (
                  <div className='ImageBox' key={i}>
                    <div className='Top'>
                      <input
                        type='checkbox'
                        className='Input'
                        checked={item.main}
                        onChange={(e) => setMainImageNew(e)}
                        name={item.file.name}
                      />
                      <button className='Btn' onClick={() => removeNewImage(item)}>
                        <FontAwesomeIcon icon={faX} className='Icon' />
                      </button>
                    </div>
                    <img src={newSrc} alt='image' className='Image' />
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
