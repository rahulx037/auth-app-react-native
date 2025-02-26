import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import todoReducer from './slices/todoSlice';
import loginReducer from './slices/loginSlice';

const rootReducer = combineReducers({
    todos: todoReducer,
    auth: loginReducer,
 });

export const store = configureStore({
   reducer: rootReducer,
   middleware: getDefaultMiddleware =>
     getDefaultMiddleware({immutableCheck: false, serializableCheck: false}),
 });


// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export default store;


