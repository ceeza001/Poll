import { Link, useNavigate } from "react-router-dom";

import { navLinks } from "@/constants";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Topbar = () => {
  const navigate = useNavigate();
  
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
                <div className=" p-2 border-b">
                  FG Poll
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
          </SheetContent>
        </Sheet>
      </div>
    </section>
  );
};

export default Topbar;