
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
    <div className="min-h-screen bg-[color:var(--bg)] p-6">
      <div className="max-w-[1100px] mx-auto">
        <header className="flex justify-between items-center mb-6">
          <div className="text-lg">Welcome, <strong>{username}</strong></div>
          <button
            onClick={() => dispatch(logout())}
            className="py-1 px-3 rounded-md bg-red-600 text-white hover:opacity-95"
          >
            Logout
          </button>
        </header>

        <main>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            <CounterCard />
            <TimerCard />
            <NotesCard />
            <UsersCard />
          </div>
        </main>
      </div>
    </div>
  );
}
