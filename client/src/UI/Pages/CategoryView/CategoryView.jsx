import React, { useEffect } from "react";
import "./CategoryView.scss";
import { selectCategories, selectCategory } from "../../../Redux/categorySlice";
import {
  selectProducts,
  getProductsForCategory,
  setCurrProduct,
} from "../../../Redux/productSlice";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const CategoryView = () => {
  const dispatch = useDispatch();
  const category = useSelector(selectCategory);
  const categories = useSelector(selectCategories);
  const products = useSelector(selectProducts);

  // useEffect(() => {
  //   dispatch(getProductsForCategory(category.category));
  // }, []);

  let maxProductsNum = 50;
  if (products && products.length > 0 && products.length < 50) {
    maxProductsNum = products.length;
  }

  return (
    <div className="CategoryView">
      <div className="Nav2">
        {categories &&
          categories.map((x, i) => {
            let isFirst = true;
            if (x.mainID === category._id) {
              if (isFirst) {
                isFirst = false;
                return (
                  <div
                    className="ItemFirst"
                    key={i}
                    onClick={() => dispatch(getProductsForCategory(x._id))}
                  >
                    {x.category}
                  </div>
                );
              } else {
                return (
                  <div
                    className="Item"
                    key={i}
                    onClick={() => dispatch(getProductsForCategory(x._id))}
                  >
                    {x.category}
                  </div>
                );
              }
            }
          })}
      </div>
      {products && products.length > 0 ? (
        <>
          <div className="HeaderInfo">
            <p className="Text">
              1 - {maxProductsNum} of over {products.length} results for{" "}
            </p>
            <p className="OrangeText">'{category.category}'</p>
          </div>
          <div className="Content">
            <div className="Left">
              <div className="CustomerReviews">
                <h4 className="Title">Customer Review</h4>
              </div>
              <div className="PriceModule">
                <h4 className="Title">Price</h4>
                <p className="Item">Under $25</p>
                <p className="Item">$25 to $50</p>
                <p className="Item">$50 to $100</p>
                <p className="Item">$100 to $200</p>
                <p className="Item">$200 & Above</p>
                <div className="CustomPrice">
                  <input type="text" placeholder="Min" />
                  <input type="text" placeholder="Max" />
                  <button className="Go">Go</button>
                </div>
              </div>
              <div className="MiscSelection">
                <h4 className="Title">Deals</h4>
                <div className="CheckLine">
                  <input type="checkbox" />
                  <p>Today's Deals</p>
                </div>
                <h4 className="Title">Availability</h4>
                <div className="CheckLine">
                  <input type="checkbox" />
                  <p>Include out of stock</p>
                </div>
              </div>
            </div>
            <div className="Right">
              {products &&
                products.map((x, i) => (
                  <Link className="Link" key={i} to="/product">
                    <div
                      className="Product"
                      key={i}
                      onClick={() => dispatch(setCurrProduct(x))}
                    >
                      {x.image_filenames.map((c, j) => {
                        if (c.main) {
                          return (
                            <img
                              src={`api/product/image/${c.filename}`}
                              alt="Product Image"
                              key={j}
                            />
                          );
                        }
                      })}
                      <div className="InfoBox">
                        <h3 className="Title">{x.name}</h3>
                        <div className="RatingLine">hrh</div>
                        <div className="PriceLine">
                          <p className="DollarSign">$</p>
                          <p className="Price">{x.price / 100.0}</p>
                        </div>
                        <div className="SaleTag">15% off</div>
                        <p className="Info">Free Delivery For Members</p>
                        <p className="Info">Save By Combining Items</p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </>
      ) : (
        <>Products Not Found</>
      )}
    </div>
  );
};

export default CategoryView;
