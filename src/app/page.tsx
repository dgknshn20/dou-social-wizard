"use client";

import React, { useState } from 'react';
import InteractiveBackground from './components/InteractiveBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Contact from './components/Contact';
import Wizard from './components/Wizard';

type PageTab = 'home' | 'about' | 'wizard' | 'contact';

export default function AgencyApp() {
  const [activePage, setActivePage] = useState<PageTab>('home');

  return (
    <div className="min-h-screen bg-black text-white font-sans relative overflow-x-hidden">
      <InteractiveBackground />
      
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      <div className="pt-24 pb-12 px-4 relative z-10">
        {activePage === 'home' && (
          <Hero 
            onStartWizard={() => setActivePage('wizard')} 
            onContact={() => setActivePage('contact')} 
          />
        )}
        {activePage === 'about' && <About />}
        {activePage === 'contact' && <Contact />}
        {activePage === 'wizard' && <Wizard />}
      </div>

      <div className="mt-12 text-center text-neutral-600 text-xs pb-4 border-t border-white/5 pt-8">
        © 2024 Dou Social — Bir Yapı Medya kuruluşudur.
      </div>
    </div>
  );
}