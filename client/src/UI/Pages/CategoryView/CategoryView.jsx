import React, { useEffect } from 'react';
import './CategoryView.scss';
import { selectCategories, selectCategory } from '../../../Redux/categorySlice';
import { selectProducts, getProductsForCategory } from '../../../Redux/productSlice';

import { useSelector, useDispatch } from 'react-redux';

const CategoryView = () => {
  const category = useSelector(selectCategory);
  const categories = useSelector(selectCategories);
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsForCategory(category));
  }, []);

  return (
    <div className='CategoryView'>
      <div className='Nav2'>
        {categories &&
          categories.map((x, i) => {
            let isFirst = true;
            if (x.mainID === category._id) {
              if (isFirst) {
                isFirst = false;
                return (
                  <div className='ItemFirst' key={i}>
                    {x.category}
                  </div>
                );
              } else {
                return (
                  <div className='Item' key={i}>
                    {x.category}
                  </div>
                );
              }
            }
          })}
      </div>
      <div className='Content'>{category.category}</div>
    </div>
  );
};

export default CategoryView;
