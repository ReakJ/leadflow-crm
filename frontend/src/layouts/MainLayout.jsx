import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import PageTitle from "../components/common/PageTitle";

const MainLayout = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  return (
    <div className="h-screen bg-base-200 overflow-hidden">
      <PageTitle />

      <Navbar
        onMenuClick={() => setMobileSidebarOpen((previous) => !previous)}
      />

      <div className="flex h-[calc(100vh-4rem)]">
        <Sidebar />
        
        {/* Backdrop */}
        {mobileSidebarOpen && (
          <div 
            className="fixed top-16 right-0 bottom-0 left-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}

        {/* Mobile Sidebar */}
        <div 
          className={`
            fixed top-16 bottom-0 left-0 z-50 lg:hidden
            transition-transform duration-300 ease-out
            ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            `}
        >
          <Sidebar 
            mobile
            onNavigate={() => setMobileSidebarOpen(false)}
          />
        </div>  

        <main className="flex-1 min-w-0 overflow-y-auto p-6">
          <Outlet/> 
        </main>
      </div>
    </div>
  );
}

export default MainLayout;