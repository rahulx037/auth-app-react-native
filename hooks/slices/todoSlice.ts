import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import { Data, Todo,TodoState } from '../models/todoState';
import axiosInstance from '@/app/services/api/repository';
import { TOKEN } from '@/app/utils/constants';
import { getToken } from '@/app/services/storage/localStore';

export const createTask = createAsyncThunk("create", async (data: Data) => {
  const header = {
    'Content-Type': 'application/json',
    'authorization': await getToken() ?? TOKEN
  };
  const response = await axiosInstance.post("tasks/create-task", data,{headers:header});
  const resData = response.data;
  return (resData) as Todo;
});

export const getallTask = createAsyncThunk("alltask", async (pageNumber:number) => {
  const header = {
    'Content-Type': 'application/json',
    'authorization': await getToken() ?? TOKEN
  };
  const response = await axiosInstance.get("tasks/all-tasks",{params:{page:pageNumber},headers:header});
  const resData = response.data;
  return resData as Todo
});

export const gettaskById = createAsyncThunk("singletask", async (taskId:string) => {
  const header = {
    'Content-Type': 'application/json',
    'Authorization': await getToken() ?? TOKEN
  };
  const response = await axiosInstance.get("tasks/single-task",{params:{_id:taskId},headers:header});
  const resData = response.data;
  localStorage.setItem("userInfo", JSON.stringify(resData));
  return (resData) as Todo
});

export const deleteSingleTask = createAsyncThunk("deletetask", async (taskId:Todo) => {
  const header = {
    'Content-Type': 'application/json',
    'Authorization': await getToken() ?? TOKEN
  };
  const response = await axiosInstance.delete("tasks/delete-task",{params:{_id:taskId._id},headers:header});
  const resData = response.data;
  localStorage.setItem("userInfo", JSON.stringify(resData));
  return (resData) as Todo
});

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    loading: false,
    todos: [] as Data[],
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
          state.todos.push(action.payload.data as Data);
        }).addCase(getallTask.fulfilled , (state, action) => {
          state.loading =false;
          state.todos = [...(action.payload.data) as Data[]]
        }).addCase(gettaskById.fulfilled , (state, action) => {
          state.loading =false;
          //state.todos.concat(action.payload);
        }).addCase(deleteSingleTask.fulfilled , (state, action) => {
          state.loading =false;
          state.todos.splice(state.todos.indexOf(action.payload.data as Data),1)
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
