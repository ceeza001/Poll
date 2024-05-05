import { Routes, Route } from "react-router-dom";

import {
  Home,
  Create,
  Poll,
  EditPoll,
  Polls,
} from "@/_root/pages";

import Signup from "@/_auth/Signup";
import Signin from "@/_auth/Signin";
import RootLayout from "./_root/RootLayout";
import AuthLayout from "./_auth/AuthLayout";

import "./globals.css";

const App = () => {
  return (
    <main className="flex flex-col h-[100dvh]">
      <Routes>
        {/* auth routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/sign-in" element={<Signin />} />
        </Route>

        {/* dashboard routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit/polls/:id" element={<EditPoll />} />
          <Route path="/polls/:id" element={<Poll />} />
          <Route path="/polls" element={<Polls />} />
          <Route path="*" element={<div>404 Not found</div>} />
        </Route>

        {/* courses routes */}
        
      </Routes>
    </main>
  );
};

export default App;