import React, { useState, useEffect } from "react";
import "./Returns.scss";

import { useSelector, useDispatch } from "react-redux";
import { selectRefunds, getAllRefunds } from "../../../../Redux/refundSlice";

const Returns = () => {
  const dispatch = useDispatch();
  const refunds = useSelector(selectRefunds);
  const [modal, toggleModal] = useState(false);
  const [currItem, setCurrItem] = useState(null);

  useEffect(() => {
    dispatch(getAllRefunds());
  }, []);

  const itemClicked = (item) => {
    setCurrItem(item);
    toggleModal(true);
  };

  return (
    <div className="Admin-Returns">
      {modal && <ReturnsModal toggleModal={toggleModal} />}
      <h2>Returns</h2>
      <div className="content">
        <div className="top">
          <div className="box amount">Total</div>
          <div className="box date">Date</div>
          <div className="box isRefunded">Refunded</div>
          <div className="box itemsReturned">Customer Returned Items</div>
        </div>
        {refunds &&
          refunds.map((x) => {
            var orderDate = new Date(x.refund.date);
            var options = { year: "numeric", month: "long", day: "numeric" };
            var formattedDate = new Intl.DateTimeFormat(
              "en-US",
              options
            ).format(orderDate);

            return (
              <div className="item" onClick={(x) => itemClicked(x)}>
                <p className="box amount">${x.refund.amount / 100.0}</p>
                <p className="box date">{formattedDate}</p>
                <p className="box isRefunded">
                  {x.refund.isRefunded ? "Yes" : "No"}
                </p>
                <p className="box itemsReturned">
                  {x.refund.itemsReturned ? "Yes" : "No"}
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

const ReturnsModal = ({ toggleModal }) => {
  return (
    <div className="modal-bg" onClick={() => toggleModal(false)}>
      <div className="modal" onClick={(e) => e.stopPropagation()}></div>
    </div>
  );
};

export default Returns;
