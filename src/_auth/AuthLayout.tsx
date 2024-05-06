import { Outlet, Navigate } from "react-router-dom";

import { useUserContext } from "@/context/AuthContext";

export default function AuthLayout() {
  const { isAuthenticated } = useUserContext();
  
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  
  return (
    <>
      <section className="flex flex-1 justify-center items-center flex-col">
        <Outlet />
      </section>

      <footer className="w-full text-center p-[0.5rem] border-t border-border">
        <div className="flex small-regular flex-center gap-2 w-full">
          <p>Privacy Policy</p> | <p>Terms And Conditions</p>
        </div>

        <div>
          <p>©2024 L.M.S. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}