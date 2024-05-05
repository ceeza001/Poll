import { Link, useLocation, useNavigate } from "react-router-dom";

import { Loader } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { useSignOutAccount } from "@/lib/react-query/queries";
import { useUserContext, INITIAL_USER } from "@/context/AuthContext";
import { leftSidebarLinks } from "@/constants";

const LeftSidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user, setUser, setIsAuthenticated, isLoading } = useUserContext();

  const { mutate: signOut } = useSignOutAccount();

  const handleSignOut = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    signOut();
    setIsAuthenticated(false);
    setUser(INITIAL_USER);
    navigate("/sign-in");
  };

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex gap-3 items-center">
          <h2 className="h2-bold text-foreground">ANDS</h2>
        </Link>

        {isLoading || !user.email ? (
          <div className="h-14">
            <Loader />
          </div>
        ) : (
          <Link to={`/dashboard/${user.id}`} className="flex gap-3 items-center">
            <img
              src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
              alt="profile"
              className="h-14 w-14 rounded-full"
            />
            <div className="flex flex-col">
              <p className="body-bold">{user.name}</p>
              <p className="small-regular text-light-3">@{user.name}</p>
            </div>
          </Link>
        )}

        <div className="rounded-lg bg-card p-2">
          {leftSidebarLinks.map((link) => {
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

      <Button
        variant="ghost"
        className="shad-button_ghost w-[4rem]"
        onClick={(e) => handleSignOut(e)}>
        <img 
          src="/assets/icons/logout.svg" 
          alt="logout" 
          width={28}
          height={28} />
        <p className="small-medium lg:base-medium">Logout</p>
      </Button>
    </nav>
  );
};

export default LeftSidebar;