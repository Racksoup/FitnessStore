import React, { useState, useEffect } from "react";
import "./UpdateCategories.scss";
import {
  deleteCategory,
  createCategory,
  selectCategories,
} from "../../../../Redux/categorySlice";
import Car from "../../../../images/car.jpg";

import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faX } from "@fortawesome/free-solid-svg-icons";

const UpdateCategories = () => {
  const dispatch = useDispatch();
  const [createCategoryModal, toggleCreateCategoryModal] = useState(false);
  const [categoryInit, setCategoryInit] = useState({
    category: "",
    main: true,
  });
  const categories = useSelector(selectCategories);

  const createMainCategory = () => {
    setCategoryInit({ category: "", main: true });
    toggleCreateCategoryModal(true);
  };
  const createChildCategory = (mainCat) => {
    setCategoryInit({ category: "", main: false, mainID: mainCat._id });
    toggleCreateCategoryModal(true);
  };

  return (
    <div className="UpdateCategories">
      {createCategoryModal && (
        <CreateCategoryModal
          toggleModal={toggleCreateCategoryModal}
          func={createCategory}
          state={categoryInit}
          title="Create Category"
        />
      )}
      <button className="Btn-1" onClick={() => createMainCategory()}>
        Create Category
      </button>
      <div className="CategoriesView">
        {categories &&
          categories.map((cat, i) => {
            if (cat.main) {
              return (
                <div className="CategoryGroup">
                  <div className="Category" key={i}>
                    <img src={Car} alt="Category Image" />
                    <p>{cat.category}</p>
                    <div className="Buttons">
                      <FontAwesomeIcon
                        icon={faPlus}
                        className="Btn-5 Icon"
                        onClick={() => createChildCategory(cat)}
                      />
                      <FontAwesomeIcon
                        icon={faX}
                        className="Btn-4 Icon"
                        onClick={() => dispatch(deleteCategory(cat._id))}
                      />
                    </div>
                  </div>
                  <div className="ChildCategories">
                    {categories.map((cat2, j) => {
                      if (!cat2.main && cat2.mainID === cat._id) {
                        return (
                          <div className="ChildCategory" key={j}>
                            <img src={Car} alt="Category Image" />
                            <p>{cat2.category}</p>
                            <div className="Buttons">
                              <FontAwesomeIcon
                                icon={faX}
                                className="Btn-4 Icon"
                                onClick={() =>
                                  dispatch(deleteCategory(cat2._id))
                                }
                              />
                            </div>
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
};

const CreateCategoryModal = ({ toggleModal, func, state, title }) => {
  const [currState, setCurrState] = useState(state);
  const dispatch = useDispatch();

  const submitForm = (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(func(currState));
    toggleModal(false);
  };

  return (
    <div className="CreateCategoryModal" onClick={() => toggleModal(false)}>
      <div className="Modal" onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        <form onSubmit={(e) => submitForm(e)}>
          <div className="Row">
            <label>Category:</label>
            <input
              type="text"
              name="category"
              onChange={(e) =>
                setCurrState({
                  ...currState,
                  [e.target.name]: e.target.value,
                })
              }
              value={currState.category}
            />
          </div>
          <div className="Row">
            <label>Image:</label>
            <input
              type="file"
              name="image"
              onChange={(e) =>
                setCurrState({
                  ...currState,
                  [e.target.name]: e.target.files[0],
                })
              }
            />
          </div>

          <input type="submit" value="Submit" className="Btn-1" />
        </form>
      </div>
    </div>
  );
};

export default UpdateCategories;
