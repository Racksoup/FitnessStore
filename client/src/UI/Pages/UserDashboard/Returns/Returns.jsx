import React, { useState, useEffect } from 'react';
import './Returns.scss';

import { useDispatch, useSelector } from 'react-redux';
import { selectCustomerOrder } from '../../../../Redux/orderSlice';
import { getCustomerRefund, selectRefund, createCustomerRefund } from '../../../../Redux/refundSlice';
import { selectUser } from '../../../../Redux/userSlice';

const Returns = () => {
  const dispatch = useDispatch()
  const order = useSelector(selectCustomerOrder);
  const refund = useSelector(selectRefund);
  const user = useSelector(selectUser);
  const [returnItems, setReturnItems] = useState([]);
  const [modal, toggleModal] = useState(false);
  const [reason, setReason] = useState('')

  useEffect(() => {
    order && dispatch(getCustomerRefund(order._id))
  }, [order])

  const checked = (e, v) => {
    if (e.target.checked) {
      setReturnItems([...returnItems, v]);
    } else {
      setReturnItems(returnItems.filter((item) => item !== v));
    }
  };

  if (refund) return (
    <div>REfUnDeD ALLREADY!</div>
  )

  const sendRefund = () => {
    dispatch(createCustomerRefund(returnItems, user._id, order.invoice, reason))
  }

  return (
    <div className='Returns'>
      {modal && <Modal modal={modal} toggleModal={toggleModal} reason={reason} setReason={setReason}/>}
      <div className='Top'>
        <p>Select All</p>
        <h3>Return</h3>
        <button onClick={() => toggleModal(true)}>Request Return</button>
      </div>
      {order &&
        order.invoice.lines.data.map((v, i) => {
          return (
            <div className='Row'>
              <input type='checkbox' onClick={(e) => checked(e, v)} />
              <p>{v.description}</p>
              <p className='Amount'>{v.amount}</p>
            </div>
          );
        })}
    </div>
  );
};

const Modal = ({modal, toggleModal, reason, setReason}) => {
  return (
    <div className='modal-bg' onClick={() => toggleModal(false)}>
      <div className='modal' onClick={(e) => e.preventDefault()}>
        <input type="text" value={reason} onChange={(e) => setReason(e.target.value)}/>
      </div>
    </div>
  )
}

export default Returns;
