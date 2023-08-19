import React, { useState, useEffect } from 'react';
import './ViewOrders.scss';
import { getOrders, changeOrderStatus, selectOrders } from '../../../../Redux/orderSlice';

import { useDispatch, useSelector } from 'react-redux';

const ViewOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const [tab, setTab] = useState('all');
  const [filteredOrders, setFilteredOrders] = useState(null);

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  useEffect(() => {
    filterOrders('all');
  }, [orders]);

  const filterOrders = (tab) => {
    if (orders) {
      const tempOrders = orders.filter((x) => {
        if (tab === 'all' || x.status === tab) {
          return x;
        }
      });
      setFilteredOrders(tempOrders);
      setTab(tab);
    }
  };

  return (
    <div
      className='ViewOrders'
      onClick={() => {
        if (
          document.getElementById('check01') &&
          document.getElementById('check01').checked === true
        ) {
          document.getElementById('check01').click();
        }
      }}
    >
      <h2>Orders</h2>
      <div className='Orders'>
        <div className='TableTop'>
          <button
            className={`${tab == 'all' && 'highlight'}`}
            onClick={() => {
              filterOrders('all');
            }}
          >
            All
          </button>
          <button
            className={`${tab == 'new' && 'highlight'}`}
            onClick={() => {
              filterOrders('new');
            }}
          >
            New
          </button>
          <button
            className={`${tab == 'open' && 'highlight'}`}
            onClick={() => {
              filterOrders('open');
            }}
          >
            Open
          </button>
          <button
            className={`${tab == 'closed' && 'highlight'}`}
            onClick={() => {
              filterOrders('closed');
            }}
          >
            Closed
          </button>
        </div>
        {filteredOrders && (
          <div className='Table'>
            {filteredOrders.map((x) => {
              let stat;
              if (x.status == 'new') {
                stat = 'New';
              }
              if (x.status == 'open') {
                stat = 'Open';
              }
              if (x.status == 'closed') {
                stat = 'Closed';
              }
              return (
                <div className='item'>
                  <p className='name'>{x.invoice.customer_name}</p>
                  <p className='amount'>${x.invoice.amount_paid / 100.0}</p>
                  <p className='paid'>{x.invoice.status}</p>
                  <p className='date'>{new Date(x.invoice.effective_at).toUTCString()}</p>
                  <div className='status'>
                    <input id='check01' type='checkbox' name='statuscheck' />
                    <label for='check01'>{stat}</label>
                    <ul className='drop'>
                      <li onClick={() => dispatch(changeOrderStatus(x._id, 'new'))}>New</li>
                      <li onClick={() => dispatch(changeOrderStatus(x._id, 'open'))}>Open</li>
                      <li onClick={() => dispatch(changeOrderStatus(x._id, 'closed'))}>Closed</li>
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewOrders;
