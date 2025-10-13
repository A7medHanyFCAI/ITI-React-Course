import { useEffect, useRef } from 'react';
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
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="text-md font-semibold">Timer</h3>
      <div className="text-2xl font-semibold my-3">{seconds}s</div>

      <div className="flex gap-2">
        <button
          onClick={() => dispatch(setRunning(true))}
          className="px-3 py-1 rounded bg-[color:var(--accent)] text-white hover:opacity-95"
        >
          Start
        </button>
        <button
          onClick={() => dispatch(setRunning(false))}
          className="px-3 py-1 rounded border border-gray-200"
        >
          Pause
        </button>
        <button
          onClick={() => dispatch(resetTimer())}
          className="px-3 py-1 rounded border border-gray-200"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
