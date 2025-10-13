
import { useAppDispatch, useAppSelector } from '../hooks';
import { increment, reset } from '../features/counter/counterSlice';

export default function CounterCard() {
  const dispatch = useAppDispatch();
  const value = useAppSelector((s) => s.counter.value);

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="text-md font-semibold">Counter</h3>
      <div className="text-2xl font-semibold my-3">{value}</div>

      <div className="flex gap-2">
        <button
          onClick={() => dispatch(increment())}
          className="px-3 py-1 rounded bg-[color:var(--accent)] text-white hover:opacity-95"
        >
          Increment
        </button>
        <button
          onClick={() => dispatch(reset())}
          className="px-3 py-1 rounded border border-gray-200"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
