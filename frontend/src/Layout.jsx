import React from "react";
import { ThemeProvider } from "./components/themeprovider.jsx";
import { Outlet } from "react-router-dom";
import Nav from "./components/ui/Nav.jsx";
import { AuroraBackground } from "./components/ui/aurora-background.jsx";
export default function Layout() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuroraBackground>
        <Nav
          navItems={[
            { link: "/", name: "Home" },
            { link: "/about", name: "About" },
            { link: "/contact", name: "Contact" },
            { link: "/generate", name: "Generate Cards" },
          ]}
          className="fixed top-10 left-10 right-10 bg-[#f7f7f72f] dark:bg-zinc-900 shadow-md rounded-lg"
        />
        <div className="pt-16">
          <Outlet />
        </div>
      </AuroraBackground>
    </ThemeProvider>
  );
}
