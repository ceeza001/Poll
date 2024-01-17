import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useUserContext } from "@/context/AuthContext";

const Topbar = () => {
  const navigate = useNavigate();
   const { user } = useUserContext();
  
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