"use client";

import React, { useEffect, useRef } from "react";
import { Users, Target, Sparkles, Rocket, CheckCircle, Workflow, Camera, Palette } from "lucide-react";

const About = () => {
  const teamScrollerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scroller = teamScrollerRef.current;
    if (!scroller) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    const centerDogukan = () => {
      const target = scroller.querySelector<HTMLDivElement>("[data-member='dogukan']");
      if (!target) return;
      const targetCenter = target.offsetLeft + target.offsetWidth / 2;
      const viewportCenter = scroller.clientWidth / 2;
      const maxScroll = scroller.scrollWidth - scroller.clientWidth;
      const nextScroll = Math.max(0, Math.min(maxScroll, targetCenter - viewportCenter));
      scroller.scrollLeft = nextScroll;
    };

    const initId = window.requestAnimationFrame(centerDogukan);

    let rafId = 0;
    let lastTs = 0;
    const baseSpeed = 0.35; // px per ms, steady right
    let boost = 0;
    let boostTimer: number | undefined;
    let paused = false;

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      scroller.scrollLeft += event.deltaY + event.deltaX;
      boost = Math.min(2.5, boost + 0.5);
      if (boostTimer) window.clearTimeout(boostTimer);
      boostTimer = window.setTimeout(() => {
        boost = 0;
      }, 600);
    };

    const handleEnter = () => {
      paused = true;
    };
    const handleLeave = () => {
      paused = false;
      lastTs = 0;
    };

    scroller.addEventListener("wheel", handleWheel, { passive: false });
    scroller.addEventListener("mouseenter", handleEnter);
    scroller.addEventListener("mouseleave", handleLeave);

    const tick = (ts: number) => {
      if (paused) {
        lastTs = ts;
        rafId = window.requestAnimationFrame(tick);
        return;
      }

      if (!lastTs) lastTs = ts;
      const delta = ts - lastTs;
      lastTs = ts;

      const maxScroll = scroller.scrollWidth - scroller.clientWidth;
      if (maxScroll > 0) {
        const speed = baseSpeed * (1 + boost);
        scroller.scrollLeft += speed * delta;
        if (scroller.scrollLeft >= maxScroll - 1) {
          scroller.scrollLeft = 1;
        }
      }

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);
    return () => {
      window.cancelAnimationFrame(initId);
      window.cancelAnimationFrame(rafId);
      scroller.removeEventListener("wheel", handleWheel);
      scroller.removeEventListener("mouseenter", handleEnter);
      scroller.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <section className="relative">

      {/* BACKGROUND GLOW EFFECTS */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 left-[-200px] w-[400px] h-[400px] bg-[#800000]/40 rounded-full blur-[180px]" />
        <div className="absolute bottom-0 right-[-200px] w-[400px] h-[400px] bg-purple-600/30 rounded-full blur-[180px]" />
        <div className="spiral spiral-a" />
        <div className="spiral spiral-b" />
        <div className="spiral spiral-c" />
        <div className="spiral spiral-d" />
      </div>

      <div className="relative max-w-6xl mx-auto space-y-20 overflow-visible">

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

          {/* TEAM SCROLLER */}
          <div className="relative overflow-visible">
            <div className="pointer-events-none absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-black to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-black to-transparent" />

            <div
              ref={teamScrollerRef}
              className="team-rail flex gap-10 overflow-x-auto overflow-y-visible scroll-smooth"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                "--card-h": "340px",
                "--hover-scale": "1.3",
              } as React.CSSProperties}
            >
            {[
              {
                name: "Doğukan Şahin",
                role: "Kurucu / Proje Yöneticisi",
                image: "/team/dogukan-sahin.png",
                key: "dogukan",
                quote:
                  "DOU’nun temellerini atarken hayalim sadece bir iş değil, bir aile kurmaktı. Her projede bu heyecanı ekibimle paylaşmak en büyük motivasyonum!",
              },
              {
                name: "Emin Kahraman",
                role: "CEO",
                image: "/team/emin-kahraman.png",
                quote:
                  "Burada sadece hedefleri değil, başarıyı paylaşmanın tadını çıkarıyoruz. DOU’da vizyonumuzu gerçeğe dönüştürürken her gün yeni bir şeyler öğrenmek paha biçilemez.",
              },
              {
                name: "Miray Dede",
                role: "Koordinatör",
                image: "/team/miray-dede.png",
                quote:
                  "Ekipler arası köprü kurarken her sabah bu enerjik ofise gelmek motivasyon kaynağım. DOU’da düzeni sağlamak, bu harika ekiple çok daha keyifli!",
              },
              {
                name: "Şeyma İrtem",
                role: "Kameraman",
                image: "/team/seyma-irtem.png",
                quote:
                  "DOU’nun dünyasını vizörden görmek harika bir duygu. En güzel anları ve projeleri ölümsüzleştirirken bu ekibin bir parçası olduğum için çok şanslıyım.",
              },
              {
                name: "Fuat Koraç",
                role: "Editör / Grafiker",
                image: "/team/fuat-korac.png",
                quote:
                  "Fikirleri görsel birer şölene dönüştürmek benim işim. DOU’nun yaratıcı özgürlüğü ve ekibimizin desteğiyle her tasarımda kendimi yeniden buluyorum.",
              },
              {
                name: "Fatih Çakmak",
                role: "Proje Asistanı",
                image: "/team/fatih-cakmak.png",
                quote:
                  "Projelerin her aşamasında mutfakta olmak ve bu dinamik yapının işlemesine katkı sağlamak çok öğretici. DOU’da her gün yeni bir macera!",
              },
              {
                name: "Berkant Yıkılmaz",
                role: "Pazarlama Şefi",
                image: "/team/berkant-yikilmaz.png",
                quote:
                  "Hikayemizi dünyaya anlatmak ve DOU markasını büyütmek benim için bir işten çok daha fazlası. Bu ekiple pazarlamanın sınırlarını zorlamayı seviyorum.",
              },
            ].map((member, i) => (
              <div
                key={`${member.name}-${i}`}
                data-member={member.key}
                className="team-card relative min-w-[220px] md:min-w-[240px] h-[340px] p-6 rounded-2xl border border-white/10 backdrop-blur-2xl shadow-lg transition-transform duration-300 ease-out text-center hover:scale-[1.3] origin-center z-0 hover:z-10"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover mx-auto border border-white/10"
                />
                <h3 className="text-white font-semibold mt-4">{member.name}</h3>
                <p className="text-neutral-400 text-sm">{member.role}</p>
                <p className="text-neutral-300 text-xs mt-3 leading-relaxed">
                  “{member.quote}”
                </p>
              </div>
            ))}
            </div>
            <style jsx>{`
              .team-rail {
                padding-block: calc((var(--hover-scale) - 1) * (var(--card-h) / 2) + 12px);
                padding-inline: calc((var(--hover-scale) - 1) * 60px + 16px);
              }
              .team-card {
                background:
                  linear-gradient(135deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.04));
                box-shadow:
                  0 24px 50px rgba(0, 0, 0, 0.45),
                  inset 0 1px 0 rgba(255, 255, 255, 0.18);
              }
              .team-card::before {
                content: "";
                position: absolute;
                inset: 0;
                border-radius: 16px;
                background:
                  radial-gradient(140% 140% at 0% 0%, rgba(255, 255, 255, 0.35), transparent 55%),
                  radial-gradient(120% 120% at 100% 20%, rgba(255, 255, 255, 0.18), transparent 60%);
                opacity: 0.35;
                pointer-events: none;
              }
              .team-card::after {
                content: "";
                position: absolute;
                inset: 2px;
                border-radius: 14px;
                background: linear-gradient(180deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.02));
                opacity: 0.6;
                pointer-events: none;
              }
              .team-card:hover {
                border-color: rgba(255, 255, 255, 0.28);
                box-shadow:
                  0 28px 60px rgba(0, 0, 0, 0.55),
                  inset 0 1px 0 rgba(255, 255, 255, 0.22);
              }
              .team-rail::-webkit-scrollbar {
                display: none;
              }
              .spiral {
                position: absolute;
                width: 520px;
                height: 520px;
                border-radius: 50%;
                background:
                  conic-gradient(
                    from 0deg,
                    rgba(255, 255, 255, 0.0),
                    rgba(255, 255, 255, 0.16),
                    rgba(128, 0, 0, 0.22),
                    rgba(255, 255, 255, 0.0)
                  );
                mask:
                  radial-gradient(circle at center, transparent 52%, rgba(0, 0, 0, 1) 53%),
                  radial-gradient(circle at center, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 100%);
                filter: blur(8px);
                opacity: 0.35;
                animation: spiralFloat 22s linear infinite;
              }
              .spiral-a {
                top: -120px;
                left: -160px;
                transform-origin: center;
                animation-duration: 26s;
              }
              .spiral-b {
                top: 140px;
                right: -180px;
                width: 620px;
                height: 620px;
                opacity: 0.25;
                animation-duration: 32s;
                animation-delay: -6s;
              }
              .spiral-c {
                bottom: -180px;
                left: 20%;
                width: 480px;
                height: 480px;
                opacity: 0.3;
                animation-duration: 28s;
                animation-delay: -12s;
              }
              .spiral-d {
                top: 60px;
                left: 55%;
                width: 360px;
                height: 360px;
                opacity: 0.22;
                animation-duration: 24s;
                animation-delay: -18s;
              }
              @keyframes spiralFloat {
                0% {
                  transform: translate3d(0, 0, 0) rotate(0deg) scale(0.9);
                }
                50% {
                  transform: translate3d(40px, -20px, 0) rotate(180deg) scale(1.05);
                }
                100% {
                  transform: translate3d(80px, -40px, 0) rotate(360deg) scale(1.2);
                }
              }
            `}</style>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
