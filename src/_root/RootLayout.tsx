import { Outlet } from "react-router-dom";

import { Topbar, LeftSidebar } from "@/components/shared"

const RootLayout = () => {
  
  return (
    <>
      <div className="w-full md:flex">
        <Topbar />
        <LeftSidebar />
        
        <section className="w-full mb-[3.4rem]">
          <Outlet />
        </section>
      </div>
    </>
  );
};

export default RootLayout;