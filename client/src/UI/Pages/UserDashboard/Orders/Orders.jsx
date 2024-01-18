import React, { useState, useEffect } from 'react';
import './Orders.scss';
import { getCustomerOrders, selectCustomerOrders } from '../../../../Redux/orderSlice';
import { loadUser, selectUser } from '../../../../Redux/userSlice';

import { useDispatch, useSelector } from 'react-redux';

const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectCustomerOrders);
  const user = useSelector(selectUser);
  const [modal, setModal] = useState(false);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(getCustomerOrders(user.customer_stripe_id));
    }
  }, [user]);

  return (
    <div className='orders'>
      {modal && <OrdersModal setModal={setModal} order={order} />}
      <h1>Orders and Returns</h1>
      <div className='table'>
        {orders &&
          orders.map((order) => {
            var orderDate = new Date(order.invoice.effective_at * 1000);
            var options = { year: 'numeric', month: 'long', day: 'numeric' };
            var formattedDate = new Intl.DateTimeFormat('en-US', options).format(orderDate);

            return (
              <div className='order'>
                <div className='info'>
                  <p>{formattedDate}</p>
                  <p>{order.invoice.lines.total_count}</p>
                  <p>{order.invoice.amount_paid}</p>
                  <p>SHIP TO: Address</p>
                  <p>STATUS: Delivered</p>
                </div>
                <div className='links'>
                  <p
                    onClick={() => {
                      setModal(true);
                      setOrder(order);
                    }}
                  >
                    Order Details
                  </p>
                  <a href={order.invoice.invoice_pdf} target='_blank'>
                    Invoice PDF
                  </a>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

const OrdersModal = ({ setModal, order }) => {
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
            <div className='row'>
              <p className='name'>Item Name</p>
              <p className='price'>Price</p>
              <p className='quantity'>Quantity</p>
            </div>
            {order &&
              order.invoice.lines.data.map((product) => (
                <div className='row' style={{ height: '2rem' }}>
                  <p className='name'>{product.description}</p>
                  <p className='price'>${product.amount}</p>
                  <p className='quantity'>{product.quantity}</p>
                </div>
              ))}
          </div>
        )}
        {tab == 'invoice details' && <div className='grid'></div>}
      </div>
    </div>
  );
};

export default Orders;
