import React, { useState } from 'react';
import './CreateModal.scss';

import { useDispatch } from 'react-redux';

const CreateFileModal = ({ toggleModal, func, title }) => {
  const [file, setFile] = useState('');
  const dispatch = useDispatch();

  const submitForm = (e) => {
    console.log(file);
    e.stopPropagation();
    e.preventDefault();
    dispatch(func(file));
    toggleModal(false);
  };

  return (
    <div className='CreateModal' onClick={() => toggleModal(false)}>
      <div className='Modal' onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        <form onSubmit={(e) => submitForm(e)}>
          <div className='Row'>
            <label>Image :</label>
            <input type='file' onChange={(e) => setFile(e.target.files[0])} />
          </div>
          <input type='submit' value='Submit' className='Btn-1' />
        </form>
      </div>
    </div>
  );
};

export default CreateFileModal;
