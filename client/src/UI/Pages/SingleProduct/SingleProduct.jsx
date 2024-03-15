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
import { Link } from "react-router-dom";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const product = useSelector(selectProduct);
  let cart = useSelector(selectCart);
  let wishlist = useSelector(selectWishlist);
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [currImage, setCurrImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [productAdded, setProductAdded] = useState(false);
  const [model, setModel] = useState("");
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
        {productAdded && <ProductAddedModal model={model} />}
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
              {product.stock > 0 ? (
                <p className="stock">In Stock</p>
              ) : (
                <p className="stock-out">Out of Stock</p>
              )}
              <div className="QuantityLine">
                <p className="Label">Quantity</p>
                <div className="Quantity">
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                  />
                  <div className="customButtons">
                    <button
                      onClick={() =>
                        setQuantity((prevQuantity) => {
                          if (prevQuantity + 1 <= product.stock) {
                            return prevQuantity + 1;
                          } else {
                            return prevQuantity;
                          }
                        })
                      }
                    >
                      +
                    </button>
                    <button
                      onClick={() =>
                        setQuantity((prevQuantity) => {
                          if (prevQuantity > 1) {
                            return prevQuantity - 1;
                          } else {
                            return prevQuantity;
                          }
                        })
                      }
                    >
                      -
                    </button>
                  </div>
                </div>
                {/* <FontAwesomeIcon className="Icon" icon={faChevronDown} /> */}
              </div>
              <button
                className="Btn Add"
                onClick={() => {
                  addToCart();
                  setProductAdded(true);
                  setModel("Cart");
                  setTimeout(() => {
                    setProductAdded(false);
                  }, [700]);
                }}
              >
                Add To Cart
              </button>
              {user ? (
                <Link
                  to="/cart"
                  className="Btn Buy"
                  onClick={() => addToCart()}
                >
                  Buy Now
                </Link>
              ) : (
                <Link to="/user-login" className="Btn Buy">
                  Buy Now
                </Link>
              )}
              <div className="MerchantDetails">
                Sold by <p className="BlueText">{product.merchant}</p>
                and shipped by <p className="BlueText">FedEx</p>
              </div>
              <p
                className="WishlistBox"
                onClick={() => {
                  addToWishlist();
                  setProductAdded(true);
                  setModel("Wishlist");
                  setTimeout(() => {
                    setProductAdded(false);
                  }, [700]);
                }}
              >
                Add to Wishlist
                {/* <FontAwesomeIcon className="Icon" icon={faChevronDown} /> */}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

const ProductAddedModal = ({ model }) => {
  return (
    <div className="product-added">
      <div className="modal">
        <p>Product Added to {model}</p>
      </div>
    </div>
  );
};

export default SingleProduct;
