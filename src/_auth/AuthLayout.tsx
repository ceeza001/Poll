import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  
  return (
    <>
      <section className="h-screen mx-auto max-h-screen md:overflow-y-hidden">
            <img 
              src="/assets/images/logo.svg" 
              alt="logo"
              className="m-2"
            />
            <div className="mt-10 md:bg-dark-2 items-center flex-col p-[1rem] rounded-lg md:bg-dark-2 m-2">
              <Outlet />
            </div>
          </section>

      <img
        src="/assets/images/side-img.svg"
        alt="logo"
        className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
      />
    </>
  );
}