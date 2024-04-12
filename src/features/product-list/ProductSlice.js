import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllProduct, fetchAllProductByFilter, fetchAllBrands, fetchAllCategory, fetchProductById, createProduct, updateProduct } from './ProductAPI';

const initialState = {
  products: [],
  status: 'idle',
  totalItems: 0,
  brands: [],
  categories: [],
  selectedProduct : null,
};

export const fetchAllProductAsync = createAsyncThunk(
  'product/fetchAllProduct',
  async (product) => {
    const response = await fetchAllProduct(product);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);



export const fetchProductByIdAsync = createAsyncThunk(
  'product/fetchProductById',
  async (id) => {
    const response = await fetchProductById(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchAllProductByFilterAsync = createAsyncThunk(
  'product/fetchAllProductByFilter',
  async ({filter, sort, pagination}) => {
    const response = await fetchAllProductByFilter(filter, sort, pagination);
    // The value we return becomes the `fulfilled` action payload   
    return response.data;
  }
);

export const fetchBrandsAsync = createAsyncThunk(
  'product/fetchAllBrands',
  async () => {
    const response = await fetchAllBrands();
    // The value we return becomes the `fulfilled` action payload   
    return response.data;
  }
);

export const fetchAllCategoriesAsync = createAsyncThunk(
  'product/fetchAllCategory',
  async () => {
    const response = await fetchAllCategory();
    // The value we return becomes the `fulfilled` action payload   
    return response.data;
  }
);

export const createProductAsync = createAsyncThunk(
  'product/createProduct',
  async (product) => {
    const response = await createProduct(product);
    // The value we return becomes the `fulfilled` action payload   
    return response.data;
  }
);
export const updateProductAsync = createAsyncThunk(
  'product/updateProduct',
  async (update) => {
    const response = await updateProduct(update);
    // The value we return becomes the `fulfilled` action payload   
    return response.data;
  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null
    }
    
  },
  extraReducers: (builder) => {
    builder
      // Reducers for fetchAllProductAsync
      .addCase(fetchAllProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      })
      // Reducers for fetchAllProductByFilterAsync
      .addCase(fetchAllProductByFilterAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductByFilterAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      //reducer for fetchBrandsAsync
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.brands = action.payload;
      })
      //reducer for fetchAllCategoriesAsync
      .addCase(fetchAllCategoriesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllCategoriesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.categories = action.payload;
      })
      //reducer for fetchProductByIdAsync
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedProduct = action.payload;
      })
      //create Product async for adding product
      .addCase(createProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products.push(action.payload);
      })
      //updateProductAsync for patching product
      .addCase(updateProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.products.findIndex((product) => product.id === action.payload.id);
        state.products[index] = action.payload;
      })

  },
});

export const { clearSelectedProduct } = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;
export const selectTotalItems = (state) => state.product.totalItems;
export const selectBrands = (state) => state.product.brands;
export const selectCategories = (state) => state.product.categories;
export const selectProductById = (state) => state.product.selectedProduct;


export default productSlice.reducer;
