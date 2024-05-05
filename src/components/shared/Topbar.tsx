import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { navLinks } from "@/constants";
import { Button } from "../ui/button";
import { useUserContext, INITIAL_USER } from "@/context/AuthContext";
import { useSignOutAccount } from "@/lib/react-query/queries";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";

const Topbar = () => {
  const navigate = useNavigate();
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
    if (isSuccess) navigate('/');
  }, [isSuccess]);
  return (
    <section className="topbar">
      <div className="flex-between p-2">
        <Link to="/" className="flex gap-3 items-center">
          <h2 className="h2-bold text-[#275817]">FG Poll</h2>
        </Link>
        
        <Sheet>
          <SheetTrigger className="focus:outline-none">
            <img
              src="/assets/icons/menu.svg"
              alt="menu"
              className="dark:invert-white w-[2.3rem] h-[2.3rem]"
            />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>
                <div className="rounded-lg shadow-lg border border-border p-2 flex items-center gap-2">
                  <img 
                    src={user.imageUrl}
                    alt={user.name}
                    className="w-[2.3rem] h-[2.3rem] rounded-full"
                  />
                  <h2 className="text-[14px] truncate">{user.name}</h2>
                </div>
              </SheetTitle>

              <SheetDescription>
                <div className="flex flex-col">
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
                </div>
              </SheetDescription>
            </SheetHeader>
            <SheetFooter>
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
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </section>
  );
};

export default Topbar;