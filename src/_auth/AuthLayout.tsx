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
        <div className="rounded-lg border border-border md:max-w-2/3">
          <Outlet />
        </div>
      </section>

      <footer className="w-full text-center p-[0.5rem] border-t border-border">
        Nigerian Navy Secondary School
      </footer>
    </>
  );
}