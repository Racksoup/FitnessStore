import React, { useState } from 'react';
import './Security.scss';
import { changeUserPassword } from '../../../../Redux/userSlice.js';

import { useDispatch } from 'react-redux';

const Security = () => {
  const dispatch = useDispatch();
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [dubPassword, setDubPassword] = useState('');

  const submit = () => {
    dispatch(changeUserPassword(newPassword, oldPassword));
  };

  return (
    <div className='Security'>
      <h2>Security</h2>
      {/* <div className="Line">
      <p>Old Password<:/p>
      <input type="text" onChange={(e) => setOldPassword(e.target.value)}/>
    </div> */}
      <div className='Line'>
        <p>New Password:</p>
        <input type='text' onChange={(e) => setNewPassword(e.target.value)} />
      </div>
      {/* <div className="Line">
      <p>Re-Enter Password:</p>
      <input type="text" onChange={(e) => setDubPassword(e.target.value)}/>
    </div> */}

      <button onClick={() => submit()}>Change Password</button>
    </div>
  );
};

export default Security;
