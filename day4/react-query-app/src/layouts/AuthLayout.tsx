import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="auth-layout">
      <h1>Login</h1>
      <Outlet />
    </div>
  );
}
