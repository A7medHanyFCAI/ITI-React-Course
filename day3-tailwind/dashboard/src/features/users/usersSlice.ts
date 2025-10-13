import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type User = { id: number; name: string; email: string };
type UsersState = { users: User[]; loading: boolean; error?: string };

const initialState: UsersState = { users: [], loading: false, error: undefined };


export const fetchUsers = createAsyncThunk<
  User[],
  number | undefined,
  { rejectValue: string }
>('users/fetch', async (id, thunkAPI) => {
  try {
    const url = id
      ? `https://jsonplaceholder.typicode.com/users/${id}`
      : `https://jsonplaceholder.typicode.com/users`;
    const resp = await fetch(url);
    if (resp.status === 404) return thunkAPI.rejectWithValue('Not found');
    const data = await resp.json();

    return id ? [data] : data;
  } catch (err) {
    return thunkAPI.rejectWithValue('Network error');
  }
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearUsers(state) {
      state.users = [];
      state.error = undefined;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message || 'Error';
        state.users = [];
      });
  },
});

export const { clearUsers } = usersSlice.actions;
export default usersSlice.reducer;
