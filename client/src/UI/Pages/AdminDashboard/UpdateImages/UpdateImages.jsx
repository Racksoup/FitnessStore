import React, { useState, useEffect } from 'react';
import './UpdateImages.scss';
import {
  createHeaderImage,
  deleteHeaderImage,
  getHeaderImages,
  selectHeaderImages,
} from '../../../../Redux/headerImageSlice';
import {
  createSaleImage,
  deleteSaleImage,
  getSaleImages,
  selectSaleImages,
} from '../../../../Redux/saleImageSlice';
import CreateFileModal from '../../../Components/Modals/CreateFileModal.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';

const UpdateImages = () => {
  const dispatch = useDispatch();
  const [createHeaderImgModal, toggleCreateHeaderImgModal] = useState(false);
  const [createSaleImgModal, toggleCreateSaleImgModal] = useState(false);
  const headerImages = useSelector(selectHeaderImages);
  const saleImages = useSelector(selectSaleImages);

  useEffect(() => {
    dispatch(getSaleImages());
    dispatch(getHeaderImages());
  }, []);

  return (
    <div className='UpdateImages'>
      {createHeaderImgModal && (
        <CreateFileModal
          toggleModal={toggleCreateHeaderImgModal}
          func={createHeaderImage}
          title='Create Header Image'
        />
      )}
      {createSaleImgModal && (
        <CreateFileModal
          toggleModal={toggleCreateSaleImgModal}
          func={createSaleImage}
          title='Create Sale Image'
        />
      )}
      <div className='Half'>
        <h2>Update Header Images</h2>
        <button className='Btn-1' onClick={() => toggleCreateHeaderImgModal(true)}>
          Create Header Image
        </button>
        <div className='ViewImages'>
          {headerImages &&
            headerImages.map((img, i) => (
              <div className='ImageBox' key={i}>
                <button className='Btn-3' onClick={() => dispatch(deleteHeaderImage(img.filename))}>
                  <FontAwesomeIcon icon={faX} />
                </button>
                <img src={`api/header-images/${img.filename}`} alt='Header Image' />
              </div>
            ))}
        </div>
      </div>
      <div className='Half'>
        <h2>Update Sale Images</h2>
        <button className='Btn-1' onClick={() => toggleCreateSaleImgModal(true)}>
          Create Sale Image
        </button>
        <div className='ViewImages'>
          {saleImages &&
            saleImages.map((img, i) => (
              <div className='ImageBox' key={i}>
                <button className='Btn-3' onClick={() => dispatch(deleteSaleImage(img.filename))}>
                  <FontAwesomeIcon icon={faX} />
                </button>
                <img src={`api/sale-images/${img.filename}`} alt='Sale Image' />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default UpdateImages;
