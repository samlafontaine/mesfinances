"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = {
  "/": {
    name: "À Propos",
  },
  "/blog": {
    name: "Blog",
  },
};

export function Navbar() {
  const pathname = usePathname();

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

          <div className="flex flex-row space-x-0">
            {Object.entries(navItems).map(([path, { name }]) => {
              return (
                <Link
                  key={path}
                  href={path}
                  className={`transition-all hover:text-green-800 flex align-middle relative py-1 px-1 md:px-2 text-sm md:text-base ${
                    pathname === path
                      ? "underline underline-offset-2 text-green-800"
                      : ""
                  }`}
                >
                  {name}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </aside>
  );
}
