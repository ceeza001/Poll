import { useState, useEffect } from "react"
import { Outlet, Navigate } from "react-router-dom";

import { useUserContext } from "@/context/AuthContext";
import { Topbar, LeftSidebar } from "@/components/shared"

const RootLayout = () => {
  const { isAuthenticated, isOnboarded } = useUserContext();
  
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