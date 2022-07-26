import React, { useState, useEffect } from 'react';
import './UpdateCategories.scss';
import CreateModal from '../../../Components/Modals/CreateModal.jsx';
import { deleteCategory, createCategory, selectCategories } from '../../../../Redux/categorySlice';

import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faX } from '@fortawesome/free-solid-svg-icons';

const UpdateCategories = () => {
  const dispatch = useDispatch();
  const [createCategoryModal, toggleCreateCategoryModal] = useState(false);
  const [categoryInit, setCategoryInit] = useState({ category: '', main: true });
  const categories = useSelector(selectCategories);

  const createMainCategory = () => {
    setCategoryInit({ category: '', main: true });
    toggleCreateCategoryModal(true);
  };
  const createChildCategory = (mainCat) => {
    setCategoryInit({ category: '', main: false, mainID: mainCat._id });
    toggleCreateCategoryModal(true);
  };

  return (
    <div className='UpdateCategories'>
      {createCategoryModal && (
        <CreateModal
          toggleModal={toggleCreateCategoryModal}
          func={createCategory}
          state={categoryInit}
          title='Create Category'
        />
      )}
      <button className='Btn-1' onClick={() => createMainCategory()}>
        Create Category
      </button>
      <div className='CategoriesView'>
        {categories &&
          categories.map((cat, i) => {
            if (cat.main) {
              return (
                <div className='CategoryGroup'>
                  <div className='Category' key={i}>
                    <p>{cat.category}</p>
                    <div className='Buttons'>
                      <FontAwesomeIcon
                        icon={faPlus}
                        className='Btn-5 Icon'
                        onClick={() => createChildCategory(cat)}
                      />
                      <FontAwesomeIcon
                        icon={faX}
                        className='Btn-4 Icon'
                        onClick={() => dispatch(deleteCategory(cat._id))}
                      />
                    </div>
                  </div>
                  <div className='ChildCategories'>
                    {categories.map((cat2, j) => {
                      if (!cat2.main && cat2.mainID === cat._id) {
                        return (
                          <div className='ChildCategory' key={j}>
                            <p>{cat2.category}</p>
                            <div className='Buttons'>
                              <FontAwesomeIcon
                                icon={faX}
                                className='Btn-4 Icon'
                                onClick={() => dispatch(deleteCategory(cat2._id))}
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

export default UpdateCategories;
