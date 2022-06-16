import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  products: null,
  product: null,
  extraProductImages: null,
};

export const selectProducts = (state) => state.product.products;
export const selectProduct = (state) => state.product.product;

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    gotAllProducts: (state, action) => {
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
    extraProductImgCreated: (state, action) => {
      state.extraProductImages.push(action.payload);
    },
    gotExtraProductImages: (state, action) => {
      state.extraProductImages = action.payload;
    },
    extraProductImageDeleted: (state, action) => {
      state.extraProductImages = state.extraProductImages.filter(
        (img) => img.filename !== action.payload.filename
      );
    },
    extraProductImageUpdated: (state, action) => {
      state.extraProductImages = state.extraProductImages.map((img) => {
        if (img._id !== action.payload._id) {
          return img;
        } else {
          return action.payload;
        }
      });
    },
    gotSearch: (state, action) => {
      state.products.push(...action.payload[0], ...action.payload[1]);
    },
  },
});

export const {
  setCurrProduct,
  gotAllProducts,
  gotOneProduct,
  productCreated,
  productUpdated,
  productRemoved,
  extraProductImgCreated,
  gotExtraProductImages,
  extraProductImageDeleted,
  extraProductImageUpdated,
  gotSearch,
} = productSlice.actions;

export const createProduct = (product, file, files) => async (dispatch) => {
  let data = new FormData();
  if (file) {
    data.append('file', file);
  }
  data.append('name', product.name);
  data.append('description', product.description);
  data.append('category', product.category);
  data.append('price', product.price);
  data.append('details', JSON.stringify(product.details));

  try {
    const config = {
      headers: {
        accept: 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
      },
    };
    const res = await axios.post('api/product', data, config);
    dispatch(createExtraProductImages(files, res.data));
    dispatch(productCreated(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const updateProduct = (product, file) => async (dispatch) => {
  let config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    let data = new FormData();
    Object.entries(product).map((k) => {
      if (k[0] === 'details') {
        data.append(k[0], JSON.stringify(k[1]));
      } else {
        data.append(k[0], k[1]);
      }
    });

    if (file !== '' && file !== null && file !== undefined) {
      data.append('file', file);
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

export const removeProduct = (product) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/product/${product._id}`);
    dispatch(productRemoved(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const getAllProducts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/product/');
    dispatch(gotAllProducts(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const getCurrProduct = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/product/${localStorage.productID}`);
    dispatch(getExtraProductImagesData(localStorage.productID));
    dispatch(gotOneProduct(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const getSingleProduct = (productID) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/product/${productID}`);
    localStorage.setItem('productID', productID);
    dispatch(getExtraProductImagesData(localStorage.productID));
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

export const createExtraProductImages = (files, product) => async (dispatch) => {
  let data = new FormData();
  if (files) {
    files.map((v) => {
      console.log(v);
      data.append('file', v, v.name);
    });
  }
  console.log('hit');
  const config = {
    headers: {
      accept: 'application/json',
      'Accept-Language': 'en-US,en;q=0.8',
      'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
    },
  };

  try {
    await axios.post(`api/product/extra-images/${product._id}`, data, config);
  } catch (error) {
    console.log(error);
  }
};

export const createExtraProductImage = (img, name, productID) => async (dispatch) => {
  let data = new FormData();
  const config = {
    headers: {
      accept: 'application/json',
      'Accept-Language': 'en-US,en;q=0.8',
      'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
    },
  };

  data.append('file', img, name);

  try {
    const res = await axios.post(`/api/product/content-image/${productID}`, data, config);
    dispatch(extraProductImgCreated(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const updateImageName = (img, name, productID) => async (dispatch) => {
  let data = new FormData();
  data.append('name', name);
  data.append('productID', productID);
  const config = {
    headers: {
      accept: 'application/json',
      'Accept-Language': 'en-US,en;q=0.8',
      'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
    },
  };

  try {
    const res = await axios.put(
      `/api/product/extra-image/${img.filename}/${name}/${productID}`,
      data,
      config
    );
    dispatch(extraProductImageUpdated(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const deleteExtraProductImage = (img) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/product/content-image/${img.filename}`);
    dispatch(extraProductImageDeleted(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const getExtraProductImagesData = (productID) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/product/content-images/data/${productID}`);
    dispatch(gotExtraProductImages(res.data));
  } catch (error) {
    console.log(error);
  }
};

export default productSlice.reducer;
