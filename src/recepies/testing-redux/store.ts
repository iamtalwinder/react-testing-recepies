// app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './features/theme/themeSlice';
import todoReducer from './features/todo/todoSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    todos: todoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
