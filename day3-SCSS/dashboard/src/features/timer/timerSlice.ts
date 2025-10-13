import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type TimerState = { seconds: number; running: boolean };
const initialState: TimerState = { seconds: 0, running: false };

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    incrementSecond(state) {
      state.seconds += 1;
    },
    setRunning(state, action: PayloadAction<boolean>) {
      state.running = action.payload;
    },
    resetTimer(state) {
      state.seconds = 0;
      state.running = false;
    },
  },
});

export const { incrementSecond, setRunning, resetTimer } = timerSlice.actions;
export default timerSlice.reducer;
