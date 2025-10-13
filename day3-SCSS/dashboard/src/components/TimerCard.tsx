import  { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { incrementSecond, setRunning, resetTimer } from '../features/timer/timerSlice';

export default function TimerCard() {
  const dispatch = useAppDispatch();
  const { seconds, running } = useAppSelector((s) => s.timer);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = window.setInterval(() => {
        dispatch(incrementSecond());
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [running, dispatch]);

  return (
    <div className="card">
      <h3>Timer</h3>
      <div className="big">{seconds}s</div>
      <div className="row">
        <button onClick={() => dispatch(setRunning(true))}>Start</button>
        <button onClick={() => dispatch(setRunning(false))}>Pause</button>
        <button onClick={() => dispatch(resetTimer())}>Reset</button>
      </div>
    </div>
  );
}
