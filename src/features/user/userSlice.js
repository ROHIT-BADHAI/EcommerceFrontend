import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {fetchLoggedInUser, fetchLoggedInUserOrders,updateUser} from './userAPI';

const initialState = {
  status: 'idle',
  userInfo:null,
};
export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
  'user/fetchLoggedInUserOrders',
  async (userId) => {
    const response = await fetchLoggedInUserOrders(userId);
    return response.data;
  }
);


export const updateUserAsync = createAsyncThunk(
  'user/updateUserOrders',
  async (update) => {
    const response = await updateUser(update);
    return response.data;
  }
);


export const fetchLoggedInUserAsync = createAsyncThunk(
  'user/fetchLoggedInUser',
  async (id) => {
    const response = await fetchLoggedInUser(id);
    return response.data;
  }
);



export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: { },

  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        //this info is superset of loggedInUser data
        state.userInfo.orders = action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        //this info is superset of loggedInUser data
        state.userInfo = action.payload;
      })
      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        //this info is superset of loggedInUser data
        state.userInfo = action.payload;
      })
  },
});

export const {  } = userSlice.actions;
export const selectUserOrders = (state) => state.user.userInfo.orders;
export const selectUserInfo=(state)=>state.user.userInfo;


export default userSlice.reducer;
