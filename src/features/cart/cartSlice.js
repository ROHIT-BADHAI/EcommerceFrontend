import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCart,deleteItemFromCart,fetchCartByUserId, resetCardAfterOrder, updateCart } from './cartAPI';

const initialState = {
  status:"idle ",
  items: [],
};
export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async (item) => {
    const response = await addToCart(item); 
    return response.data;
  }
);

export const fetchCartByUserIdAsync = createAsyncThunk(
  'cart/fetchCartByUserId',
  async (userId) => {
    const response = await fetchCartByUserId(userId); 
    return response.data;
  }
);


export const updateCartAsync = createAsyncThunk(
  'cart/updateCart',
  async (update) => {
    const response = await updateCart(update); 
    return response.data;
  }
);

export const deleteItemFromCartAsync = createAsyncThunk(
  'cart/deleteItemFromCart',
  async (itemId) => {
    const response = await deleteItemFromCart(itemId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);


export const resetCardAfterOrderAsync = createAsyncThunk(
  'cart/resetCardAfterOrder',
  async (userId) => {
    const response = await resetCardAfterOrder(userId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: 'cart ',
  initialState,
 
  reducers: { 
  },

  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload);
      })
      .addCase(fetchCartByUserIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCartByUserIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items=action.payload;
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index=state.items.findIndex(item=>item.id===action.payload.id)
        state.items[index]=action.payload;
      })
      .addCase(deleteItemFromCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteItemFromCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index=state.items.findIndex(item=>item.id===action.payload.id)
        state.items.splice(index,1);  
      })
      .addCase(resetCardAfterOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetCardAfterOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items=[]
      })
  },
});

export const {   } = cartSlice.actions;
export const selectCart = (state) => state.cart.items;



export default cartSlice.reducer;
