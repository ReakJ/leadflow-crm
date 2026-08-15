import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <h2>Navbar</h2>
    
      <Outlet/>
    </>
  );
}

export default MainLayout;