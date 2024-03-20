import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchProductsByFilterSortPagination,fetchBrands,fetchCategories,fetchProductById, createProduct, updateProduct } from './productApi';
import { act } from 'react-dom/test-utils';

const initialState = {
  products:[],
  brands:[],
  categories:[],
  status: 'idle',
  totalItems:0,
  selectedProduct:null,
};

export const fetchProductsByFilterSortPaginationAsync = createAsyncThunk(
  'product/fetchProductsByFilterSortPagination',
  async (sortFilter) => {
    const response = await fetchProductsByFilterSortPagination(sortFilter);
    return response.data;
  }
);

export const fetchProductByIdAsync = createAsyncThunk(
  'product/fetchProductById',
  async (id) => {
    const response = await fetchProductById(id);
    return response.data;
  }
);

export const fetchCategoriesAsync = createAsyncThunk(
  'product/fetchCategories',
  async () => {
    const response = await fetchCategories();
    return response.data;
  }
);

export const fetchBrandsAsync = createAsyncThunk(
  'product/fetchBrands',
  async () => {
    const response = await fetchBrands();
    return response.data;
  }
);

export const createProductAsync = createAsyncThunk(
  'product/create',
  async (product) => {
    const response = await createProduct(product);
    return response.data;
  }
);

export const updateProductAsync = createAsyncThunk(
  'product/update',
  async (product) => {
    const response = await updateProduct(product);
    return response.data;
  }
);


export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearSelectedProduct:(state)=>{
      state.selectedProduct=null;
    }
   },

  extraReducers: (builder) => {
    builder
       .addCase(fetchProductsByFilterSortPaginationAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByFilterSortPaginationAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload.products;
        state.totalItems=action.payload.totalItems;
      })
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.categories = action.payload;
      })
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.brands = action.payload;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedProduct = action.payload;
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products.push(action.payload);
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index=state.products.findIndex(product=>product.id===action.payload.id)
        state.products[index]=action.payload;

      })
  },
});

export const { clearSelectedProduct } = productSlice.actions;
export const selectAllProducts = (state) => state.product.products;
export const totalProducts=(state)=>state.product.totalItems
export const selectCategories = (state) => state.product.categories;
export const selectBrands = (state) => state.product.brands;
export const selectedProductById=(state)=>state.product.selectedProduct;
export default productSlice.reducer;
