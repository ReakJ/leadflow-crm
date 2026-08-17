import { Outlet } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

const MainLayout = () => {
  return (
    <div className="h-screen bg-base-200 overflow-hidden">
      <Navbar/>

      <div className="flex h-[calc(100vh-4rem)]">
        <Sidebar />

        <main className="flex-1 min-w-0 overflow-y-auto p-6">
          <Outlet/> 
        </main>
      </div>
    </div>
  );
}

export default MainLayout;