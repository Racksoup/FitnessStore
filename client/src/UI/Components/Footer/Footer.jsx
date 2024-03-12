import React, { useState, useEffect } from "react";
import "./Footer.scss";
import { selectUser } from "../../../Redux/userSlice";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../../Redux/adminSlice";

const Footer = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);
  const user = useSelector(selectUser);

  // hide nav in admin dashboard
  const pathname = window.location.pathname;
  useEffect(() => {
    if (pathname === "/admin-dashboard") {
      setShow(false);
    } else setShow(true);
  }, [pathname]);

  if (show) {
    return (
      <div className="Footer">
        <div className="Content">
          <div className="Half">
            <div className="Col">
              <h4 className="Title">Links</h4>
              <div className="Line" />
              <div className="box">
                {!user && (
                  <>
                    <Link to="user-login" className="Item Link">
                      Login
                    </Link>
                    <Link to="create-user" className="Item Link">
                      Create Account
                    </Link>
                  </>
                )}
                <Link to="/about" className="Item Link">
                  About
                </Link>
                {user && (
                  <>
                    <Link
                      to="/"
                      className="Item Link"
                      onClick={() => dispatch(logout())}
                    >
                      Logout
                    </Link>
                    <Link to="/user-dashboard" className="Item Link">
                      Profile
                    </Link>
                    <Link to="/cart" className="Item Link">
                      Cart
                    </Link>
                    <Link to="/wishlist" className="Item Link">
                      Wishlist
                    </Link>
                    <Link to="/orders" className="Item Link">
                      Orders
                    </Link>
                    <Link to="/tickets" className="Item Link">
                      Tickets
                    </Link>
                    <Link to="/returns" className="Item Link">
                      Returns
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="Half">
            <div className="Col Right-Col">
              <div className="Title">Newsletter</div>
              <div className="Line" />
              <p>Enter your email to subscribe to our newsletter</p>
              <input type="text" className="Input" placeholder="Email" />
              <button className="Btn">Subscribe</button>
            </div>
          </div>
        </div>
        <div className="EndBG" />
      </div>
    );
  }
};

export default Footer;
