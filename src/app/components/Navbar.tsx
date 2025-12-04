"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";

type PageTab = "home" | "about" | "wizard" | "contact";

interface NavbarProps {
  activePage: PageTab;
  setActivePage: (page: PageTab) => void;
}

interface NavItem {
  label: string;
  key: PageTab;
}

const navItems: NavItem[] = [
  { label: "Ana Sayfa", key: "home" },
  { label: "Hakkımızda", key: "about" },
  { label: "Paket Önerici", key: "wizard" },
  { label: "İletişim", key: "contact" },
];

const Navbar: React.FC<NavbarProps> = ({ activePage, setActivePage }) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (key: PageTab) => {
    setActivePage(key);
    setOpen(false);
  };

  return (
    <header
      className={`
        fixed inset-x-0 top-0 z-40 transition-all duration-300
        ${scrolled ? "backdrop-blur-xl bg-black/75 border-b border-white/10" : "bg-gradient-to-b from-black/80 via-black/40 to-transparent"}
      `}
    >
      <nav
        className={`
          max-w-6xl mx-auto flex items-center justify-between px-4
          transition-all duration-300
          ${scrolled ? "py-2.5" : "py-4"}
        `}
      >
        {/* LOGO */}
        <div
          className="flex items-center gap-2 cursor-pointer select-none"
          onClick={() => handleNavClick("home")}
        >
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400">
            Dou<span className="text-[#800000]">Social</span>
          </span>
        </div>

        {/* MASAÜSTÜ MENÜ */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6 text-xs font-medium">
            {navItems.map((item) => {
              const isActive = activePage === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item.key)}
                  className="relative group"
                >
                  <span
                    className={
                      "transition-colors " +
                      (isActive ? "text-white" : "text-neutral-300 group-hover:text-white")
                    }
                  >
                    {item.label}
                  </span>
                  <span
                    className={
                      "absolute left-0 -bottom-1 h-[2px] rounded-full bg-gradient-to-r from-[#800000] to-red-400 transition-all " +
                      (isActive ? "w-full" : "w-0 group-hover:w-full")
                    }
                  />
                </button>
              );
            })}
          </div>

          {/* CTA */}
          <button
            onClick={() => handleNavClick("wizard")}
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-black shadow-lg shadow-black/40 hover:translate-y-[1px] active:translate-y-[2px] transition-transform"
          >
            <Sparkles className="w-3 h-3 text-[#800000]" />
            Paketini Bul
          </button>
        </div>

        {/* MOBİL BUTON */}
        <button
          className="md:hidden inline-flex items-center justify-center rounded-full border border-white/20 bg-black/40 p-2 text-neutral-100"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* MOBİL DROPDOWN */}
      {open && (
        <div className="md:hidden px-4 pb-4">
          <div className="rounded-2xl border border-white/10 bg-black/95 backdrop-blur-xl shadow-xl mt-1">
            <div className="flex flex-col divide-y divide-white/5">
              {navItems.map((item) => {
                const isActive = activePage === item.key;
                return (
                  <button
                    key={item.key}
                    onClick={() => handleNavClick(item.key)}
                    className={
                      "px-4 py-3 text-sm text-left transition-colors " +
                      (isActive
                        ? "bg-white/10 text-white"
                        : "text-neutral-200 hover:bg-white/5")
                    }
                  >
                    {item.label}
                  </button>
                );
              })}
              <button
                onClick={() => handleNavClick("wizard")}
                className="px-4 py-3 text-sm font-semibold text-left text-black bg-white rounded-b-2xl flex items-center justify-between"
              >
                Paketini Bul
                <Sparkles className="w-4 h-4 text-[#800000]" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;