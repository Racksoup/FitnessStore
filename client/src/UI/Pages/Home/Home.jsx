import React, { useEffect } from "react";
import "./Home.scss";
import {
  getHighlightProducts,
  selectProducts,
  setCurrProduct,
} from "../../../Redux/productSlice";
import Car from "../../../images/car.jpg";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);

  useEffect(() => {
    dispatch(getHighlightProducts());
  }, []);

  return (
    <div className="home">
      <div className="headerImage">
        <img src={Car} alt="image" />
      </div>
      <div className="header">
        <h1>GET FIT TODAY!</h1>
        <div className="store-categories">
          <div className="category-widget">
            <h2>Weights</h2>
            <img src={Car} alt="" />
          </div>
          <div className="category-widget">
            <h2>Gym Systems</h2>
            <img src={Car} alt="" />
          </div>
          <div className="category-widget">
            <h2>Plate Loaded</h2>
            <img src={Car} alt="" />
          </div>
          <div className="category-widget">
            <h2>Accessories</h2>
            <img src={Car} alt="" />
          </div>
          <div className="category-widget">
            <h2>Weights</h2>
            <img src={Car} alt="" />
          </div>
          <div className="category-widget">
            <h2>Gym Systems</h2>
            <img src={Car} alt="" />
          </div>
          <div className="category-widget">
            <h2>Plate Loaded</h2>
            <img src={Car} alt="" />
          </div>
          <div className="category-widget">
            <h2>Accessories</h2>
            <img src={Car} alt="" />
          </div>
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
                        <Link key={i} className="product" to="/product">
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
        <div
          className="category-widget"
          style={{ marginTop: 0, height: "100%", width: "100%" }}
        >
          <h2>Accessories</h2>
          <img src={Car} alt="" />
        </div>
        <div
          className="category-widget"
          style={{ marginTop: 0, height: "100%", width: "100%" }}
        >
          <h2>Plate Loaded</h2>
          <img src={Car} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;
