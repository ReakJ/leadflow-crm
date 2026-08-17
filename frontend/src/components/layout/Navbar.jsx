import { Bell } from "lucide-react";
import { useAuth } from "../../context/useAuth"

const Navbar = () => {
  const { user } = useAuth()
  return (
    <header className="navbar min-h-16 bg-base-100 border-b border-base-300 px-6">
      <div className="flex-1">
        <h1 className="text-xl font-bold text-primary">
          LeadFlow
        </h1>

      </div>

        <div className="flex-none flex items-center gap-2">
          <button
            type="button"
            className="btn btn-ghost btn-circle"
          >
            <Bell size={20} />
          </button>

          <div className="avatar placeholder">
            <div className="bg-primary text-primary-content w-9 rounded-full flex items-center justify-center">
              <span>
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </span>
            </div>
          </div>
        </div>
    </header>
  )
}

export default Navbar;