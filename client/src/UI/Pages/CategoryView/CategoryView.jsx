import React from 'react';
import './CategoryView.scss';
import { selectCategory } from '../../../Redux/categorySlice';

import { useSelector } from 'react-redux';

const CategoryView = () => {
  const category = useSelector(selectCategory);

  return <div className='CategoryView'>{category}</div>;
};

export default CategoryView;
