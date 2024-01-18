import { Outlet, Navigate } from "react-router-dom";

import Topbar from "@/components/shared/Topbar";
import { useUserContext } from "@/context/AuthContext";

const RootLayout = () => {
  const { user } = useUserContext();
  
  return (
    <>
      {user.name == "" ? (
        <div className="w-full md:flex">
          <Topbar />
          
          <section className="flex flex-1 h-full">
            <Outlet />
          </section>
        </div>
      ) : (
        <Navigate to="/sign-up" />
      )}
    </>
  );
};

export default RootLayout;