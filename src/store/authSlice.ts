import storage  from 'common/storage'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import request from "api/request"
import { user_type } from '../lib/constant';
import { STORAGE_KEY } from 'common/storage/constant';

const initialState = {
  user: null,
  loading: true
}

export const getAuth = createAsyncThunk('auth/getAuth', async () => {
  try {
    const userAccessToken = await storage.loadString(STORAGE_KEY.user_access_token)
    if (userAccessToken) {
      const res = await request.post('me');
      return {...res.data.data, user_type: user_type.user};
    }
    const customerAccessToken = await storage.loadString(STORAGE_KEY.customer_access_token)
    if (customerAccessToken) {
      const res = await request.post('api-customer/me');
      return {...res.data.data, user_type: user_type.customer};
    }
    return false;
  } catch (error) {
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers:  (builder) => {
    builder.addCase(getAuth.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    })
  },
})

export const {setUser} = authSlice.actions;
export default authSlice.reducer;