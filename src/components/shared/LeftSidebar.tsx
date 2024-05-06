import { useEffect } from "react";
import { Link } from "react-router-dom";

import { navLinks } from "@/constants";
import { Button } from "../ui/button";
import { useUserContext, INITIAL_USER } from "@/context/AuthContext";
import { useSignOutAccount } from "@/lib/react-query/queries";

const LeftSidebar = () => {
  
  const { user, setIsAuthenticated, setUser } = useUserContext();
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  
  const handleSignOut = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    signOut();
    setIsAuthenticated(false);
    setUser(INITIAL_USER);
  };
  useEffect(() => {
    if (isSuccess) navigate('/sign-in');
  }, [isSuccess]);
  
  return (
    <nav className="leftsidebar">
      <div className="relative flex flex-col gap-4 h-[100vh]">
        <Link to="/" className="flex gap-3 items-center">
          <h2 className="h2-bold text-foreground">FG POLL</h2>
        </Link>

        
        <div className="rounded-lg shadow-lg border border-border p-2 flex items-center gap-2">
          <img 
            src={user.imageUrl}
            alt={user.name}
            className="w-[2.3rem] h-[2.3rem] rounded-full"
          />
          <h2 className="text-[14px] truncate">{user.name}</h2>
        </div>
        
        <div className="rounded-lg p-2 mt-4 flex flex-col">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.route}
              className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg"
            >
              <img
                src={link.imgURL}
                alt={link.label}
                className="w-[1.7rem] h-[1.7rem]"
              />
              <h2 className="text-[14px] font-semibold">{link.label}</h2>
            </Link>
          ))}
                    
          {!user.isAdmin && (
            <Link
              to="/admin"
              className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg"
            >
              <img
                src="/assets/icons/profile.svg"
                alt="admin"
                className="w-[1.7rem] h-[1.7rem] border border-border rounded-full"
              />
              <h2 className="text-[14px] font-semibold">Admin</h2>
            </Link>
          )}
        </div>

        <div className="absolute bottom-14 w-full">
          <Link to="/create">
            <Button
              className="mb-2 flex rounded-lg justify-center items-center shad-button_dark p-2 w-full"
            >  
              <img 
                src="/assets/icons/create.svg" 
                alt="logout" 
                width={24}
                height={24}
                className="invert-white"
              />
                <p className="small-medium lg:base-medium">Create</p>
              </Button>
            </Link>
            
            <Button
              className="shad-button_primary w-full"
              onClick={(e) => handleSignOut(e)}>
              <img 
                src="/assets/icons/logout.svg" 
                alt="logout" 
                width={24}
                height={24}
                className="invert-white"
              />
              <p className="small-medium lg:base-medium">Logout</p>
            </Button>
          </div>
      </div>

    </nav>
  );
};

export default LeftSidebar;