import { Link } from "react-router-dom";

import { useUserContext } from "@/context/AuthContext";

const LeftSidebar = () => {
  const { user } = useUserContext();
  
  return (
    <section className="leftsidebar">
      <div className="flex-between py-4 px-5">
        <Link to="/" className="flex gap-3 items-center h3-bold">
          Miss sonum 2023A
        </Link>

        <div className="flex gap-4">
          {user.name}
        </div>
      </div>
    </section>
  );
};

export default LeftSidebar;