import { Bell, Settings, UserRound } from "lucide-react";

import { Link } from "react-router-dom";
import { useAuth } from "../../context/useAuth"

const Navbar = () => {
  const { user } = useAuth()
  return (
    <header className="navbar min-h-16 bg-base-100 border-b border-base-300 px-6">
      <div className="flex-1">
        <Link
          to="/"
          className="flex items-center gap-2 w-fit"
          aria-label="Leadora Dashboard"
        >
          <img
            src="/leadora-logo.png"
            alt="Leadora"
            className="h-9 w-9 object-contain"
          />

          <span className="text-xl font-bold text-primary">
            Leadora
          </span>
        </Link>
      </div>

      <div className="flex-none flex items-center gap-2">
        <button
          type="button"
          className="btn btn-ghost btn-circle"
          aria-label="Notifications"
        >
          <Bell size={20} />
        </button>

        <div className="dropdown dropdown-end">
          <button
            type="button"
            tabIndex={0}
            className="avatar placeholder cursor-pointer"
            aria-label="Account menu"
          >
            <div className="bg-primary text-primary-content w-9 rounded-full flex items-center justify-center">
              <span>
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </span>
            </div>
          </button>

          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-50 mt-3 w-56 p-2 shadow-lg border border-base-300"
          >
            <li className="menu-title">
              <span>{user?.name || "User"}</span>
              <span className="text-xs font-normal">
                {user?.email}
              </span>
            </li>

            <div className="divider my-1"/>

            <li>
              <Link to="/profile">
                <UserRound size={17}/>
                Profile
              </Link>
            </li>

            <li>
              <Link to="/settings">
                <Settings size={17}/>
                Settings
              </Link>
            </li>
          </ul>
        </div>

      </div>
    </header>
  )
}

export default Navbar;