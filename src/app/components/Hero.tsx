"use client";

import React from "react";
import {
  Sparkles,
  CheckCircle,
  Zap,
  Activity,
  HeartPulse,
  Utensils,
  Building2,
} from "lucide-react";

interface HeroProps {
  onStartWizard: () => void;
  onContact: () => void;
}

// Örnek referans markalar (istersen gerçek müşterilerinle güncellersin)
const REFERENCES = [
  { name: "YAPIGRANİT MERMERCİLİK", icon: Building2 },
  { name: "FITLIFE KITCHEN", icon: Utensils },
  { name: "EN20 SPORT'S CLUB", icon: Activity },
  { name: "DYT. CEYLİN YASTIKÇI", icon: HeartPulse },
];

const Hero: React.FC<HeroProps> = ({ onStartWizard, onContact }) => {
  return (
    <section className="relative max-w-6xl mx-auto">
      {/* ARKA PLAN GLOW */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -left-24 top-0 h-64 w-64 rounded-full bg-[#800000]/40 blur-[120px]" />
        <div className="absolute -right-10 bottom-10 h-72 w-72 rounded-full bg-purple-600/35 blur-[140px]" />
      </div>

      <div className="relative flex flex-col md:flex-row items-center gap-10 md:gap-16">
        {/* SOL KOLON – METİN + CTA */}
        <div className="w-full md:w-1/2 space-y-8 animate-fade-in">
          {/* ÜST BADGE */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#800000]/40 bg-[#800000]/10 px-4 py-1 text-[11px] font-medium text-[#ffb3b3] shadow-[0_0_25px_rgba(128,0,0,0.6)]">
            <Sparkles size={14} /> Yapay Zeka Destekli Ajans Deneyimi
          </div>

          {/* BÜYÜK İDDİA */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Markalar için{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffcccc] via-white to-[#ffb3b3]">
              çalışan sistemler
            </span>{" "}
            kuruyoruz.
          </h1>

          {/* ALT AÇIKLAMA */}
          <p className="text-neutral-300 text-sm md:text-lg max-w-xl leading-relaxed">
            Sosyal medya + reklam + içerik + otomasyon →{" "}
            <span className="font-semibold text-white">
              tek çatı altında, tek strateji ile
            </span>{" "}
            yönetiyoruz. Tasarım, performans ve operasyonu birleştirip, ajansı
            “post atan ekip” olmaktan çıkarıp{" "}
            <span className="font-semibold text-white">büyüme ortağı</span>{" "}
            seviyesine taşıyoruz.
          </p>

          {/* 3 AVANTAJ */}
          <div className="space-y-2 text-sm">
            {[
              "Hızlı ölçeklenebilir sistem: küçük başlayıp güvenle büyüyebilen yapı.",
              "Üretim + performans + otomasyon: tek dokunuşta uçtan uca çözüm.",
              "9/10 müşteri tavsiye oranı: uzun vadeli iş ortaklıkları.",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle className="mt-[2px] h-4 w-4 text-emerald-400 shrink-0" />
                <span className="text-neutral-300">{item}</span>
              </div>
            ))}
          </div>

          {/* CTA BUTONLARI */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              onClick={onStartWizard}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs md:text-sm font-semibold text-black shadow-lg shadow-black/40 hover:translate-y-[1px] active:translate-y-[2px] transition-transform"
            >
              <Sparkles className="h-4 w-4 text-[#800000]" />
              1 dakikada paketini bul
            </button>
            <button
              onClick={onContact}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-black/40 px-5 py-2.5 text-xs md:text-sm font-semibold text-neutral-100 hover:bg-white/5 hover:border-white/40 transition-colors"
            >
              <Zap className="h-4 w-4 text-[#ffb3b3]" />
              Birlikte nasıl büyüyebileceğimizi konuşalım
            </button>
          </div>
        </div>

        {/* SAĞ KOLON – WIZARD & RAKAMLAR KARTLARI */}
        <div className="w-full md:w-1/2 relative mt-6 md:mt-0">
          <div className="relative grid gap-4">
            {/* Ana kart: Wizard açıklaması */}
            <div className="rounded-2xl border border-white/10 bg-neutral-900/80 backdrop-blur-xl p-5 md:p-6 shadow-[0_0_40px_rgba(0,0,0,0.6)]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[#ffb3b3]" />
                  <span className="text-xs font-semibold text-neutral-200">
                    Dou Social • Creative Performance Wizard
                  </span>
                </div>
                <span className="text-[10px] px-2 py-1 rounded-full bg-emerald-400/10 text-emerald-300 border border-emerald-400/30">
                  AI destekli plan
                </span>
              </div>

              <p className="text-xs md:text-sm text-neutral-300 mb-3">
                İşletme tipiniz, hedefiniz ve bütçenize göre 3 farklı senaryo
                çıkarıp; sosyal medya, reklam, prodüksiyon ve otomasyonu tek
                planda topluyoruz.
              </p>

              <div className="grid grid-cols-3 gap-2 text-[10px] text-neutral-300">
                <div className="rounded-xl bg-black/40 border border-white/10 px-3 py-2">
                  <p className="text-neutral-400 mb-1">Sosyal Medya</p>
                  <p className="font-semibold text-white">Strateji + Üretim</p>
                </div>
                <div className="rounded-xl bg-black/40 border border-white/10 px-3 py-2">
                  <p className="text-neutral-400 mb-1">Reklam</p>
                  <p className="font-semibold text-white">Meta &amp; Google</p>
                </div>
                <div className="rounded-xl bg-black/40 border border-white/10 px-3 py-2">
                  <p className="text-neutral-400 mb-1">Otomasyon</p>
                  <p className="font-semibold text-white">WhatsApp &amp; CRM</p>
                </div>
              </div>
            </div>

            {/* Alt kart: Rakamlarla Dou Social */}
            <div className="rounded-2xl border border-white/10 bg-neutral-900/70 backdrop-blur-xl p-4 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-neutral-400">
                  Rakamlarla Dou Social
                </span>
                <span className="text-[10px] text-neutral-500">Son 12 ay</span>
              </div>

              <div className="grid grid-cols-3 gap-3 text-[11px]">
                <div>
                  <p className="text-neutral-400 mb-1">Aktif Marka</p>
                  <p className="text-white font-semibold text-sm">15+</p>
                </div>
                <div>
                  <p className="text-neutral-400 mb-1">Aylık İçerik</p>
                  <p className="text-[#ffb3b3] font-semibold text-sm">
                    250+
                  </p>
                </div>
                <div>
                  <p className="text-neutral-400 mb-1">Otomasyon Akışı</p>
                  <p className="text-emerald-400 font-semibold text-sm">
                    30+
                  </p>
                </div>
              </div>

              <p className="text-[10px] text-neutral-500 mt-1">
                Bu değerler geçmiş çalışmaların ortalama çıktı aralıklarıdır;
                her marka için planı birlikte özelleştiriyoruz.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* GÜVENEN MARKALAR – MARQUEE ANİMASYONU */}
      <div className="mt-10 md:mt-14 border-t border-white/5 pt-4">
        <div className="flex items-center justify-between gap-4 mb-3">
          <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">
            Güvenen markalar
          </p>
          <span className="text-[10px] text-neutral-500">
            Örnek isimler — gerçek müşterilerinle güncelleyebilirsin
          </span>
        </div>

        <div className="relative w-full overflow-hidden">
          <div className="flex gap-12 whitespace-nowrap marquee-scroll">
            {[...REFERENCES, ...REFERENCES].map((ref, index) => (
              <div
                key={index}
                className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity duration-300 cursor-default group"
              >
                <ref.icon className="w-5 h-5 text-[#800000] group-hover:scale-110 transition-transform" />
                <span className="text-xs md:text-sm font-semibold tracking-wide text-neutral-400 group-hover:text-white uppercase">
                  {ref.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
