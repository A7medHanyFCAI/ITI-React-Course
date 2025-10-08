
import { useAppDispatch, useAppSelector } from '../hooks';
import { logout } from '../features/auth/authSlice';
import CounterCard from '../components/CounterCard';
import TimerCard from '../components/TimerCard';
import NotesCard from '../components/NotesCard';
import UsersCard from '../components/UsersCard';

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const username = useAppSelector((s) => s.auth.username);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>Welcome, <strong>{username}</strong></div>
        <button onClick={() => dispatch(logout())}>Logout</button>
      </header>

      <main>
        <div className="cards-grid">
          <CounterCard />
          <TimerCard />
          <NotesCard />
          <UsersCard />
        </div>
      </main>
    </div>
  );
}
