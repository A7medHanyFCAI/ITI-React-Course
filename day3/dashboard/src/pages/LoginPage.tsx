import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { login, clearError } from '../features/auth/authSlice';

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const authError = useAppSelector((s) => s.auth.error);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function submit(e: React.FormEvent) {
    e.preventDefault();
    dispatch(login({ username, password }));
  }

  return (
    <div className="center-card">
      <h2>Login</h2>
      <form onSubmit={submit} className="form">
        <label>
          Username
          <input value={username} onChange={(e) => { setUsername(e.target.value); if (authError) dispatch(clearError()); }} />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={(e) => { setPassword(e.target.value); if (authError) dispatch(clearError()); }} />
        </label>
        <button type="submit">Login</button>
      </form>
      {authError ? <p className="error">{authError}</p> : <p className="hint">Try <strong>admin</strong> / <strong>1234</strong></p>}
    </div>
  );
}
