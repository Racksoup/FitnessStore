import React, { useState, useEffect } from 'react';
import './Orders.scss';
import { getCustomerOrders, selectCustomerOrders } from '../../../../Redux/orderSlice';
import { selectUser } from '../../../../Redux/userSlice';

import { useDispatch, useSelector } from 'react-redux';

const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectCustomerOrders);
  const user = useSelector(selectUser);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    dispatch(getCustomerOrders(user.customer_stripe_id));
    console.log(orders);
  }, []);

  return (
    <div className='orders'>
      {modal && <OrdersModal setModal={setModal} />}
      <h1>Orders and Returns</h1>
      <div className='table'>
        <div className='order'>
          <div className='info'>
            <p>August 23, 2023</p>
            <p>(3 Items)</p>
            <p>TOTAL: $47.43</p>
            <p>SHIP TO: ZeeZee</p>
            <p>STATUS: Delivered</p>
          </div>
          <div className='links'>
            <p onClick={() => setModal(true)}>Order Details</p>
            <p>Invoice</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const OrdersModal = ({ setModal }) => {
  const [tab, setTab] = useState('packing list');

  return (
    <div className='ordersModal' onClick={() => setModal(false)}>
      <div className='content' onClick={(e) => e.stopPropagation()}>
        <div className='buttons'>
          <div className='tabs'>
            <button
              onClick={() => setTab('packing list')}
              className={`${tab == 'packing list' && 'blue'}`}
            >
              Packing List
            </button>
            <button
              onClick={() => setTab('invoice details')}
              className={`${tab == 'invoice details' && 'blue'}`}
            >
              Invoice Details
            </button>
          </div>
          <button className='return'>Return Items</button>
        </div>
        {tab == 'packing list' && (
          <div className='grid'>
            <div className='line1'></div>
            <div className='line2'></div>
            <div className='top'>
              <p className='name'>Item Name</p>
              <p className='price'>Price</p>
              <p className='quantity'>Quantity</p>
            </div>
          </div>
        )}
        {tab == 'invoice details' && <div className='grid'></div>}
      </div>
    </div>
  );
};

export default Orders;
