import React from "react";
import "./UserEventModal.scss";

const UserEventModal = ({ text, toggle }) => {
  setTimeout(() => {
    toggle(false);
  }, [1000]);

  return (
    <div className="user-event-modal">
      <div className="modal">
        <p>{text}</p>
      </div>
    </div>
  );
};

export default UserEventModal;
