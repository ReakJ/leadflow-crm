import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from "react-router-dom";

import LoginPage from "../pages/auth/LoginPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import LeadsPage from "../pages/leads/LeadsPage";
import UsersPage from "../pages/users/UsersPage";
import AddUserPage from "../pages/users/AddUserPage";
import ManageUserPage from "../pages/users/ManageUserPage";
import ProfilePage from "../pages/profile/ProfilePage";

import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public Route */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected Area */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="leads" element={<LeadsPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="users/new" element={<AddUserPage />} />
          <Route path="users/:id" element={<ManageUserPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Route>
    </>
  )
)

export default router;