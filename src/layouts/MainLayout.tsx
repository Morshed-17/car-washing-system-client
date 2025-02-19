import { Footer } from "@/components/shared/Footer/Footer";
import { Navbar } from "@/components/shared/Header/Navbar";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div>
      <Navbar/>
      <Outlet />
      <Footer/>
    </div>
  );
};

export default MainLayout;
