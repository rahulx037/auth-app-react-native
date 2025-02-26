import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import { Todo,TodoState } from '../models/todoState';
import axiosInstance from '@/app/services/api/repository';


const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    loading: false,
    todos: [] as Todo[],
  } satisfies TodoState as TodoState,

  reducers: (create) => ({
    createTask: create.asyncThunk(async (data:Todo) => {
      const header = {
        'Content-Type': 'application/json',
        'Authorization': 'JWT fefege...'
      }
      const response = await axiosInstance.post("tasks/create-task", data,{headers:header});
      const resData = response.data;
      localStorage.setItem("userInfo", JSON.stringify(resData));
      return (await resData.json()) as Todo
      },
      {
        pending: (state) => {
          state.loading = true
        },
        rejected: (state, action) => {
          state.loading = false
        },
        fulfilled: (state, action) => {
          state.loading = false
          state.todos.push(action.payload)
        },
      }
    ),

    getAllTask: create.asyncThunk(async (pageNumber:number) => {
      const header = {
        'Content-Type': 'application/json',
        'Authorization': 'JWT fefege...'
      }
      const response = await axiosInstance.get("tasks/all-tasks",{params:{page:pageNumber},headers:header});
      const resData = response.data;
      localStorage.setItem("userInfo", JSON.stringify(resData));
      return (await resData.json()) as Array<Todo>
      },
      {
        pending: (state) => {
          state.loading = true
        },
        rejected: (state, action) => {
          state.loading = false
        },
        fulfilled: (state, action) => {
          state.loading = false
          state.todos.concat(action.payload)
        },
      }
    ),

    getTaskById: create.asyncThunk(async (taskId:string) => {
      const header = {
        'Content-Type': 'application/json',
        'Authorization': 'JWT fefege...'
      }
      const response = await axiosInstance.get("tasks/single-task",{params:{_id:taskId},headers:header});
      const resData = response.data;
      localStorage.setItem("userInfo", JSON.stringify(resData));
      return (await resData.json()) as Todo
      },
      {
        pending: (state) => {
          state.loading = true
        },
        rejected: (state, action) => {
          state.loading = false
        },
        fulfilled: (state, action) => {
          state.loading = false
        },
      }
    ),

    deleteTask: create.asyncThunk(async (taskId:Todo) => {
      const header = {
        'Content-Type': 'application/json',
        'Authorization': 'JWT fefege...'
      }
      const response = await axiosInstance.delete("tasks/delete-task",{params:{_id:taskId._id},headers:header});
      const resData = response.data;
      localStorage.setItem("userInfo", JSON.stringify(resData));
      return (await resData.json()) as Todo
      },
      {
        pending: (state) => {
          state.loading = true
        },
        rejected: (state) => {
          state.loading = false
        },
        fulfilled: (state, action) => {
          state.loading = false
          state.todos.splice(state.todos.indexOf(action.payload),1)
        },
      }
    ),

  }),
})

export const { addTodo, deleteTodo, fetchAllTodo } = todosSlice.actions
export default todosSlice.reducer;