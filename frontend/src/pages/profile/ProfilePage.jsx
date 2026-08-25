import { useAuth } from "../../context/useAuth";

const ProfilePage = () => {
  const { user } = useAuth();
  
  if (!user) {
    return null;
  }

  console.log(user)

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">
          Profile
        </h1>

        <p className="text-sm text-base-content/60 mt-1">
          View your account information.
        </p>
      </div>

      {/* Profile Overview */}
      <div className="card bg-base-100 border border-base-300">
        <div className="card-body p-6">

          <div className="flex items-center gap-6">
            
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

              <p className="font-medium mt-1 capitalize">
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

      {/* Account Details */}
      <div className="card bg-base-100 border border-base-300">
        <div className="card-body">

          <h2 className="card-title">
            Account Details
          </h2>

          <div className="mt-2">

            <p className="text-sm text-base-content/50">
              Member since
            </p>

            <p className="font-medium mt-1">
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "—"
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage