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
    <div className="min-h-screen bg-[color:var(--bg)] flex items-start">
      <div className="w-full max-w-md mx-auto mt-20 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>

        <form onSubmit={submit} className="space-y-4">
          <label className="block text-sm">
            <div className="mb-1">Username</div>
            <input
              value={username}
              onChange={(e) => { setUsername(e.target.value); if (authError) dispatch(clearError()); }}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)]"
              autoComplete="username"
            />
          </label>

          <label className="block text-sm">
            <div className="mb-1">Password</div>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); if (authError) dispatch(clearError()); }}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)]"
              autoComplete="current-password"
            />
          </label>

          <button
            type="submit"
            className="w-full py-2 rounded-md bg-[color:var(--accent)] text-white hover:opacity-95"
          >
            Login
          </button>
        </form>

        {authError ? (
          <p className="text-sm text-[color:var(--danger)] mt-3">{authError}</p>
        ) : (
          <p className="text-sm text-[color:var(--muted)] mt-3">Try <strong>admin</strong> / <strong>1234</strong></p>
        )}
      </div>
    </div>
  );
}
