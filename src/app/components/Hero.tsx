"use client";

import React from 'react';
import { Sparkles, Zap, Hexagon, Triangle, Circle, Square, Star, Box } from 'lucide-react';

interface HeroProps {
  onStartWizard: () => void;
  onContact: () => void;
}

// Örnek Referans Logoları (İsterseniz burayı kendi resimlerinizle değiştirebilirsiniz)
const REFERANSLAR = [
  { name: "TechCorp", icon: Hexagon },
  { name: "Solvia", icon: Triangle },
  { name: "Vortex", icon: Circle },
  { name: "Idealist", icon: Square },
  { name: "Horizon", icon: Star },
  { name: "CubeSystems", icon: Box },
];

const Hero = ({ onStartWizard, onContact }: HeroProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-center relative overflow-hidden">
      
      {/* Ana İçerik */}
      <div className="px-4 animate-in fade-in duration-700 z-10 mt-10 md:mt-0 pb-32"> {/* pb-32 eklendi: İçerik footer'ın altında kalmasın diye */}
        <div className="bg-[#800000]/10 text-[#800000] px-4 py-1.5 rounded-full text-sm font-bold mb-6 border border-[#800000]/20 inline-flex items-center gap-2 animate-pulse">
          <Sparkles size={14} /> Yapay Zeka Destekli Ajans Deneyimi
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
          Markanızı <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#800000] to-red-500">Geleceğe</span><br/>
          Taşıyoruz.
        </h1>
        <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Dou Social, veri odaklı stratejiler ve yaratıcı içerik üretimi ile markanızı dijital dünyada bir adım öne çıkarır.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-20">
          <button 
            onClick={onStartWizard}
            className="bg-[#800000] hover:bg-[#600000] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(128,0,0,0.4)] flex items-center justify-center gap-2"
          >
            <Zap size={20} /> Hemen Teklif Alın
          </button>
          <button 
            onClick={onContact}
            className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 hover:border-white/30"
          >
            Bize Ulaşın
          </button>
        </div>
      </div>

      {/* --- AKAN REFERANS ŞERİDİ ve FOOTER --- */}
      <div className="w-full bg-black/60 backdrop-blur-xl border-t border-white/5 pt-6 pb-4 absolute bottom-0 left-0 z-20 flex flex-col gap-4">
        {/* Yanlardan hafif karartma efekti (Vignette) */}
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>
        
        {/* Marquee (Kayan Yazı) */}
        <div className="flex w-full overflow-hidden">
          <div className="flex animate-infinite-scroll gap-16 min-w-full shrink-0 items-center justify-around px-8">
            {/* 1. Grup Logolar */}
            {REFERANSLAR.map((ref, i) => (
              <div key={i} className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity duration-300 group cursor-default">
                <ref.icon className="w-6 h-6 text-[#800000] group-hover:scale-110 transition-transform" />
                <span className="text-lg font-bold tracking-widest text-neutral-400 group-hover:text-white uppercase">{ref.name}</span>
              </div>
            ))}
            
            {/* 2. Grup Logolar (Sonsuz döngü için tekrar) */}
            {REFERANSLAR.map((ref, i) => (
              <div key={`duplicate-${i}`} className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity duration-300 group cursor-default">
                <ref.icon className="w-6 h-6 text-[#800000] group-hover:scale-110 transition-transform" />
                <span className="text-lg font-bold tracking-widest text-neutral-400 group-hover:text-white uppercase">{ref.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Telif Hakkı Yazısı */}
        <div className="text-center border-t border-white/5 pt-3 mt-1">
          <p className="text-[10px] text-neutral-500 font-medium tracking-wide">
            © Dou Social — Bir Yapı Medya kuruluşudur.
          </p>
        </div>
      </div>

    </div>
  );
};

export default Hero;