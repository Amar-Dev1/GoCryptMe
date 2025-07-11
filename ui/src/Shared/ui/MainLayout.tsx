import Sidebar from "../Components/Sidebar";
import { Outlet } from "react-router-dom";
import Wrapper from "../Components/Wrapper";

const MainLayout = () => {
  return (
    <div className="main-layout grid grid-cols-12 h-screen w-screen">
      <div className="col-span-3 overflow-y-auto">
        <Sidebar />
      </div>
      <Wrapper className="col-span-9 m-12">
        <Outlet />
      </Wrapper>
    </div>
  );
};

export default MainLayout;
