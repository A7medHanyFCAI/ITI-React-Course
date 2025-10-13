import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import counterReducer from './features/counter/counterSlice';
import timerReducer from './features/timer/timerSlice';
import notesReducer from './features/notes/notesSlice';
import usersReducer from './features/users/usersSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    counter: counterReducer,
    timer: timerReducer,
    notes: notesReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
