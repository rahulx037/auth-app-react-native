import {  createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Auth,AuthState,initialAuthData,User,NewUser } from '../models/authState';
import axiosInstance from '@/app/services/api/repository';

export const login = createAsyncThunk("login", async (data: User) => {
  const response = await axiosInstance.post("auth/signin", data);
  const resData = response.data;

  localStorage.setItem("userInfo", JSON.stringify(resData));

  return resData;
});

export const register = createAsyncThunk("register", async (data: NewUser) => {
  const response = await axiosInstance.post(
    "auth/signin",
    data
  );
  const resData = response.data;

  localStorage.setItem("userInfo", JSON.stringify(resData));

  return resData;
});

export const logout = createAsyncThunk("logout", async () => {
  const response = await axiosInstance.post("/logout", {});
  const resData = response.data;

  localStorage.removeItem("userInfo");

  return resData;
});

export const getUser = createAsyncThunk(
  "users/profile",
  async (userId: string) => {
    const response = await axiosInstance.get(
      `/users/${userId}`
    );
    return response.data;
  }
);

const loginSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    auth: new initialAuthData() ,
  } satisfies AuthState as AuthState,

  reducers: (create) => ({
    
    signIn: create.asyncThunk(async (data: User) => {
        const response = await axiosInstance.post("auth/signin", data);
        const resData = response.data;
        localStorage.setItem("userInfo", JSON.stringify(resData));
        return (await resData.json()) as Auth
      },
      {
        pending: (state) => {
          state.loading = true
        },
        rejected: (state) => {
          state.loading = false
        },
        fulfilled: (state, action: PayloadAction<Auth>) => {
          state.loading = false
          state.auth = action.payload
        },
      }
    ),
  
    signUp: create.asyncThunk(async (data:NewUser) => {
      const response = await axiosInstance.post("auth/signin",data);
      const resData = response.data;
    
      localStorage.setItem("userInfo", JSON.stringify(resData));
      return (await resData.json()) as Auth
      },
      {
        pending: (state) => {
          state.loading = true
        },
        rejected: (state) => {
          state.loading = false
        },
        fulfilled: (state, action: PayloadAction<Auth>) => {
          state.loading = false
          state.auth = action.payload
        },
      }
    ),

    signOut: create.asyncThunk(async (data:User) => {
      const response = await axiosInstance.post("auth/signout",data);
      const resData = response.data;
    
      localStorage.setItem("userInfo", JSON.stringify(resData));
      return (await resData.json()) as Auth
      },
      {
        pending: (state) => {
          state.loading = true
        },
        rejected: (state) => {
          state.loading = false
        },
        fulfilled: (state, action: PayloadAction<Auth>) => {
          state.loading = false
          state.auth = action.payload
        },
      }
    ),
  }),
})

export const { signUp, signIn } = loginSlice.actions

export default loginSlice.reducer;