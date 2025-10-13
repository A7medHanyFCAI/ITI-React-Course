import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchUsers, clearUsers } from '../features/users/usersSlice';

export default function UsersCard() {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector((s) => s.users);
  const [idInput, setIdInput] = useState('');

  const fetchAll = () => dispatch(fetchUsers(undefined));
  const fetchById = () => {
    const id = idInput.trim() === '' ? undefined : Number(idInput);
    dispatch(fetchUsers(id));
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="text-md font-semibold">Users</h3>

      <div className="flex gap-2 mt-3">
        <input
          className="flex-1 px-3 py-2 border rounded-md"
          placeholder="User ID (leave empty for all)"
          value={idInput}
          onChange={(e) => setIdInput(e.target.value.replace(/[^\d]/g, ''))}
        />
        <button onClick={fetchById} className="px-3 py-2 rounded-md bg-[color:var(--accent)] text-white hover:opacity-95">Fetch</button>
        <button onClick={() => { setIdInput(''); dispatch(clearUsers()); }} className="px-3 py-2 rounded-md border">Clear</button>
      </div>

      <div className="mt-3">
        <button onClick={fetchAll} className="px-3 py-2 rounded-md border">Fetch All Users</button>
      </div>

      <div className="mt-3">
        {loading && <div className="text-sm text-[color:var(--muted)]">Loading...</div>}
        {error && <div className="text-sm text-[color:var(--danger)]">{error}</div>}
        {!loading && !error && users.length === 0 && <div className="text-sm text-[color:var(--muted)]">No users</div>}

        <ul className="mt-2 space-y-2">
          {users.map((u) => (
            <li key={u.id} className="flex flex-col">
              <span className="font-medium">{u.name}</span>
              <span className="text-sm text-[color:var(--muted)]">{u.email}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
