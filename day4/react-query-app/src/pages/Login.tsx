import { useNavigate } from "react-router-dom";
import { useState } from "react";

const FAKE_USER = { username: "admin", password: "1234" };

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      form.username === FAKE_USER.username &&
      form.password === FAKE_USER.password
    ) {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/users");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        placeholder="Username"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button type="submit">Login</button>
      <p className="hint">Try <strong>admin</strong> / <strong>1234</strong></p>
    </form>
  );
}
