import { Link, useLocation } from "react-router-dom";

import { navLinks } from "@/constants";

const LeftSidebar = () => {
  const { pathname } = useLocation();

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex gap-3 items-center">
          <h2 className="h2-bold text-foreground">FG POLL</h2>
        </Link>

        <div className="rounded-lg bg-card p-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.route;
            return (
              <Link
                key={`bottombar-${link.label}`}
                to={link.route}
                className={`${isActive && 'bg-border rounded-lg'} flex items-center gap-1 p-2 transition`}>
            <img
              src={link.imgURL}
              alt={link.label}
              width={20}
              height={20}
              className="dark:invert-white"
            />

            <p className="text-[10px] font-medium">{link.label}</p>
          </Link>
        );
      })}
        </div>
        <Link to="/neuro" className="flex gap-3 text-white items-center">
          neuro
        </Link>
      </div>

    </nav>
  );
};

export default LeftSidebar;