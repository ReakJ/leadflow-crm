import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PageTitle = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    let title = "Leadora";

    if (pathname === "/") {
      title = "Dashboard";
    } else if (pathname === "/leads") {
      title = "Leads";
    } else if (pathname === "/leads/new") {
      title = "Add Lead";
    } else if (pathname.endsWith("/notes")) {
      title = "Lead Notes";
    } else if (pathname.startsWith("/leads/")) {
      title = "Manage Lead";
    } else if (pathname === "/users") {
      title = "Users";
    } else if (pathname === "/users/new") {
      title = "Add User";
    } else if (pathname.startsWith("/users/")) {
      title = "Manage User";
    } else if (pathname === "/profile") {
      title = "Profile";
    } else if (pathname === "/settings") {
      title = "Settings";
    } else if (pathname === "/login") {
      title = "Sign In";
    }

    document.title = title === "Leadora"
      ? title
      : `${title} · Leadora`;
  }, [pathname]);

  return null;
};

export default PageTitle;