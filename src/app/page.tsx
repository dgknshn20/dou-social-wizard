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
          className="fade-up-init mt-20 md:mt-28 max-w-6xl mx-auto"
        >
          <Contact />
        </section>
      </main>

      <footer className="mt-16 border-t border-white/5 bg-black/60 backdrop-blur py-12 relative z-10">
        <div className="max-w-6xl mx-auto px-4 grid gap-8 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="space-y-3">
            <div className="text-lg font-semibold text-white">
              Dou<span className="text-[#800000]">Social</span>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed max-w-sm">
              Creative Performance ajansı olarak strateji, içerik, reklam ve otomasyonu
              tek sistemde birleştiriyoruz.
            </p>
            <p className="text-xs text-neutral-500">© 2026 Dou Social. Tüm hakları saklıdır.</p>
            <p className="text-xs text-neutral-500">
              ©️ Dou Social, Yapımedya Reklamcılık A.Ş.’nin tescilli markasıdır.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Hızlı Erişim</h4>
            <div className="flex flex-col gap-2 text-sm">
              <button
                onClick={() => setActivePage("home")}
                className="text-neutral-400 hover:text-white transition-colors text-left"
              >
                Ana Sayfa
              </button>
              <button
                onClick={() => setActivePage("about")}
                className="text-neutral-400 hover:text-white transition-colors text-left"
              >
                Hakkımızda
              </button>
              <button
                onClick={() => setActivePage("wizard")}
                className="text-neutral-400 hover:text-white transition-colors text-left"
              >
                Paket Önerici
              </button>
              <button
                onClick={() => setActivePage("contact")}
                className="text-neutral-400 hover:text-white transition-colors text-left"
              >
                İletişim
              </button>
              <a
                href="/kariyer"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                Kariyer
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">İletişim</h4>
            <div className="text-sm text-neutral-400 space-y-2">
              <a
                href="mailto:info@dousocial.com"
                className="hover:text-white transition-colors"
              >
                info@dousocial.com
              </a>
              <a
                href="tel:+905300845468"
                className="hover:text-white transition-colors"
              >
                +90 530 084 54 68
              </a>
              <p>Denizli, Türkiye</p>
              <a
                href="https://wa.me/905300845468"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#ffb3b3] hover:text-white transition-colors"
              >
                WhatsApp’tan Yazın
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
