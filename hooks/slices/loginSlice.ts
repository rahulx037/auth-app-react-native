import {  createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Auth,AuthState,initialAuthData,User,NewUser } from '../models/authState';
import axiosInstance from '@/app/services/api/repository';

export const login = createAsyncThunk("login", async (data: User) => {
  const response = await axiosInstance.post("auth/signin", data);
  const resData = response.data;

  localStorage.setItem("userInfo", JSON.stringify(resData));

  return (await resData.json()) as Auth;
});

export const register = createAsyncThunk("signup", async (data: NewUser) => {
  const response = await axiosInstance.post(
    "auth/signup",
    data
  );
  const resData = response.data;

  localStorage.setItem("userInfo", JSON.stringify(resData));

  return (await resData.json()) as Auth
});

export const logout = createAsyncThunk("logout", async () => {
  const response = await axiosInstance.post("auth/logout", {});
  const resData = response.data;

  localStorage.removeItem("userInfo");

  return (await resData.json()) as Auth
});

export const getUser = createAsyncThunk(
  "getuser",
  async (userId: string) => {
    const response = await axiosInstance.get(
      `auth/getuser/${userId}`
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

   reducers:{
    clearAuthState:(state) => {
      state.loading = false
      state.auth = new initialAuthData()
    }
   },

  extraReducers: (builder) => {
    builder
      .addCase(login.pending|| register.pending || logout.pending || getUser.pending, (state) => {
        state.loading =true;
      })
      .addCase(login.fulfilled || register.fulfilled || logout.fulfilled || getUser.fulfilled, (state, action) => {
        state.loading =false;
        state.auth = action.payload;
      })
      .addCase(login.rejected || register.rejected || logout.rejected || getUser.rejected, (state, action) => {
        state.loading =false;
      }).addCase(register.pending, (state) => {
        state.loading =true;
      });
  },

})

// reducers: (create) => ({
    
//   signIn: create.asyncThunk(async (data: User) => {
//       const response = await axiosInstance.post("auth/signin", data);
//       const resData = response.data;
//       localStorage.setItem("userInfo", JSON.stringify(resData));
//       return (await resData.json()) as Auth
//     },
//     {
//       pending: (state) => {
//         state.loading = true
//       },
//       rejected: (state) => {
//         state.loading = false
//       },
//       fulfilled: (state, action: PayloadAction<Auth>) => {
//         state.loading = false
//         state.auth = action.payload
//       },
//     }
//   ),

//   signUp: create.asyncThunk(async (data:NewUser) => {
//     const response = await axiosInstance.post("auth/signin",data);
//     const resData = response.data;
  
//     localStorage.setItem("userInfo", JSON.stringify(resData));
//     return (await resData.json()) as Auth
//     },
//     {
//       pending: (state) => {
//         state.loading = true
//       },
//       rejected: (state) => {
//         state.loading = false
//       },
//       fulfilled: (state, action: PayloadAction<Auth>) => {
//         state.loading = false
//         state.auth = action.payload
//       },
//     }
//   ),

//   signOut: create.asyncThunk(async (data:User) => {
//     const response = await axiosInstance.post("auth/signout",data);
//     const resData = response.data;
  
//     localStorage.setItem("userInfo", JSON.stringify(resData));
//     return (await resData.json()) as Auth
//     },
//     {
//       pending: (state) => {
//         state.loading = true
//       },
//       rejected: (state) => {
//         state.loading = false
//       },
//       fulfilled: (state, action: PayloadAction<Auth>) => {
//         state.loading = false
//         state.auth = action.payload
//       },
//     }
//   ),
// }),

export const { clearAuthState } = loginSlice.actions

export default loginSlice.reducer;