import React, { useState } from 'react';
import './CreateModal.scss';

import { useDispatch } from 'react-redux';

const CreateModal = ({ toggleModal, func, state, title }) => {
  const [currState, setCurrState] = useState(state);
  const dispatch = useDispatch();

  const submitForm = (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(func(currState));
    toggleModal(false);
  };

  return (
    <div className='CreateModal' onClick={() => toggleModal(false)}>
      <div className='Modal' onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        <form onSubmit={(e) => submitForm(e)}>
          {Object.entries(currState).map(([k, v], i) => {
            if (k !== 'main' && k !== 'mainID') {
              return (
                <div className='Row' key={i}>
                  <label>{k}:</label>
                  <input
                    type='text'
                    name={k}
                    onChange={(e) =>
                      setCurrState({ ...currState, [e.target.name]: e.target.value })
                    }
                    value={v}
                  />
                </div>
              );
            }
          })}
          <input type='submit' value='Submit' className='Btn-1' />
        </form>
      </div>
    </div>
  );
};

export default CreateModal;
