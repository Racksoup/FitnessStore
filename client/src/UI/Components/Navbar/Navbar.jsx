import React, { useState, useEffect } from "react";
import "./Navbar.scss";

import { Link } from "react-router-dom";
import {
  faCartShopping,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  getCategories,
  selectCategories,
  setCategory,
} from "../../../Redux/categorySlice";
import { selectUser } from "../../../Redux/userSlice";
import {
  getProductsForCategory,
  searchProducts,
} from "../../../Redux/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchActive, setSearchActive] = useState(false);
  const [show, setShow] = useState(true);
  const categories = useSelector(selectCategories);
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  // hide nav in admin dashboard
  const pathname = window.location.pathname;
  useEffect(() => {
    if (pathname === "/admin-dashboard") {
      setShow(false);
    } else setShow(true);
  }, [pathname]);

  let TopMiddleStyle = {
    border: "none",
  };

  if (searchActive) {
    TopMiddleStyle.border = "solid rgb(185, 126, 67) 0.05rem";
  }

  if (show) {
    return (
      <div className="Navbar">
        <div className="Top">
          <Link to="/" className="Link">
            <h1 className="TopLeft">Fitness Store</h1>
          </Link>
          <div className="TopMiddle" style={TopMiddleStyle}>
            {/* <button className="DropdownButton">
              <Link to="/categories">
                <p>All</p>
              </Link>
              <div className="DropdownBox">
                <div className="DropdownItem">123</div>
                <div className="DropdownItem">abc</div>
                <div className="DropdownItem">xyz</div>
              </div>
            </button> */}
            <input
              type="text"
              className="Search"
              onClick={() => setSearchActive(true)}
              onBlur={() => setSearchActive(false)}
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  dispatch(searchProducts(e.target.value));
                  navigate("/category");
                }
              }}
            />
            <button className="SearchButton">
              <FontAwesomeIcon icon={faSearch} className="Icon" />
            </button>
          </div>
          <div className="TopRight">
            {user && (
              <Link className="Link" to="/cart">
                <button className="Icon">
                  <FontAwesomeIcon icon={faCartShopping} />
                </button>
              </Link>
            )}
            <Link className="Link" to="/user-login">
              <button className="Icon">
                <FontAwesomeIcon icon={faUser} />
              </button>
            </Link>
          </div>
        </div>
        <div className="Bottom">
          {categories &&
            categories.map((x, i) => {
              if (x.main) {
                return (
                  <Link key={i} className="Link" to="/category">
                    <button
                      className="Button"
                      onClick={() => {
                        dispatch(setCategory(x));
                        dispatch(getProductsForCategory(x._id));
                      }}
                    >
                      {x.category}
                    </button>
                  </Link>
                );
              }
            })}
        </div>
      </div>
    );
  }
};

export default Navbar;
