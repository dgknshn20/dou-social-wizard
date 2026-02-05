"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";

type PageTab = "home" | "about" | "wizard" | "contact";

interface NavbarProps {
  activePage: PageTab;
  setActivePage: (page: PageTab) => void;
  variant?: "dark" | "light";
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

const Navbar: React.FC<NavbarProps> = ({ activePage, setActivePage, variant = "dark" }) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isLight = variant === "light";

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
        ${isLight ? "backdrop-blur-md bg-white/80 border border-black/10 rounded-3xl" : "backdrop-blur-md bg-black/20 border border-white/5 rounded-3xl"}
        ${scrolled ? "" : ""}
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
          <span
            className={
              "text-2xl font-bold " +
              (isLight
                ? "text-neutral-900"
                : "bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400")
            }
          >
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
                      (isActive
                        ? isLight
                          ? "text-neutral-900"
                          : "text-white"
                        : isLight
                        ? "text-neutral-500 group-hover:text-neutral-900"
                        : "text-neutral-300 group-hover:text-white")
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
            <a href="/kariyer" className="relative group">
              <span
                className={
                  "transition-colors " +
                  (isLight ? "text-neutral-500 group-hover:text-neutral-900" : "text-neutral-300 group-hover:text-white")
                }
              >
                Kariyer
              </span>
              <span className="absolute left-0 -bottom-1 h-[2px] rounded-full bg-gradient-to-r from-[#800000] to-red-400 transition-all w-0 group-hover:w-full" />
            </a>
          </div>

          {/* CTA */}
          <button
            onClick={() => handleNavClick("wizard")}
            className={
              "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold shadow-lg hover:translate-y-[1px] active:translate-y-[2px] transition-transform " +
              (isLight
                ? "bg-[#111111] text-white shadow-black/15"
                : "bg-white text-black shadow-black/40")
            }
          >
            <Sparkles className="w-3 h-3 text-[#800000]" />
            Paketini Bul
          </button>
        </div>

        {/* MOBİL BUTON */}
        <button
          className={
            "md:hidden inline-flex items-center justify-center rounded-full p-2 " +
            (isLight
              ? "border border-black/10 bg-white/70 text-neutral-900"
              : "border border-white/20 bg-black/40 text-neutral-100")
          }
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* MOBİL DROPDOWN */}
      {open && (
        <div className="md:hidden px-4 pb-4">
          <div
            className={
              "rounded-2xl border backdrop-blur-xl shadow-xl mt-1 " +
              (isLight ? "border-black/10 bg-white/95" : "border-white/10 bg-black/95")
            }
          >
            <div className={"flex flex-col divide-y " + (isLight ? "divide-black/5" : "divide-white/5")}>
              {navItems.map((item) => {
                const isActive = activePage === item.key;
                return (
                  <button
                    key={item.key}
                    onClick={() => handleNavClick(item.key)}
                    className={
                      "px-4 py-3 text-sm text-left transition-colors " +
                      (isActive
                        ? isLight
                          ? "bg-black/5 text-neutral-900"
                          : "bg-white/10 text-white"
                        : isLight
                        ? "text-neutral-700 hover:bg-black/5"
                        : "text-neutral-200 hover:bg-white/5")
                    }
                  >
                    {item.label}
                  </button>
                );
              })}
              <a
                href="/kariyer"
                className={
                  "px-4 py-3 text-sm text-left " +
                  (isLight ? "text-neutral-700 hover:bg-black/5" : "text-neutral-200 hover:bg-white/5")
                }
              >
                Kariyer
              </a>
              <button
                onClick={() => handleNavClick("wizard")}
                className={
                  "px-4 py-3 text-sm font-semibold text-left rounded-b-2xl flex items-center justify-between " +
                  (isLight ? "text-white bg-[#111111]" : "text-black bg-white")
                }
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
