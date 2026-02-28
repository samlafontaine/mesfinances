"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = {
  "/": {
    name: "Outils",
  },
  "/a-propos": {
    name: "À Propos",
  },
  "/blog": {
    name: "Blog",
  },
};

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <aside className="mb-16 md:mb-24 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex flex-row justify-between items-center relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          <a
            href="/"
            className="font-semibold flex flex-row items-center gap-2 hover:text-green-900"
          >
            <p className="p-1.5 rounded-full bg-green-800 text-xs text-white">
              MF
            </p>
            <p className="text-sm md:text-base">Mes Finances</p>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex flex-row items-center space-x-0">
            <button
              onClick={() => {
                document.dispatchEvent(
                  new KeyboardEvent("keydown", { key: "k", metaKey: true })
                );
              }}
              className="flex items-center gap-1.5 text-xs text-zinc-400 dark:text-zinc-500 border border-zinc-200 dark:border-zinc-700 rounded-md px-2 py-1 mr-2 hover:text-zinc-600 dark:hover:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors cursor-pointer"
            >
              <kbd className="font-sans">⌘K</kbd>
            </button>
            {Object.entries(navItems).map(([path, { name }]) => (
              <Link
                key={path}
                href={path}
                className={`transition-all hover:text-green-800 flex align-middle relative py-1 px-2 text-base ${
                  pathname === path
                    ? "underline underline-offset-2 text-green-800"
                    : ""
                }`}
              >
                {name}
              </Link>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-zinc-600 dark:text-zinc-400"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Menu"
          >
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="4" y1="4" x2="16" y2="16" />
                <line x1="16" y1="4" x2="4" y2="16" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="6" x2="17" y2="6" />
                <line x1="3" y1="10" x2="17" y2="10" />
                <line x1="3" y1="14" x2="17" y2="14" />
              </svg>
            )}
          </button>
        </nav>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="md:hidden mt-2 flex flex-col border border-zinc-100 dark:border-zinc-800 rounded-lg overflow-hidden">
            {Object.entries(navItems).map(([path, { name }]) => (
              <Link
                key={path}
                href={path}
                onClick={() => setMenuOpen(false)}
                className={`px-4 py-3 text-sm transition-all hover:bg-zinc-50 dark:hover:bg-zinc-900 ${
                  pathname === path
                    ? "text-green-800 font-medium"
                    : "text-zinc-700 dark:text-zinc-300"
                }`}
              >
                {name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
