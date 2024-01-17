import React, { useState } from 'react';
import './Newsletter.scss';
import { sendNewsletter } from '../../../../Redux/mailSlice';

import { useDispatch } from 'react-redux';

const Newsletter = () => {
  const dispatch = useDispatch();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [modal, setModal] = useState(false);

  const send = (e) => {
    e.preventDefault();
    dispatch(sendNewsletter(subject, message));
    setModal(true);
    setTimeout(() => {
      setModal(false);
    }, 3500);
  };

  return (
    <div className='Newsletter-Admin'>
      {modal && <h5>Newsletter Sent!</h5>}
      <h2>Newsletter</h2>
      <form>
        <div className='row'>
          <label>Subject:</label>
          <input type='text' onChange={(e) => setSubject(e.target.value)} />
        </div>
        <div className='row'>
          <label>Message:</label>
          <textarea onChange={(e) => setMessage(e.target.value)}></textarea>
        </div>
        <button onClick={(e) => send(e)}>Send Newsletter</button>
      </form>
    </div>
  );
};

export default Newsletter;
