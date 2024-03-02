import React, { useState, useEffect } from 'react';
import './Returns.scss';

import { useSelector, useDispatch } from 'react-redux';
import { selectRefunds, getAllRefunds } from '../../../../Redux/refundSlice';

const Returns = () => {
  const dispatch = useDispatch();
  const refunds = useSelector(selectRefunds)

  useEffect(() => {
    dispatch(getAllRefunds())
  }, [])

  console.log(refunds);

  return <div className='Admin-Returns'>
    <h2>Returns</h2>
    <div className="content">
      {refunds && refunds.map((x) => (
        <div className='item'>
          <p className='amount'>{x.refund.amount}</p>
          <p className='date'>{x.refund.date}</p>
          <p className='isRefunded'>{x.refund.isRefunded}</p>
          <p className='itemsReturned'>{x.refund.itemsReturned}</p>
        </div>
      ))}
    </div>
  </div>;
};

export default Returns;
