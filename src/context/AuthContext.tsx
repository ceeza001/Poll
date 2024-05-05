import { useNavigate } from "react-router-dom";
import { createContext, useContext, useEffect, useState } from "react";

import { IUser } from "@/types";
import { getCurrentUser } from "@/lib/appwrite/api";

export const INITIAL_USER = {
  id: "",
  name: "",
  username: "",
  email: "",
  matricNo: "",
  type: "",
  level: "",
  imageUrl: "",
  bio: "",
  onboarded: false,
};

const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  isOnboarded: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  setIsOnboarded: () => {},
  checkAuthUser: async () => false as boolean,
};

type IContextType = {
  user: IUser;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  isOnboarded: boolean;
  setIsOnboarded: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const checkAuthUser = async () => {
    setIsLoading(true);
    try {
      const currentAccount = await getCurrentUser();
      if (currentAccount) {
        setUser({
          id: currentAccount.$id,
          name: currentAccount.name,
          email: currentAccount.email,
          matricNo: currentAccount.matricNo,
          type: currentAccount.type,
          level: currentAccount.level,
          username: currentAccount.username,
          department: currentAccount.department,
          imageUrl: currentAccount.imageUrl,
          bio: currentAccount.bio,
        });
        setIsAuthenticated(true);
        setIsOnboarded(currentAccount.onboarded);

        return true;
      }

      return false;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const cookieFallback = localStorage.getItem("cookieFallback");
    if (
      cookieFallback === "[]" ||
      cookieFallback === null ||
      cookieFallback === undefined
    ) {
      navigate("/sign-in");
    }

    checkAuthUser();
  }, []);

  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    isOnboarded,
    checkAuthUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useUserContext = () => useContext(AuthContext);