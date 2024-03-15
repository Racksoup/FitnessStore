import React, { useEffect, useState } from "react";
import "./Home.scss";
import {
  getHighlightProducts,
  getProductsForCategory,
  selectProducts,
  setCurrProduct,
} from "../../../Redux/productSlice";
import { selectCategories, setCategory } from "../../../Redux/categorySlice";
import Car from "../../../images/car.jpg";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const [numCatReturn, setNumCatReturn] = useState(8);
  const products = useSelector(selectProducts);
  const categories = useSelector(selectCategories);

  useEffect(() => {
    dispatch(getHighlightProducts());
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const newValue = window.innerWidth < 1440 ? 6 : 8;
      setNumCatReturn(newValue);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="home">
      <div className="headerImage">
        <img src={Car} alt="image" />
      </div>
      <div className="header">
        <h1>GET FIT TODAY!</h1>
        <div className="store-categories">
          {categories &&
            categories
              .filter((x) => x.main)
              .slice(0, numCatReturn)
              .map((x, i) => (
                <Link
                  to="/category"
                  className="category-widget"
                  key={i}
                  onClick={() => {
                    dispatch(setCategory(x));
                    dispatch(getProductsForCategory(x._id));
                  }}
                >
                  <h2>{x.category}</h2>
                  <img
                    src={`api/category/image/${x.image_filename}`}
                    alt="Category Image"
                  />
                </Link>
              ))}
        </div>
      </div>
      <div className="product-carousel">
        {products &&
          products.map((x, i) => {
            while (i < 6)
              return (
                <>
                  {x.image_filenames.map((c, j) => {
                    if (c.main) {
                      return (
                        <Link
                          key={i}
                          className="product"
                          to={`/product/${x._id}`}
                        >
                          <img
                            src={`/api/product/image/${c.filename}`}
                            alt="image"
                            onClick={() => dispatch(setCurrProduct(x))}
                          />
                        </Link>
                      );
                    }
                  })}
                </>
              );
          })}
      </div>
      <div className="section2">
        <img className="promo" src={Car} alt="" />
        {categories &&
          categories
            .filter((x) => x.main)
            .slice(0, 2)
            .map((x, i) => (
              <Link
                to="/category"
                className="category-widget category-widget-desktop"
                key={i}
                onClick={() => {
                  dispatch(setCategory(x));
                  dispatch(getProductsForCategory(x._id));
                }}
              >
                <h2>{x.category}</h2>
                <img
                  src={`api/category/image/${x.image_filename}`}
                  alt="Category Image"
                />
              </Link>
            ))}
      </div>
    </div>
  );
};

export default Home;
