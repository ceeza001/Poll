import { Routes, Route } from "react-router-dom";

import {
  Home,
  Create,
  Poll,
  EditPoll,
  Polls,
  Result
} from "@/_root/pages";

import RootLayout from "./_root/RootLayout";

import "./globals.css";

const App = () => {
  return (
    <main className="flex flex-col h-[100dvh]">
      <Routes>
        {/* dashboard routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit/polls/:id" element={<EditPoll />} />
          <Route path="/polls/:id" element={<Poll />} />
          <Route path="/polls" element={<Polls />} />
          <Route path="/results/:id" element={<Result />} />
          <Route path="*" element={<div>404 Not found</div>} />
        </Route>

        {/* courses routes */}
        
      </Routes>
    </main>
  );
};

export default App;