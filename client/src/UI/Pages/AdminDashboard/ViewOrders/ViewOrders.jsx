import React, { useState, useEffect } from 'react';
import './ViewOrders.scss';
import { getOrders, changeOrderStatus, selectOrders } from '../../../../Redux/orderSlice';
import { getProductsByStripeIDs, selectProducts } from '../../../../Redux/productSlice';

import { useDispatch, useSelector } from 'react-redux';

const ViewOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const [tab, setTab] = useState('all');
  const [filteredOrders, setFilteredOrders] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [order, setOrder] = useState(null);

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

  const itemClicked = (currOrder) => {
    const orderProducts = currOrder.invoice.lines.data.map((x) => {
      return x.price.product;
    });
    dispatch(getProductsByStripeIDs([orderProducts]));
    setOrder(currOrder);
    setShowOrderModal(true);
  };

  return (
    <div className='ViewOrders'>
      {showOrderModal && <OrderModal setShowOrderModal={setShowOrderModal} order={order} />}
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
          <div className='table'>
            {filteredOrders.map((x, i) => {
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
                <div
                  key={i}
                  className='item'
                  onClick={() => {
                    itemClicked(x);
                  }}
                >
                  <p className='name'>{x.invoice.customer_name}</p>
                  <p className='amount'>${x.invoice.amount_paid / 100.0}</p>
                  <p className='paid'>{x.invoice.status}</p>
                  <p className='date'>{new Date(x.invoice.effective_at).toUTCString()}</p>
                  <div className='status' onClick={(e) => e.stopPropagation()}>
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

const OrderModal = ({ setShowOrderModal, order }) => {
  const [tab, setTab] = useState('Packing List');
  const products = useSelector(selectProducts);

  return (
    <div className='orderModal' onClick={() => setShowOrderModal(false)}>
      <div className='modal' onClick={(e) => e.stopPropagation()}>
        <h2>{tab}</h2>
        <div className='tabRow'>
          <button onClick={() => setTab('Packing List')}>Packing List</button>
          <button onClick={() => setTab('Invoice Details')}>Invoice Details</button>
        </div>
        {tab == 'Packing List' && products && (
          <div className='packingList'>
            <div className='topLine'>
              <p className='name'>Name</p>
              <div className='VLine' style={{ left: '40%' }}></div>
              <p className='id'>ID</p>
              <div className='VLine' style={{ left: '80%' }}></div>
              <p className='quantity'>Quantity</p>
            </div>
            {order.invoice.lines.data.map((x, i) => {
              let product;
              products.map((z) => {
                if (z.stripe_product_id == x.price.product) {
                  product = z;
                }
              });
              return (
                <div className='item' key={i}>
                  <p className='name'>{product.name}</p>
                  <p className='id'>{product._id}</p>
                  <p className='quantity'>{x.quantity}</p>
                </div>
              );
            })}
          </div>
        )}
        {tab == 'Invoice Details' && <div className='invoiceDetails'></div>}
      </div>
    </div>
  );
};

export default ViewOrders;
