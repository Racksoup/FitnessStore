import React from "react";
import "./Categories.scss";
import Car from "../../../images/car.jpg";
import { selectCategories, setCategory } from "../../../Redux/categorySlice";
import { getProductsForCategory } from "../../../Redux/productSlice";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Categories = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);

  return (
    <div className="categories">
      <h1>SHOP BY CATEGORY</h1>
      <div className="grid">
        {categories &&
          categories.map((x, i) => (
            <Link
              to="/category"
              className="item"
              key={i}
              onClick={() => {
                dispatch(setCategory(x));
                dispatch(getProductsForCategory(x._id));
              }}
            >
              <img
                src={`api/category/image/${x.image_filename}`}
                alt="Category Image"
              />
              <p>{x.category}</p>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Categories;
