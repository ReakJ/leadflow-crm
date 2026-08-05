import { Outlet } from "react-router-dom";
import React from 'react'

const MainLayout = () => {
  return (
    <>
      <h2>Navbar</h2>
    
      <Outlet/>
    </>
  );
}

export default MainLayout;