import { useEffect } from "react";
import { Link, useNavigate, NavLink, useLocation } from "react-router-dom";

import { INavLink } from "@/types";
import { Loader } from "@/components/shared/";
import { Button } from "../ui/button";
import { useUserContext, INITIAL_USER } from "@/context/AuthContext";
import { useSignOutAccount } from "@/lib/react-query/queries";

const Topbar = () => {
  const navigate = useNavigate();
   const { user, setUser, setIsAuthenticated, isLoading } = useUserContext();
  const { mutate: signOut, isSuccess } = useSignOutAccount();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);

  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        <Link to="/" className="flex gap-3 items-center h3-bold">
          FC poll
        </Link>

        <div className="flex gap-4">
          {user.name}
        </div>
      </div>
    </section>
  );
};

export default Topbar;