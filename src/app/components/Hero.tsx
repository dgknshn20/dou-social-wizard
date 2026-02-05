"use client";

import React from "react";

interface HeroProps {
  onStartWizard: () => void;
  onContact: () => void;
}

const IconScale = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-[#ffb3b3]"
  >
    <path d="M12 3V21M3 12H21M16 8L21 12L16 16M8 16L3 12L8 8" />
  </svg>
);

const IconChip = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-[#ff4d6d]"
  >
    <rect x="2" y="2" width="20" height="20" rx="2" />
    <path d="M12 12H12.01" />
    <path d="M2 12H6" />
    <path d="M18 12H22" />
    <path d="M12 2V6" />
    <path d="M12 18V22" />
  </svg>
);

const IconTrust = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-emerald-300"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const IconArrowRight = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="group relative p-6 bg-neutral-900/60 border border-white/10 rounded-2xl hover:bg-white/5 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-[#ff4d6d]/10 via-transparent to-[#800000]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative z-10">
      <div className="w-12 h-12 mb-4 rounded-lg bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-white/10">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white mb-2 tracking-tight">{title}</h3>
      <p className="text-neutral-400 text-sm leading-relaxed">{description}</p>
    </div>
  </div>
);

const Hero: React.FC<HeroProps> = ({ onStartWizard, onContact }) => {
  return (
    <section className="relative max-w-6xl mx-auto overflow-hidden">
      <style>{`
        @keyframes heroGridMove {
          from { background-position: 0 0; }
          to { background-position: 0 48px; }
        }
        @keyframes heroDropLine {
          0% { transform: translateY(-120%); opacity: 0; }
          45% { opacity: 1; }
          100% { transform: translateY(120vh); opacity: 0; }
        }
        .hero-grid-flow {
          animation: heroGridMove 3.5s linear infinite;
        }
        .hero-drop-line-1 {
          animation: heroDropLine 4.6s cubic-bezier(0.4, 0.26, 0, 0.97) infinite;
        }
        .hero-drop-line-2 {
          animation: heroDropLine 6.2s cubic-bezier(0.4, 0.26, 0, 0.97) infinite;
          animation-delay: 1.2s;
        }
        .hero-drop-line-3 {
          animation: heroDropLine 5.4s cubic-bezier(0.4, 0.26, 0, 0.97) infinite;
          animation-delay: 0.6s;
        }
        .hero-drop-line-4 {
          animation: heroDropLine 7.1s cubic-bezier(0.4, 0.26, 0, 0.97) infinite;
          animation-delay: 2.4s;
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-[0.045] hero-grid-flow"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.85) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.85) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="absolute inset-0">
          <div className="absolute top-0 left-[12%] h-[45vh] w-px bg-gradient-to-b from-transparent via-[#800000]/30 to-transparent hero-drop-line-1" />
          <div className="absolute top-0 left-[32%] h-[30vh] w-px bg-gradient-to-b from-transparent via-[#ff4d6d]/30 to-transparent hero-drop-line-2" />
          <div className="absolute top-0 right-[26%] h-[52vh] w-px bg-gradient-to-b from-transparent via-[#ffb3b3]/25 to-transparent hero-drop-line-3" />
          <div className="absolute top-0 right-[10%] h-[38vh] w-px bg-gradient-to-b from-transparent via-[#800000]/20 to-transparent hero-drop-line-4" />
        </div>

        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-[#800000]/35 blur-[140px]" />
        <div className="absolute -right-16 bottom-6 h-80 w-80 rounded-full bg-[#ff4d6d]/20 blur-[160px]" />
      </div>

      <div className="relative z-10 pt-8 md:pt-12 pb-10 flex flex-col items-center text-center">
        <div className="mb-8 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-[#ffb3b3] tracking-wide uppercase backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff4d6d] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff4d6d]" />
          </span>
          Creative Performance Intelligence
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-400 mb-6 tracking-tight max-w-4xl mx-auto leading-[1.1]">
          Geleceğin markalarını <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ffb3b3] to-[#ff4d6d]">
            sistemlerle
          </span>{" "}
          büyütüyoruz.
        </h1>

        <p className="text-base md:text-lg text-neutral-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          Dağınık süreçlere son. Reklamdan otomasyona tüm operasyonu tek stratejiyle yönetiyoruz.
          Sizin için sadece içerik üretmiyoruz; markanızı bir{" "}
          <span className="text-neutral-200 border-b border-white/10">büyüme ekosistemine</span> dönüştürüyoruz.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-16">
          <button
            onClick={onStartWizard}
            className="group relative px-8 py-4 bg-white text-black font-semibold rounded-lg overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#ff4d6d] via-[#ffb3b3] to-[#ff4d6d] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            <span className="relative flex items-center gap-2">
              Size Özel Çözümü Keşfedin
              <IconArrowRight />
            </span>
          </button>

          <button
            onClick={onContact}
            className="px-8 py-4 bg-transparent border border-white/20 text-white font-medium rounded-lg hover:bg-white/5 hover:border-white/40 transition-all active:scale-95 backdrop-blur-sm"
          >
            Strateji Toplantısı Planla
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          <FeatureCard
            icon={<IconScale />}
            title="Sınırsız Ölçekleme"
            description="Taleple birlikte genişleyen, hata payı sıfır yapılar ve modüler büyüme stratejileri."
          />
          <FeatureCard
            icon={<IconChip />}
            title="Tek Dokunuşta Çözüm"
            description="Tasarım ve performansı üst düzey teknolojiyle birleştiren uçtan uca mimari."
          />
          <FeatureCard
            icon={<IconTrust />}
            title="Sarsılmaz Güven"
            description="Şeffaf raporlama, uzun vadeli iş birlikleri ve ölçülebilir başarı hikayeleri."
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
