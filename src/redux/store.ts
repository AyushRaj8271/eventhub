// src/redux/store.ts

import { configureStore } from '@reduxjs/toolkit';
import eventReducer from './eventSlice';

const store = configureStore({
  reducer: {
    events: eventReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>; // RootState
export type AppDispatch = typeof store.dispatch;

export default store;