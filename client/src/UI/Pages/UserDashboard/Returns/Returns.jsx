import React, { useState, useEffect } from "react";
import "./Returns.scss";

import { useDispatch, useSelector } from "react-redux";
import { selectCustomerOrder } from "../../../../Redux/orderSlice";
import {
  getCustomerRefund,
  selectRefund,
  createCustomerRefund,
} from "../../../../Redux/refundSlice";
import { selectUser } from "../../../../Redux/userSlice";

const Returns = () => {
  const dispatch = useDispatch();
  const order = useSelector(selectCustomerOrder);
  const refund = useSelector(selectRefund);
  const user = useSelector(selectUser);
  const [returnItems, setReturnItems] = useState([]);
  const [modal, toggleModal] = useState(false);
  const [reason, setReason] = useState("");

  console.log(refund);

  useEffect(() => {
    dispatch(getCustomerRefund(order._id));
  }, [order]);

  const checked = (e, v) => {
    if (e.target.checked) {
      setReturnItems([...returnItems, v]);
    } else {
      setReturnItems(returnItems.filter((item) => item !== v));
    }
  };

  if (!refund == null && refund.length == 0)
    return <div>REfUnDeD ALLREADY!</div>;

  const sendRefund = () => {
    dispatch(
      createCustomerRefund(returnItems, order.invoice, order._id, reason)
    );
  };

  return (
    <div className="returns">
      <div className="table">
        {modal && (
          <Modal
            modal={modal}
            toggleModal={toggleModal}
            reason={reason}
            setReason={setReason}
            sendRefund={sendRefund}
          />
        )}
        <div className="Top">
          <p>Select All</p>
          <h3>Return</h3>
          <button onClick={() => toggleModal(true)}>Request Return</button>
        </div>
        {order &&
          order.invoice.lines.data.map((v, i) => {
            return (
              <div className="Row">
                <input type="checkbox" onClick={(e) => checked(e, v)} />
                <p>{v.description}</p>
                <p className="Amount">{v.amount}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

const Modal = ({ modal, toggleModal, reason, setReason, sendRefund }) => {
  return (
    <div className="modal-bg" onClick={() => toggleModal(false)}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="line">
          <h4>Reason for Refund:</h4>
          <button onClick={() => sendRefund()}>Submit Refund Request</button>
        </div>
        <textarea
          type="text"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Returns;
