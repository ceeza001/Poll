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

import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queries";
import { SignupValidation } from "@/lib/validation";
import { useUserContext } from "@/context/AuthContext";

const SignUp = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      email: "",
      name: "",
      voterId: "",
      password: "",
    },
  });

  // Queries
  const { mutateAsync: createUserAccount, isPending: isCreatingAccount } = useCreateUserAccount();
  const { mutateAsync: signInAccount, isPending: isSigningInUser } = useSignInAccount();
  
  // Handler
  const handleSignup = async (user: z.infer<typeof SignupValidation>) => {
    try {
      const newUser = await createUserAccount(user);

      if (!newUser) {
        toast({ title: "Sign up failed. Please try again.", });

        return;
      }

      setErrorMessage("");
      
      const session = await signInAccount({
        email: user.email,
        password: user.password,
      });

      if (!session) {
        toast({ title: "Something went wrong. Please login your new account", });

        navigate("/sign-in");

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
    } catch (error) {
      console.log({ error });
      // Use assertion to tell TypeScript the type of error
      setErrorMessage((error as Error)?.message || "Unknown error");
      toast({ title: (error as Error)?.message || "Unknown error" });
    }
  };
  
  return (
    <Form {...form}>
      <div className="text-foreground p-[1rem] w-full sm:w-420 flex-center flex-col">
        <h2 className="h1-bold">E-Voting</h2>

        <h2 className="h2-bold pt-5 sm:pt-12">
          Create an account
        </h2>

        {!errorMessage ?
          <p className="text-center small-medium md:base-regular mt-2">
           Enter your credentials to use this platform.
        </p>
        :
          <p className="text-red-500 text-center mx-auto small-medium md:base-regular mt-2">
            {errorMessage === 'Voter ID not found in the database.' ? errorMessage : 'A user with the same email, already exists.'}
          </p>
        }
        
        <form
          onSubmit={form.handleSubmit(handleSignup)}
          className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="relative">
                <div className="relative">
                  <FormLabel className="absolute top-[23%] left-2 z-50">
                    <img 
                      src="/assets/icons/profile.svg"
                      alt="user"
                      className="w-6 h-6 dark:invert-white"
                    />
                  </FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Full name" className="shad-input z-[-1] pl-10" {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="relative">
                <div className="relative">
                  <FormLabel className="absolute top-[23%] left-2 z-50">
                    <img 
                      src="/assets/icons/email.svg"
                      alt="email"
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
            name="voterId"
            render={({ field }) => (
              <FormItem className="relative">
                <div className="relative">
                  <FormLabel className="absolute top-[23%] left-2 z-50">
                    <img 
                      src="/assets/icons/id.svg"
                      alt="user"
                      className="w-6 h-6 dark:invert-white"
                    />
                  </FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Voter's ID" className="shad-input z-[-1] pl-10" {...field} />
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

          <Button type="submit" className="shad-button_primary body-bold">
            {isCreatingAccount || isSigningInUser || isUserLoading ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              "Sign Up"
            )}
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2">
            Already have an account?
            <Link
              to="/sign-in"
              className="text-[#E67800] text-small-semibold ml-1">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignUp;