import { Routes, Route } from "react-router-dom";

import {
  Home,
  Vote,
  Result
} from "@/_root/pages";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import SigninForm from "@/_auth/forms/SigninForm";
import { Toaster } from "@/components/ui/toaster";

import "./globals.css";

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
        </Route>

        {/* private routes */}
        <Route element={< RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/vote" element={<Vote />} />
          <Route path="/result" element={<Result />} />
        </Route>
      </Routes>

      <Toaster />
    </main>
  );
};

export default App;