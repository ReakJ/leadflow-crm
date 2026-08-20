import {
  LayoutDashboard,
  ContactRound,
  UsersRound,
  LogOut
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/useAuth"


const Sidebar = () => {
  const { user, logout } = useAuth();

  const navigation = [
    {
      label: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
    },
    {
      label: "Leads",
      path: "/leads",
      icon: ContactRound,
    },
  ];

  if (user?.role !== "member") {
    navigation.push({
      label: "Users",
      path: "/users",
      icon: UsersRound,
    },)
  }

  return (
    <aside className="hidden lg:flex w-64 h-full bg-base-100 border-r border-base-300 flex-col">
      <div className="px-5 pt-5">
        <p className="text-xs uppercase tracking-widest text-base-content/50">
          CRM Workspace
        </p>
      </div>

      <div className="px-3 mt-6">
        <NavLink
          to="/profile"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-base-200 transition-colors"
        >
          <div className="avatar placeholder">
            <div className="bg-primary text-primary-content w-10 rounded-full flex items-center justify-center">
              <span>
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </span>
            </div>
          </div>

          <div className="min-w-0">
            <p className="font-medium truncate">
              {user?.name || "User"}
            </p>
            
            <p className="text-xs text-base-content/50 capitalize">
              {user?.role || "Member"}
            </p>
          </div>
        </NavLink>
      </div>

      <nav className="px-3 mt-6 flex-1">
        <p className="px-3 mb-2 text-xs font-medium uppercase tracking-wider text-base-content/40">
          Workspace
        </p>
        
        <ul className="menu gap-1 p-0 w-full">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === "/"}
                  className={({ isActive }) =>
                    isActive 
                      ? "bg-primary text-primary-content"
                      : "text-base-content/70"
                  }
                >
                  <Icon size={18} />
                  {item.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-3 border-t border-base-300">
        <button
          type="button"
          onClick={logout}
          className="btn btn-ghost w-full justify-start"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  )
}

export default Sidebar;