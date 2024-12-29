import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils"; // Ensure you have this utility function

export default function Nav({
  navItems,
  className
}) {
  return (
    <nav className={cn("flex space-x-4 p-4", className)}>
      {navItems.map((navItem, idx) => (
        <Link
          key={`link-${idx}`}
          to={navItem.link}
          className={cn(
            "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
          )}
        >
          <span className="block sm:hidden">{navItem.icon}</span>
          <span className="hidden sm:block text-sm">{navItem.name}</span>
        </Link>
      ))}
      <button
        className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full"
      >
        <span>Login</span>
        <span
          className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px"
        />
      </button>
    </nav>
  );
}
