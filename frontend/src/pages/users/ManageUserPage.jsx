import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getUserById, updateUserStatus, deleteUser } from "../../services/userService";

import ConfirmDialog from "../../components/common/ConfirmDialog";

const ManageUserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  async function handleStatusChange() {
    const newStatus = !user.isActive;

    try {
      setUpdatingStatus(true);

      const response = await updateUserStatus(id, newStatus);

      setUser(response.user);
    } catch (error) {
      console.error(error);
    } finally {
      setUpdatingStatus(false);
    }
  }

  async function handleDelete() {
    try {
      setDeleting(true);

      await deleteUser(id);

      navigate("/users");
    } catch (error) {
      console.error(error);
    } finally {
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  }

  useEffect(() => {
    async function fetchUser() {
      try {
        const response =  await getUserById(id);

        console.log(response);

        setUser(response.user);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [id]);

  if (loading) {
    return <div>Loading user...</div>
  }

  if (!user) {
    return <div>User not found.</div>
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          to="/users"
          className="btn btn-ghost btn-sm"
        >
          ←
        </Link>

        <div>
          <h1 className="text-2xl font-bold">
            Manage User
          </h1>

          <p className="text-sm text-base-content/60 mt-1">
            Manage this user's account and access.
          </p>
        </div>
      </div>

      {/* User Overview */}
      <div className="card bg-base-100 border border-base-300">
        <div className="card-body p-6">

          <div className="flex items-center gap-5">

            <div className="avatar placeholder">
              <div className="bg-primary text-primary-content w-16 h-16 rounded-full text-xl flex items-center justify-center">
                <span>
                  {user.name?.charAt(0)?.toUpperCase() || "U"}
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold">
                  {user.name}
                </h2>

                <span className="badge badge-outline capitalize">
                  {user.role}
                </span>
              </div>

              <p className="text-sm text-base-content/60 mt-1">
                {user.email}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Account Status */}
      <div className="card bg-base-100 border border-base-300">
        <div className="card-body">
          
          <h2 className="card-title">
            Account Status
          </h2> 

          <div className="flex items-center justify-between gap-4 mt-2">

            <div>
              <p className="font-medium">
                {user.isActive ? "Active" : "Inactive"}
              </p>

              <p className="text-sm text-base-content/60">
                {user.isActive
                  ? "This user can access the CRM."
                  : "This user cannot access the CRM."
                }
              </p>
            </div>

            <input 
              type="checkbox"
              className="toggle toggle-primary"
              checked={user.isActive}
              onChange={handleStatusChange}
              disabled={updatingStatus}
            />
          </div>
        </div>
      </div>

      {/* Account Information */}
      <div className="card bg-base-100 border border-base-300">
        <div className="card-body">

          <h2 className="card-title">
            Account Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">

            <div>
              <p className="text-sm text-base-content/50">
                Name
              </p>

              <p className="font-medium mt-1">
                {user.name}
              </p>
            </div>

            <div>
              <p className="text-sm text-base-content/50">
                Email
              </p>

              <p className="font-medium mt-1">
                {user.email}
              </p>
            </div>

            <div>
              <p className="text-sm text-base-content/50">
                Role
              </p>

              <p className="font-medium capitalize mt-1">
                {user.role}
              </p>
            </div>

            <div>
              <p className="text-sm text-base-content/50">
                Status
              </p>

              <p className="font-medium mt-1">
                {user.isActive ? "Active" : "Inactive"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="card bg-base-100 border border-error/30">
        <div className="card-body">
          
          <h2 className="card-title text-error">
            Danger Zone
          </h2>

          <div className="flex items-center justify-between gap-4">
            
            <div>
              <p className="font-medium">
                Delete this user
              </p>

              <p className="text-sm text-base-content/60">
                This will remove the user from the active user list.
              </p>
            </div>

            <button
              type="button"
              className="btn btn-error btn-outline" 
              onClick={() => setShowDeleteConfirm(true)}           
            >
              Delete User
            </button>
          </div>
        </div>
      </div>

      {showDeleteConfirm && (
        <ConfirmDialog 
          title="Delete User?"
          message={
            <>
              Are you sure you want to delete{" "}
              <span className="font-semibold text-base-content">
                {user.name}
              </span>
              ?
              <span className="block text-sm text-base-content/60 mt-2">
                This will remove the user from the current user list.
                The account can be restored later.
              </span>
            </>
          }
          confirmText="Delete User"
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteConfirm(false)}
          loading={deleting}
        />
      )}
    </div>
  )
}

export default ManageUserPage;