import { Link, Outlet, useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

function NavBar() {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  return (
    <nav
      style={{
        background: "#1e293b",
        padding: "12px 24px",
        display: "flex",
        gap: 24,
        alignItems: "center",
      }}
    >
      <Link
        data-testid="link-users-test"
        to="/dashboard/users"
        style={{ color: "white", textDecoration: "none" }}
      >
        Usuarios
      </Link>
      <Link
        data-testid="link-posts-test"
        to="/dashboard/posts"
        style={{ color: "white", textDecoration: "none" }}
      >
        Posts
      </Link>
      <button
        data-testid="button-logout-test"
        onClick={() => {
          logout();
          navigate("/login");
        }}
        style={{ marginLeft: "auto", padding: "6px 12px", cursor: "pointer" }}
      >
        Logout
      </button>
    </nav>
  );
}

export default function DashboardLayout() {
  const { user } = useAuthStore();
  return (
    <div>
      <h1
        data-testid="user-name-test"
        style={{
          padding: "12px 24px",
          background: "#0f172a",
          color: "white",
          margin: 0,
        }}
      >
        Bienvenido: {user?.name}
      </h1>
      <NavBar />
      <div style={{ padding: 24 }}>
        <Outlet />
      </div>
    </div>
  );
}
