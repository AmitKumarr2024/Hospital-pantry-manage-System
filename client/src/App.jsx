import React, { Suspense } from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Toaster />
      <Navbar />
      <Suspense>
        <Outlet />
      </Suspense>
    </>
  );
};

export default App;
