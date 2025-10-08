
import { useAppDispatch, useAppSelector } from '../hooks';
import { increment, reset } from '../features/counter/counterSlice';

export default function CounterCard() {
  const dispatch = useAppDispatch();
  const value = useAppSelector((s) => s.counter.value);

  return (
    <div className="card">
      <h3>Counter</h3>
      <div className="big">{value}</div>
      <div className="row">
        <button onClick={() => dispatch(increment())}>Increment</button>
        <button onClick={() => dispatch(reset())}>Reset</button>
      </div>
    </div>
  );
}
