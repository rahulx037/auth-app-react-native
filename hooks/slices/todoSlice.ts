import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import { Todo,TodoState } from '../models/todoState';


const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    loading: false,
    todos: [],
  } satisfies TodoState as TodoState,

  reducers: (create) => ({

    deleteTodo: create.reducer<number>((state, action) => {
      state.todos.splice(action.payload, 1)
    }),

    addTodo: create.preparedReducer(
      (todo:Todo) => {
        return { payload: todo }
      },
      // action type is inferred from prepare callback
      (state, action) => {
        state.todos.push(action.payload)
      }
    ),

    fetchAllTodo: create.asyncThunk(
      async (page:number,thunkApi) => {
        const res = await fetch(`myApi/todos?id=${page}`)
        return (await res.json()) as Array<Todo>
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
  }),
})

export const { addTodo, deleteTodo, fetchAllTodo } = todosSlice.actions
export default todosSlice.reducer;