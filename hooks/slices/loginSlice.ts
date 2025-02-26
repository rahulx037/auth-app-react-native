import {  createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Auth,AuthState,User,NewUser } from '../models/authState';
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
    auth: {} as Auth ,
  } satisfies AuthState as AuthState,

  reducers: (create) => ({
    
    signIn: create.asyncThunk(async (data: User) => {
        const res = await fetch(`myApi/todos?id=${body}`)
        return (await res.json()) as Auth
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
  
    signUp: create.asyncThunk(
      async (body:Auth,createAsyncThunk) => {
        const res = await fetch(`myApi/todos?id=${body}`)
        return (await res.json()) as Auth
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