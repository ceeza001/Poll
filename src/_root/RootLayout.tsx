import { Outlet } from "react-router-dom";

import Topbar from "@/components/shared/Topbar";
import LeftSidebar from "@/components/shared/LeftSidebar";

const RootLayout = () => {
  
  return (
    <div className="w-full">
      <Topbar />
      <div className="w-full md:flex h-full">
        <LeftSidebar />
          <section className="flex flex-1 h-full">
            <Outlet />
          </section>
        </div>
    </div>
  );
};

export default RootLayout;