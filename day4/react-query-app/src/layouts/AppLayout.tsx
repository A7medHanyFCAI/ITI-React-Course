import { Outlet, Link } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="app-layout">
      <nav>
        <div>
          <Link to="/users">Users</Link>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem("isLoggedIn");
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      </nav>
      <Outlet />
    </div>
  );
}
