import React from "react";
import { ThemeProvider } from "./components/themeprovider.jsx";
import Navbar from "./components/ui/navbar.jsx";
import { Outlet } from "react-router-dom";
import Header from "./components/ui/Header.jsx";
export default function Layout() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {/* <Header /> */}
      <Outlet />
    </ThemeProvider>
  );
}
