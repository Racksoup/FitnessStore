import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  products: null,
  product: null,
};

export const selectProducts = (state) => state.product.products;
export const selectProduct = (state) => state.product.product;

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    gotProducts: (state, action) => {
      state.products = action.payload;
    },
    setCurrProduct: (state, action) => {
      localStorage.setItem('ProductID', action.payload._id);
      state.product = action.payload;
    },
    gotOneProduct: (state, action) => {
      state.product = action.payload;
    },
    productCreated: (state, action) => {
      state.products.push(action.payload);
    },
    productUpdated: (state, action) => {
      state.products = state.products.filter((item) => item._id !== action.payload._id);
      state.products.push(action.payload);
    },
    productRemoved: (state, action) => {
      state.products = state.products.filter((item) => item._id !== action.payload._id);
    },
    gotSearch: (state, action) => {
      state.products.push(...action.payload[0], ...action.payload[1]);
    },
  },
});

export const {
  setCurrProduct,
  gotProducts,
  gotOneProduct,
  productCreated,
  productUpdated,
  productRemoved,
  gotSearch,
} = productSlice.actions;

export const createProduct = (product, file, files) => async (dispatch) => {
  let data = new FormData();
  data.append('name', product.name);
  data.append('category', product.category);
  data.append('price', product.price);
  data.append('highlight', product.highlight);
  data.append('brand', product.brand);
  data.append('merchant', product.merchant);
  data.append('details', JSON.stringify(product.details));
  data.append('tech_details', JSON.stringify(product.tech_details));
  data.append('about', JSON.stringify(product.about));
  data.append('main_file', file.name);
  data.append('file', file);
  files.map((v) => {
    data.append('file', v);
  });

  try {
    const config = {
      headers: {
        accept: 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
      },
    };
    const res = await axios.post('api/product', data, config);
    dispatch(productCreated(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const updateProduct = (product, files, newMain) => async (dispatch) => {
  let config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    let data = new FormData();
    Object.entries(product).map((k) => {
      if (
        k[0] === 'details' ||
        k[0] === 'tech_details' ||
        k[0] === 'about' ||
        k[0] === 'image_filenames' ||
        k[0] === 'highlight'
      ) {
        data.append(k[0], JSON.stringify(k[1]));
      } else {
        data.append(k[0], k[1]);
      }
    });

    data.append('newMain', newMain);

    if (files !== '' && files !== null && files !== undefined && files.length !== 0) {
      files.map((x) => {
        data.append('file', x.file);
      });
      config = {
        headers: {
          accept: 'application/json',
          'Accept-Language': 'en-US,en;q=0.8',
          'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        },
      };
    }

    const res = await axios.put(`/api/product/${product._id}`, data, config);
    dispatch(productUpdated(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const removeProduct = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/product/${id}`);
    dispatch(productRemoved(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const getAllProducts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/product/');
    dispatch(gotProducts(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const getHighlightProducts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/product/highlight');
    dispatch(gotProducts(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const getCurrProduct = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/product/${localStorage.ProductID}`);
    dispatch(gotOneProduct(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const getSingleProduct = (productID) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/product/${productID}`);
    localStorage.setItem('productID', productID);
    dispatch(gotOneProduct(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const searchProducts = (search) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/product/search/${search}`);
    dispatch(gotSearch(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const getProductsForCategory = (category) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/product/category/${category.category}`);
    dispatch(gotProducts(res.data));
  } catch (error) {
    console.log(error);
  }
};

export default productSlice.reducer;
