import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import { Todo,TodoState } from '../models/todoState';
import axiosInstance from '@/app/services/api/repository';

export const createTask = createAsyncThunk("create", async (data: Todo) => {
  const header = {
    'Content-Type': 'application/json',
    'Authorization': 'JWT fefege...'
  };
  const response = await axiosInstance.post("tasks/create-task", data,{headers:header});
  const resData = response.data;
  localStorage.setItem("userInfo", JSON.stringify(resData));
  return (await resData.json()) as Todo;
});

export const getallTask = createAsyncThunk("alltask", async (pageNumber:number) => {
  const header = {
    'Content-Type': 'application/json',
    'Authorization': 'JWT fefege...'
  };
  const response = await axiosInstance.get("tasks/all-tasks",{params:{page:pageNumber},headers:header});
  const resData = response.data;
  localStorage.setItem("userInfo", JSON.stringify(resData));
  return (await resData.json()) as Array<Todo>;
});

export const gettaskById = createAsyncThunk("singletask", async (taskId:string) => {
  const header = {
    'Content-Type': 'application/json',
    'Authorization': 'JWT fefege...'
  };
  const response = await axiosInstance.get("tasks/single-task",{params:{_id:taskId},headers:header});
  const resData = response.data;
  localStorage.setItem("userInfo", JSON.stringify(resData));
  return (await resData.json()) as Todo;
});

export const deleteSingleTask = createAsyncThunk("deletetask", async (taskId:Todo) => {
  const header = {
    'Content-Type': 'application/json',
    'Authorization': 'JWT fefege...'
  };
  const response = await axiosInstance.delete("tasks/delete-task",{params:{_id:taskId._id},headers:header});
  const resData = response.data;
  localStorage.setItem("userInfo", JSON.stringify(resData));
  return (await resData.json()) as Todo;
});

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    loading: false,
    todos: [] as Todo[],
  } satisfies TodoState as TodoState,

  reducers: () => ({
    clearTask: (state)=>{
      state.loading=false;
      state.todos = []
    }
  }),
  extraReducers: (builder) => {
      builder
        .addCase(createTask.pending|| getallTask.pending || gettaskById.pending || deleteSingleTask.pending, (state) => {
          state.loading =true;
        })
        .addCase(createTask.rejected || getallTask.rejected || gettaskById.rejected || deleteSingleTask.rejected, (state, action) => {
          state.loading =false;
        }).addCase(createTask.fulfilled , (state, action) => {
          state.loading =false;
          state.todos.push(action.payload);
        }).addCase(getallTask.fulfilled , (state, action) => {
          state.loading =false;
          state.todos.concat(action.payload);
        }).addCase(gettaskById.fulfilled , (state, action) => {
          state.loading =false;
          //state.todos.concat(action.payload);
        }).addCase(deleteSingleTask.fulfilled , (state, action) => {
          state.loading =false;
          state.todos.splice(state.todos.indexOf(action.payload),1)
        })
        ;
    },
})



export const { clearTask } = todosSlice.actions
export default todosSlice.reducer;


// createTask: create.asyncThunk(async (data:Todo) => {
//   const header = {
//     'Content-Type': 'application/json',
//     'Authorization': 'JWT fefege...'
//   }
//   const response = await axiosInstance.post("tasks/create-task", data,{headers:header});
//   const resData = response.data;
//   localStorage.setItem("userInfo", JSON.stringify(resData));
//   return (await resData.json()) as Todo
//   },
//   {
//     pending: (state) => {
//       state.loading = true
//     },
//     rejected: (state, action) => {
//       state.loading = false
//     },
//     fulfilled: (state, action) => {
//       state.loading = false
//       state.todos.push(action.payload)
//     },
//   }
// ),

// getAllTask: create.asyncThunk(async (pageNumber:number) => {
//   const header = {
//     'Content-Type': 'application/json',
//     'Authorization': 'JWT fefege...'
//   }
//   const response = await axiosInstance.get("tasks/all-tasks",{params:{page:pageNumber},headers:header});
//   const resData = response.data;
//   localStorage.setItem("userInfo", JSON.stringify(resData));
//   return (await resData.json()) as Array<Todo>
//   },
//   {
//     pending: (state) => {
//       state.loading = true
//     },
//     rejected: (state, action) => {
//       state.loading = false
//     },
//     fulfilled: (state, action) => {
//       state.loading = false
//       state.todos.concat(action.payload)
//     },
//   }
// ),

// getTaskById: create.asyncThunk(async (taskId:string) => {
//   const header = {
//     'Content-Type': 'application/json',
//     'Authorization': 'JWT fefege...'
//   }
//   const response = await axiosInstance.get("tasks/single-task",{params:{_id:taskId},headers:header});
//   const resData = response.data;
//   localStorage.setItem("userInfo", JSON.stringify(resData));
//   return (await resData.json()) as Todo
//   },
//   {
//     pending: (state) => {
//       state.loading = true
//     },
//     rejected: (state, action) => {
//       state.loading = false
//     },
//     fulfilled: (state, action) => {
//       state.loading = false
//     },
//   }
// ),

// deleteTask: create.asyncThunk(async (taskId:Todo) => {
//   const header = {
//     'Content-Type': 'application/json',
//     'Authorization': 'JWT fefege...'
//   }
//   const response = await axiosInstance.delete("tasks/delete-task",{params:{_id:taskId._id},headers:header});
//   const resData = response.data;
//   localStorage.setItem("userInfo", JSON.stringify(resData));
//   return (await resData.json()) as Todo
//   },
//   {
//     pending: (state) => {
//       state.loading = true
//     },
//     rejected: (state) => {
//       state.loading = false
//     },
//     fulfilled: (state, action) => {
//       state.loading = false
//       state.todos.splice(state.todos.indexOf(action.payload),1)
//     },
//   }
// ),
