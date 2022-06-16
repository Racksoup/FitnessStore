import React, { useState, useEffect } from 'react';
import './UpdateCategories.scss';
import CreateModal from '../../../Components/Modals/CreateModal.jsx';
import {
  getCategories,
  deleteCategory,
  createCategory,
  selectCategories,
} from '../../../../Redux/categorySlice';

import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

const UpdateCategories = () => {
  const dispatch = useDispatch();
  const [createCategoryModal, toggleCreateCategoryModal] = useState(false);
  const categories = useSelector(selectCategories);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return (
    <div className='UpdateCategories'>
      {createCategoryModal && (
        <CreateModal
          toggleModal={toggleCreateCategoryModal}
          func={createCategory}
          state={{ category: '' }}
          title='Create Category'
        />
      )}
      <button className='Btn-1' onClick={() => toggleCreateCategoryModal(true)}>
        Create Category
      </button>
      <div className='CategoriesView'>
        {categories &&
          categories.map((cat, i) => {
            return (
              <div className='Category' key={i}>
                <p>{cat.category}</p>
                <FontAwesomeIcon
                  icon={faX}
                  className='Btn-3 Icon'
                  onClick={() => dispatch(deleteCategory(cat._id))}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default UpdateCategories;
