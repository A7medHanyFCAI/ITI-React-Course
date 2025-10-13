import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  username?: string;
  isAuthenticated: boolean;
  error?: string;
};

const PREDEFINED = { username: 'admin', password: '1234' };

const initialState: AuthState = {
  isAuthenticated: false,
  username: undefined,
  error: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ username: string; password: string }>) {
      const { username, password } = action.payload;
      if (username === PREDEFINED.username && password === PREDEFINED.password) {
        state.isAuthenticated = true;
        state.username = username;
        state.error = undefined;
      } else {
        state.isAuthenticated = false;
        state.username = undefined;
        state.error = 'Invalid credentials';
      }
    },
    logout(state) {
      state.isAuthenticated = false;
      state.username = undefined;
      state.error = undefined;
    },
    clearError(state) {
      state.error = undefined;
    },
  },
});

export const { login, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
