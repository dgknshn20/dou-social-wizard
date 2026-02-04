"use client";

import React from "react";
import { Users, Target, Sparkles, Rocket, CheckCircle, Workflow, Camera, Palette } from "lucide-react";

const About = () => {
  return (
    <section className="relative">

      {/* BACKGROUND GLOW EFFECTS */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 left-[-200px] w-[400px] h-[400px] bg-[#800000]/40 rounded-full blur-[180px]" />
        <div className="absolute bottom-0 right-[-200px] w-[400px] h-[400px] bg-purple-600/30 rounded-full blur-[180px]" />
      </div>

      <div className="relative max-w-6xl mx-auto space-y-20">

        {/* INTRO */}
        <div className="text-center space-y-4 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Sadece Bir Ajans Değil, <br />
            <span className="bg-gradient-to-r from-[#800000] to-red-400 bg-clip-text text-transparent">
              Büyüme Ortağıyız.
            </span>
          </h1>
          <p className="text-neutral-400 max-w-2xl mx-auto text-sm md:text-lg leading-relaxed">
            Dou Social, kreatif içerik üretimi, performans reklamları, otomasyon ve marka
            stratejisini tek çatı altında bir araya getiren tam kapsamlı bir dijital büyüme ajansıdır.
            Hedefiniz ne olursa olsun, size özel sistemler kuruyoruz.
          </p>
        </div>

        {/* MİSYON & VİZYON */}
        <div className="grid md:grid-cols-2 gap-8 animate-fade-up">
          {[
            {
              title: "Misyonumuz",
              icon: <Target size={26} className="text-[#ffb3b3]" />,
              text: "Markaların dijital dünyada ölçülebilir, sürdürülebilir ve etkili bir büyüme elde etmesini sağlamak.",
            },
            {
              title: "Vizyonumuz",
              icon: <Sparkles size={26} className="text-[#ffb3b3]" />,
              text: "Türkiye'nin en yenilikçi, en sonuç odaklı ve en güvenilir dijital büyüme ajansı olmak.",
            },
          ].map((card, i) => (
            <div
              key={i}
              className="p-8 rounded-2xl bg-neutral-900/70 border border-white/10 backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.4)] 
              group hover:border-[#800000]/60 hover:shadow-[#800000]/40 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                {card.icon}
                <h3 className="text-xl font-bold text-white">{card.title}</h3>
              </div>
              <p className="text-neutral-300 text-sm leading-relaxed">{card.text}</p>
            </div>
          ))}
        </div>

        {/* METODOLOJİ – 4 ADIMDA AJANS MODELİ */}
        <div className="space-y-4 animate-fade-up">
          <h2 className="text-3xl font-bold text-white text-center">Nasıl Çalışıyoruz?</h2>
          <p className="text-neutral-400 text-center max-w-xl mx-auto text-sm">
            Dou Social'ın ödüllü proje yönetim metodolojisi ile süreciniz baştan sona ölçümlenebilir bir sisteme dönüşür.
          </p>

          <div className="grid md:grid-cols-4 gap-6 mt-8">
            {[
              {
                number: "01",
                title: "Analiz",
                text: "Markanızı, hedef kitlenizi ve sektörü detaylı analiz ederiz.",
                icon: <Workflow className="text-[#ffb3b3]" size={26} />,
              },
              {
                number: "02",
                title: "Strateji",
                text: "Büyüme hedeflerinize uygun dijital yol haritası oluştururuz.",
                icon: <Target className="text-[#ffb3b3]" size={26} />,
              },
              {
                number: "03",
                title: "Üretim",
                text: "Fotoğraf, video, tasarım ve içerik sürecini üst düzey kaliteyle üretiriz.",
                icon: <Camera className="text-[#ffb3b3]" size={26} />,
              },
              {
                number: "04",
                title: "Optimize",
                text: "Performans reklamları, raporlama ve otomasyonla sürekli büyüme sağlarız.",
                icon: <Rocket className="text-[#ffb3b3]" size={26} />,
              },
            ].map((step, i) => (
              <div
                key={i}
                className="relative p-6 rounded-2xl bg-neutral-900/60 border border-white/10 backdrop-blur-xl shadow-lg
                hover:border-[#800000] hover:shadow-[#800000]/40 transition-all duration-300"
              >
                <div className="text-[#800000] text-3xl font-extrabold opacity-60">
                  {step.number}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  {step.icon}
                  <h3 className="text-white font-semibold text-lg">{step.title}</h3>
                </div>
                <p className="text-neutral-400 text-sm mt-2">{step.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RAKAMLARLA DOU SOCIAL */}
        <div className="space-y-10 animate-fade-up">
          <h2 className="text-3xl font-bold text-white text-center">Rakamlarla Dou Social</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { value: "1000+", label: "Tamamlanan Proje" },
              { value: "+5", label: "Aktif Marka" },
              { value: "%100", label: "Müşteri Memnuniyeti" },
            ].map((stat, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl bg-neutral-900/70 border border-white/10 backdrop-blur-xl shadow-lg 
                hover:border-[#800000]/70 hover:shadow-[#800000]/40 transition-all"
              >
                <div className="text-4xl font-extrabold text-white">{stat.value}</div>
                <p className="text-neutral-400 text-sm mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* EKİBİMİZ */}
        <div className="space-y-8 animate-fade-up">
          <h2 className="text-3xl font-bold text-white text-center">Ekibimiz</h2>
          <p className="text-neutral-400 text-center text-sm max-w-xl mx-auto">
            Her biri alanında uzman kreatif, strateji ve üretim ekiplerinden oluşuyoruz.
          </p>

          {/* TEAM GRID — İster isim ekleyelim istersen placeholder kalsın */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Ali Yılmaz", role: "Kreatif Direktör" },
              { name: "Merve Demir", role: "Tasarım Uzmanı" },
              { name: "Doğukan Kılıç", role: "Performans Pazarlama" },
            ].map((member, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-neutral-900/70 border border-white/10 backdrop-blur-xl shadow-lg 
                hover:border-[#800000] hover:shadow-[#800000]/40 transition-all text-center"
              >
                <div className="w-24 h-24 rounded-full bg-neutral-800 mx-auto flex items-center justify-center text-neutral-500 text-xl font-semibold">
                  {member.name.charAt(0)}
                </div>
                <h3 className="text-white font-semibold mt-4">{member.name}</h3>
                <p className="text-neutral-400 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
