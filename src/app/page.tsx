"use client";

import React, { useState, useEffect } from "react";
import InteractiveBackground from "./components/InteractiveBackground";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Contact from "./components/Contact";
import Wizard from "./components/Wizard";

type PageTab = "home" | "about" | "wizard" | "contact";

export default function AgencyApp() {
  const [activePage, setActivePage] = useState<PageTab>("home");

  // Navbar sekmesi değiştiğinde ilgili bölüme scroll
  useEffect(() => {
    const element = document.getElementById(activePage);
    if (element) {
      const offset = 96;
      const top =
        element.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top,
        behavior: "smooth",
      });
    } else if (activePage === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [activePage]);

  // Section scroll görünür olduğunda fade-up animasyonu
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(
      "[data-animate='fade-up']"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-up-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans relative overflow-x-hidden">
      <InteractiveBackground />

      <Navbar activePage={activePage} setActivePage={setActivePage} />

      <main className="pt-24 pb-12 px-4 relative z-10">
        {/* HERO */}
        <section
          id="home"
          data-animate="fade-up"
          className="fade-up-init"
        >
          <Hero
            onStartWizard={() => setActivePage("wizard")}
            onContact={() => setActivePage("contact")}
          />
        </section>

        {/* ABOUT */}
        <section
          id="about"
          data-animate="fade-up"
          className="fade-up-init mt-20 md:mt-28 max-w-6xl mx-auto"
        >
          <About />
        </section>

        {/* WIZARD */}
        <section
          id="wizard"
          data-animate="fade-up"
          className="fade-up-init mt-20 md:mt-28 max-w-6xl mx-auto"
        >
          <Wizard />
        </section>

        {/* CONTACT */}
        <section
          id="contact"
          data-animate="fade-up"
          className="fade-up-init mt-20 md:mt-28 max-w-4xl mx-auto"
        >
          <Contact />
        </section>
      </main>

      <footer className="mt-12 text-center text-neutral-600 text-xs pb-4 border-t border-white/5 pt-8 relative z-10">
        © 2024 Dou Social — Bir Yapı Medya kuruluşudur.
      </footer>
    </div>
  );
}