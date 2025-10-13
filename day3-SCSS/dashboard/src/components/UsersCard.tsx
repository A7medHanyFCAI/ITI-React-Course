import  { useState } from 'react';
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
    <div className="card">
      <h3>Users</h3>
      <div className="row">
        <input
          placeholder="User ID (leave empty for all)"
          value={idInput}
          onChange={(e) => setIdInput(e.target.value.replace(/[^\d]/g, ''))}
        />
        <button onClick={fetchById}>Fetch</button>
        <button onClick={() => { setIdInput(''); dispatch(clearUsers()); }}>Clear</button>
      </div>

      <div style={{ marginTop: 10 }}>
        <button onClick={fetchAll}>Fetch All Users</button>
      </div>

      <div style={{ marginTop: 12 }}>
        {loading && <div className="muted">Loading...</div>}
        {error && <div className="error">{error}</div>}
        {!loading && !error && users.length === 0 && <div className="muted">No users</div>}

        <ul className="users-list">
          {users.map((u) => (
            <li key={u.id}>
              <strong>{u.name}</strong> — {u.email}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
