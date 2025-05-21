import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="bg-base-400 max-w-screen-7xl mx-auto px-4 md:px-12 lg:px-16 xl:px-24 min-h-[calc(100vh-273px)]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
