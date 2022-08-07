import React, { useEffect } from 'react';
import './CategoryView.scss';
import { selectCategory } from '../../../Redux/categorySlice';
import { selectProducts, getProductsForCategory } from '../../../Redux/productSlice';

import { useSelector, useDispatch } from 'react-redux';

const CategoryView = () => {
  const category = useSelector(selectCategory);
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsForCategory(category));
  }, []);

  return <div className='CategoryView'>{category}</div>;
};

export default CategoryView;
