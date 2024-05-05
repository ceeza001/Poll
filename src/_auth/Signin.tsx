import * as z from "zod";
import { useState } from "react"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/shared/Loader";
import { useToast } from "@/components/ui/use-toast";

import { SigninValidation } from "@/lib/validation";
import { useSignInAccount } from "@/lib/react-query/queries";
import { useUserContext } from "@/context/AuthContext";

const SignIn = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  const [showPassword, setShowPassword] = useState(false);

  // Query
  const { mutateAsync: signInAccount, isPending } = useSignInAccount();

  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignin = async (user: z.infer<typeof SigninValidation>) => {    
    const session = await signInAccount(user);

    if (!session) {
      toast({ title: "Login failed. Please try again." });

      return;
    }

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();

      navigate("/");
    } else {
      toast({ title: "Login failed. Please try again.", });

      return;
    }
  };

  return (
    <Form {...form}>
      <div className="text-foreground p-[1rem] w-full sm:w-420 flex-center flex-col">
        <h2 className="h1-bold">L.M.S</h2>

        <h2 className="h2-bold pt-5 sm:pt-12">
          Welcome back!
        </h2>

        <p className="text-center small-medium md:base-regular mt-2">
          Let's keep the momentum going.
        </p>
        
        <form
          onSubmit={form.handleSubmit(handleSignin)}
          className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="relative">
                <div className="relative">
                  <FormLabel className="absolute top-[23%] left-2 z-50">
                    <img 
                      src="/assets/icons/email.svg"
                      alt="password"
                      className="w-6 h-6 dark:invert-white"
                    />
                  </FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Email" className="shad-input z-[-1] pl-10" {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="relative">
                  <FormLabel className="absolute top-[23%] left-2 z-50">
                    <img 
                      src="/assets/icons/lock.svg"
                      alt="password"
                      className="w-6 h-6 dark:invert-white"
                    />
                  </FormLabel>
                  <FormControl>
                    <Input type={!showPassword ? "password" : "text"} placeholder="Password" className="shad-input z-[-1] pl-10" {...field} />
                  </FormControl>
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-[23%] right-2 z-50">
                    <img 
                      src={`/assets/icons/${!showPassword ? "eye-slash" : "eye"}.svg`}
                      alt="password"
                      className="w-6 h-6 dark:invert-white"
                    />
                  </span>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="w-full text-right text-border">
            <p>Forgot your password?</p>
          </div>

          <Button type="submit" className="shad-button_primary body-bold">
            {isPending || isUserLoading ? (
              <div className="flex-center gap-2 invert-white">
                <Loader /> Loading...
              </div>
            ) : (
              "Sign In"
            )}
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
            Don&apos;t have an account?
            <Link
              to="/sign-up"
              className="text-[#E67800] text-small-semibold ml-1">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignIn;