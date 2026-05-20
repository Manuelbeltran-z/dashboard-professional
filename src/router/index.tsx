import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import ProtectedRoute from "../components/ProtectedRoute";
import DashboardLayout from "../pages/DashboardLayout";
import UsersPage from "../pages/UsersPage";
import UserDetailPage from "../pages/UserDetailPage";
import PostsPage from "../pages/PostsPage";

export default function IndexRouters() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="users" element={<UsersPage />} />
          <Route path="users/:id" element={<UserDetailPage />} />
          <Route path="posts" element={<PostsPage />} />
        </Route>
      </Route>
      <Route path="*" element={<LoginPage />} />
    </Routes>
  );
}
