import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DynamicTitle from "../components/DynamicTitle";

const MainLayout = () => {
  return (
    <>
      <DynamicTitle />
      <Navbar />
      <main className="bg-base-400 min-h-[calc(100vh-273px)]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
