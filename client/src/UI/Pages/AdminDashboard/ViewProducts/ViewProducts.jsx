import React, { useState, useEffect } from "react";
import "./ViewProducts.scss";
import {
  getAllProducts,
  selectProducts,
  removeProduct,
} from "../../../../Redux/productSlice";
import {
  getCategories,
  selectCategories,
} from "../../../../Redux/categorySlice";
import UpdateProduct from "../UpdateProduct/UpdateProduct.jsx";
import CreateProduct from "../CreateProduct/CreateProduct.jsx";

import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

const ViewProducts = () => {
  const [updateModal, toggleUpdateModal] = useState(false);
  const [createModal, toggleCreateModal] = useState(false);
  const [currProduct, setCurrProduct] = useState(null);
  const [filter, setFilter] = useState(null);
  const [searchProducts, setSearchProducts] = useState(null);
  const products = useSelector(selectProducts);
  const categories = useSelector(selectCategories);
  const dispatch = useDispatch();

  const updateClicked = (product) => {
    setCurrProduct(product);
    toggleUpdateModal(true);
  };

  const searchChanged = (e) => {
    if (e.target.value !== "") {
      let searchProductsPlaceholder = products.filter((x) => {
        if (
          x.name.toLowerCase().includes(e.target.value.toLowerCase()) &&
          (filter == null || x.category === filter)
        ) {
          return x;
        }
      });
      setSearchProducts(searchProductsPlaceholder);
    } else {
      setSearchProducts(products);
    }
  };

  const filterChanged = (category) => {
    setFilter(category);
    let searchProductsPlaceholder = products.filter((x) => {
      if (category == null) {
        return x;
      }
      if (x.category === category) {
        return x;
      }
    });
    setSearchProducts(searchProductsPlaceholder);
  };

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    setSearchProducts(products);
  }, [products]);

  return (
    <div className="ViewProducts">
      {updateModal && (
        <UpdateProduct
          toggleModal={toggleUpdateModal}
          currProduct={currProduct}
        />
      )}
      {createModal && <CreateProduct toggleModal={toggleCreateModal} />}
      <h1>Products</h1>
      <div className="topLine">
        <div className="filter">
          Filter{filter && `: ${filter}`}
          <ul className="drop">
            <li
              onClick={() => filterChanged(null)}
              style={{ color: "rgb(106, 211, 238)" }}
            >
              Clear
            </li>
            {categories &&
              categories.map((x) => {
                return (
                  <li onClick={() => filterChanged(x.category)}>
                    {x.category}
                  </li>
                );
              })}
          </ul>
        </div>
        <button
          className="create Btn-1"
          onClick={() => toggleCreateModal(true)}
        >
          Create Product
        </button>
        <input
          type="text"
          onChange={(e) => {
            searchChanged(e);
          }}
        />
      </div>
      {searchProducts &&
        searchProducts.map((v, i) => {
          let x;
          v.image_filenames.map((obj) => {
            if (obj.main) {
              x = obj.filename;
            }
          });
          return (
            <div className="Product" key={i}>
              <img src={`/api/product/image/${x}`} alt="Product Image" />
              <div className="Info">
                <p className="InfoItem">Name: {v.name}</p>
                <p className="InfoItem">Category: {v.category}</p>
                <p className="InfoItem">Price: {v.price}</p>
                <p className="InfoItem">About: {v.about[0]}</p>
              </div>
              <div className="Btns">
                <button className="Btn-1" onClick={() => updateClicked(v)}>
                  Update
                </button>
                <button
                  className="Btn-2"
                  onClick={() => dispatch(removeProduct(v._id))}
                >
                  <FontAwesomeIcon icon={faX} className="Icon" />
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ViewProducts;
