import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react"
import { getUsers, restoreUser } from "../../services/userService";


const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [restoringId, setRestoringId] = useState(null);

  const [filters, setFilters] = useState({
    search: "",
    role: "",
    active: "",
    deleted: "false",
    sort: "createdAt",
    order: "desc",
    page: 1,
    limit: 10,
  });

  const [searchInput, setSearchInput] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const response = await getUsers(filters);

      setUsers(response.users);
      setPagination(response.pagination);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, [filters]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters((previous) => ({
        ...previous,
        search: searchInput,
        page: 1,
      }));
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [searchInput]);

  const handleRestore = async (userId) => {
    try {
      setRestoringId(userId)

      await restoreUser(userId);

      await fetchUsers();
    } catch (error) {
      console.error(error);
    } finally {
      setRestoringId(null);
    }
  }

  return (
    <div className="space-y-6">

      {/* Page Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">
            Users
          </h1>

          <p className="text-sm text-base-content/60 mt-1">
            Manage users and their access to the CRM.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-primary"
        >
          + Add User
        </button>
      </div>

      {/* Toolbar */}
      <div className="card bg-base-100 border border-base-300">
        <div className="card-body p-4">
          <div className="flex flex-col lg:flex-row gap-3">

            {/* Search */}
            <div className="relative flex-1">
              <input 
                type="text"
                value={searchInput}
                onChange={(event) => {
                  setSearchInput(event.target.value);
                }}
                placeholder="Search users..." 
                className="input input-bordered w-full pl-10"
              />

              <Search 
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40"
              /> 
            </div>

            {/* Role */}
            <select
              className="select select-bordered w-full xl:w-40"
              value={filters.role}
              onChange={(event) => {
                setFilters((previous) => ({
                  ...previous,
                  role: event.target.value,
                  page: 1,
                }));
              }}
            >
              <option value="">All roles</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="member">Member</option>
            </select>

            {/* Status */}
            <select 
              className="select select-bordered w-full xl:w-40"
              value={filters.active}
              onChange={(event) => {
                setFilters((previous) => ({
                  ...previous,
                  active: event.target.value,
                  page: 1,
                }));
              }}
            >
              <option value="">All users</option>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>

            {/* View */}
            <select
              className="select select-bordered w-full xl:w-40"
              value={filters.deleted}
              onChange={(event) => {
                setFilters((previous) => ({
                  ...previous,
                  deleted: event.target.value,
                  page: 1,
                }));
              }}
            >
              <option value="false">Current users</option>
              <option value="true">Deleted users</option>
              <option value="all">All users</option>
            </select>

            {/* Sort */}
            <select
              className="select select-bordered w-full xl:w-44"
              value={`${filters.sort}-${filters.order}`}
              onChange={(event) => {
                const [sort, order] = event.target.value.split("-");

                setFilters((previous) => ({
                  ...previous,
                  sort,
                  order,
                  page: 1,
                }))
              }}
              defaultValue="createdAt-desc"
            >
              <option value="createdAt-desc">Newest</option>
              <option value="createdAt-asc">Oldest</option>
              <option value="name-asc">Name A–Z</option>
              <option value="name-desc">Name Z–A</option>
              <option value="email-asc">Email A–Z</option>
              <option value="email-desc">Email Z–A</option>
            </select>
          </div>

        </div>
      </div>

      {/* Users Table */}
      <div className="card bg-base-100 border border-base-300">
        <div className="card-body p-0">
          <div className="relative overflow-x-auto">

            {loading && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-base-100/70 backdrop-blur-2xl">
                <span className="loading loading-spinner loading-lg text-primary"/>
              </div>
            )}

            <table className="table">

              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th className="text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    
                    {/* User */}
                    <td>
                      <div className="flex items-center gap-3">

                        <div className="avatar placeholder">
                          <div className="bg-primary text-primary-content w-10 rounded-full flex items-center justify-center">
                            <span>
                              {user.name?.charAt(0)?.toUpperCase() || "U"}
                            </span>
                          </div>
                        </div>

                        <div>
                          <p className="font-medium">
                            {user.name}
                          </p>
                        </div>

                      </div>
                    </td>

                    {/* Email */}
                    <td className="text-base-content/70">
                      {user.email}
                    </td>

                    {/* Role */}
                    <td>
                      <span className="badge badge-outline capitalize">
                        {user.role}
                      </span>
                    </td>

                    {/* Status */}
                    <td>
                      {user.isActive ? (
                        <span className="badge badge-success badge-outline">
                          Active
                        </span>
                      ) : (
                        <span className="badge badge-error badge-outline">
                          Inactive
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="text-right">
                      {filters.deleted === "true" ? (
                        <button
                          type="button"
                          className="btn btn-sm btn-outline"
                          disabled={restoringId === user.id}
                          onClick={() => handleRestore(user.id)}
                        >
                          {restoringId === user.id ? (
                            <>
                              <span className="loading loading-spinner loading-xs"/>
                              Restoring...
                            </>
                          ) : (
                            "Restore"
                          )}
                        </button>
                      ) : (
                        <Link
                          to={`/users/${user.id}`}
                          className="btn btn-ghost btn-sm"
                        >
                          Manage
                        </Link>
                      )}
                    </td>

                  </tr>
                ))}
              </tbody>
              
            </table>

          </div>

        </div>
      </div>

      {/* Pagination */}
      {pagination && (
        <div className="flex items-center justify-between">

          <p className="text-sm text-base-content/60">
            Showing {users.length} of {pagination.totalItems} users
          </p>

          <div className="join">

            <button
            type="button"
              className="join-item btn btn-sm"
              disabled={pagination.page === 1}
              onClick={() => {
                setFilters((previous) => ({
                  ...previous,
                  page: previous.page - 1,
                }));
              }}
            >
              ←
            </button>

            <button className="join-item btn btn-sm btn-active">
              {pagination.page} of {pagination.totalPages}
            </button>

            <button
              className="join-item btn btn-sm"
              disabled={pagination.page === pagination.totalPages}
              onClick={() => {
                setFilters((previous) => ({
                  ...previous,
                  page: previous.page + 1,
                }));
              }}
            >
              →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default UsersPage