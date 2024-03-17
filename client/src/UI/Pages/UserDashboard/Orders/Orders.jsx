import React, { useState, useEffect } from "react";
import "./Orders.scss";
import {
  getCustomerOrders,
  selectCustomerOrders,
  setCustomerOrder,
} from "../../../../Redux/orderSlice";
import { loadUser, selectUser } from "../../../../Redux/userSlice";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orders = useSelector(selectCustomerOrders);
  const user = useSelector(selectUser);
  const [modal, setModal] = useState(false);
  const [order, setOrder] = useState(null);
  const [windowWidth, setWindowWidth] = useState(1440);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(getCustomerOrders(user.customer_stripe_id));
    }
  }, [user]);

  // useEffect(() => {
  //   if (!orders) {
  //     navigate("/user-dashboard");
  //   }
  // }, [orders, navigate]);

  return (
    <div className="orders">
      {modal && <OrdersModal setModal={setModal} order={order} />}
      <h1>Orders and Returns</h1>
      <div className="table">
        {orders &&
          orders.map((order) => {
            var orderDate = new Date(order.invoice.effective_at * 1000);
            let options = { year: "numeric", month: "long", day: "numeric" };
            if (windowWidth <= 768) {
              options = { year: "numeric", month: "2-digit", day: "2-digit" };
            }
            var formattedDate = new Intl.DateTimeFormat(
              "en-US",
              options
            ).format(orderDate);

            return (
              <div className="order">
                <div className="info">
                  <p>{formattedDate}</p>
                  <p>{order.invoice.lines.total_count}</p>
                  <p>{order.invoice.amount_paid}</p>
                  {windowWidth > 768 ? (
                    <>
                      <p>SHIP TO: Address</p>
                      <p>STATUS: Delivered</p>
                    </>
                  ) : (
                    <>
                      <p>Address</p>
                      <p className="hide">Delivered</p>
                    </>
                  )}
                </div>
                {windowWidth > 768 ? (
                  <div className="links">
                    <p
                      onClick={() => {
                        setModal(true);
                        setOrder(order);
                      }}
                    >
                      Order Details
                    </p>
                    <a href={order.invoice.invoice_pdf} target="_blank">
                      Invoice PDF
                    </a>
                  </div>
                ) : (
                  <div className="links">
                    <p
                      onClick={() => {
                        setModal(true);
                        setOrder(order);
                      }}
                    >
                      Details
                    </p>
                    <a href={order.invoice.invoice_pdf} target="_blank">
                      Invoice
                    </a>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

const OrdersModal = ({ setModal, order }) => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState("packing list");

  return (
    <div className="ordersModal" onClick={() => setModal(false)}>
      <div className="content" onClick={(e) => e.stopPropagation()}>
        <div className="buttons">
          <div className="tabs">
            <button
              onClick={() => setTab("packing list")}
              className={`${tab == "packing list" && "blue"}`}
            >
              Packing List
            </button>
            <button
              onClick={() => setTab("invoice details")}
              className={`${tab == "invoice details" && "blue"}`}
            >
              Invoice Details
            </button>
          </div>
          <Link to="/returns" className="return">
            <p onClick={() => dispatch(setCustomerOrder(order))}>
              Return Items
            </p>
          </Link>
        </div>
        {tab == "packing list" && (
          <div className="grid">
            <div className="line1"></div>
            <div className="line2"></div>
            <div className="row">
              <p className="name">Item Name</p>
              <p className="price">Price</p>
              <p className="quantity">Quantity</p>
            </div>
            {order &&
              order.invoice.lines.data.map((product) => (
                <div className="row" style={{ height: "2rem" }}>
                  <p className="name">{product.description}</p>
                  <p className="price">${product.amount}</p>
                  <p className="quantity">{product.quantity}</p>
                </div>
              ))}
          </div>
        )}
        {tab == "invoice details" && <div className="grid"></div>}
      </div>
    </div>
  );
};

export default Orders;
