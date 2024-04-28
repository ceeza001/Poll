import { Routes, Route } from "react-router-dom";

import {
  Home,
  Vote,
  Result
} from "@/_root/pages";

import RootLayout from "./_root/RootLayout";
import { Toaster } from "@/components/ui/toaster";

import "./globals.css";

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* public routes */}
        
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