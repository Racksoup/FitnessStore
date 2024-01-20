import React from 'react';
import './Returns.scss';

import { useSelector } from 'react-redux';
import { selectCustomerOrder } from '../../../../Redux/orderSlice';

const Returns = () => {
  const order = useSelector(selectCustomerOrder);
  console.log(order);

  return (
    <div className='Returns'>
      <div className='Top'>
        <p>Select All</p>
        <h3>Return</h3>
        <button>Request Return</button>
      </div>
      {order &&
        order.invoice.lines.data.map((v, i) => {
          return (
            <div className='Row'>
              <checkbox></checkbox>
              <div className='Info'>
                <p>{v.description}</p>
                <p>{v.amount}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Returns;
