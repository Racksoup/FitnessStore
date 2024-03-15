import React, { useState, useEffect } from "react";
import "./SingleProduct.scss";
import { selectProduct, getSingleProduct } from "../../../Redux/productSlice";
import { selectCart, updateCart } from "../../../Redux/cartSlice";
import { selectWishlist, updateWishlist } from "../../../Redux/wishlistSlice";
import { selectIsAuthenticated, selectUser } from "../../../Redux/userSlice";

import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const product = useSelector(selectProduct);
  let cart = useSelector(selectCart);
  let wishlist = useSelector(selectWishlist);
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [currImage, setCurrImage] = useState("");
  const { id } = useParams();

  useEffect(() => {
    dispatch(getSingleProduct(id));
  }, [id]);

  useEffect(() => {
    if (product) {
      product.image_filenames.map((x) => {
        if (x.main) {
          setCurrImage(x);
        }
      });
    }
  }, [product]);

  const addToCart = () => {
    if (isAuthenticated) {
      dispatch(updateCart(cart._id, product, 1));
    }
  };

  const addToWishlist = () => {
    if (isAuthenticated) {
      dispatch(updateWishlist(wishlist._id, product, 1));
    }
  };

  if (product) {
    return (
      <div className="SingleProduct">
        <div className="Top">
          <div className="Left">
            <div className="Images">
              {product.image_filenames.map((x, i) => (
                <img
                  className="Img"
                  src={`/api/product/image/${x.filename}`}
                  alt="Product Image"
                  key={i}
                  onMouseEnter={() => setCurrImage(x)}
                />
              ))}
            </div>
            <img
              src={`/api/product/image/${currImage.filename}`}
              alt="Curr Image"
              className="CurrImage"
            />
          </div>
          <div className="Right">
            <div className="Info">
              <h1 className="Title">{product.name}</h1>
              {/* <p className='Brand'>{product.brand}</p> */}
              {/* <div className='Rating'></div> */}
              <div className="HLine" />
              <div className="PriceLine">
                <p className="DollarSign">$</p>
                <p className="Dollars">{Math.floor(product.price / 100)}</p>
                <p className="Cents">{product.price % 100}</p>
              </div>
              {product.details.map((x, i) => {
                return (
                  <div className="DetailLine" key={i}>
                    <div className="Key">{x.key}</div>
                    <div className="Value">{x.value}</div>
                  </div>
                );
              })}
              <div className="HLine" />
              <div className="AboutTitle">About This Item</div>
              {product.about.map((x, i) => (
                <div className="AboutLine" key={i}>
                  <div className="Dot" />
                  <div className="About">{x}</div>
                </div>
              ))}
            </div>
            <div className="Purchase">
              <div className="PriceLine">
                <p className="DollarSign">$</p>
                <p className="Dollars">{product.price / 100.0}</p>
                <p className="Cents">{product.price % 100}</p>
              </div>
              <p className="DeliveryDetails">Delivery Details</p>
              <div className="AddressLine">
                <div className="Dot" />
                {user && (
                  <div className="address-info">{user.address.address}</div>
                )}
              </div>
              <p className="Stock">In Stock / Out of Stock</p>
              <div className="QuantityLine">
                <p className="Label">Quantity</p>
                <div className="QuantitySelector">
                  <p className="Quantity">1</p>
                  <FontAwesomeIcon className="Icon" icon={faChevronDown} />
                </div>
              </div>
              <button className="Btn Add" onClick={() => addToCart()}>
                Add To Cart
              </button>
              <button className="Btn Buy">Buy Now</button>
              <div className="MerchantDetails">
                Sold by <p className="BlueText">{product.merchant}</p>
                and shipped by <p className="BlueText">FedEx</p>
              </div>
              <div className="WishlistBox" onClick={() => addToWishlist()}>
                <p>Add to Wishlist</p>
                <FontAwesomeIcon className="Icon" icon={faChevronDown} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default SingleProduct;
