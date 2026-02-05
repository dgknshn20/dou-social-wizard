"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { sendCareerApplicationEmail } from "../actions";
import {
  Rocket,
  Target,
  ChartLine,
  Wand2,
  Lightbulb,
  ArrowRight,
  GraduationCap,
  Briefcase,
  MapPin,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import InteractiveBackground from "../components/InteractiveBackground";
import Navbar from "../components/Navbar";

type CareerTab = "pro" | "student";
type PageTab = "home" | "about" | "wizard" | "contact";
type InternProgram =
  | "Sosyal Medya Yöneticisi Stajyeri"
  | "Video Editör Stajyeri"
  | "Grafik Tasarımcı Stajyeri";
type InternDays = "2 gün" | "3 gün" | "4 gün" | "5 gün";
type InternDuration = "Zorunlu staj (okul kapsamında)" | "Gönüllü staj";
type StaffPosition =
  | "Account Manager"
  | "Grafik Tasarımcı"
  | "Video Editör / Motion Designer"
  | "Sosyal Medya Uzmanı"
  | "Reklam & Performans Uzmanı"
  | "Diğer";
type StaffWorkType = "Tam zamanlı" | "Yarı zamanlı";
type StaffExperience = "Deneyimsiz" | "0–1 yıl" | "1–3 yıl" | "3+ yıl";
type StaffAvailability = "Hemen" | "2 hafta içinde" | "1 ay içinde";

const benefits = [
  {
    icon: Target,
    title: "Stratejiyle Üreten Ajans",
    desc: "Her iş “post atalım” diye başlamaz. Dou Social’da markayı, hedefi ve sonucu anlayarak üretir; fikri stratejiyle büyütürüz.",
  },
  {
    icon: ChartLine,
    title: "Gerçek Projeler, Gerçek Etki",
    desc: "Simülasyon değil, gerçek markalar. Çalıştığın her projede performansı, dönüşümü ve yarattığın etkiyi net şekilde görürsün.",
  },
  {
    icon: Wand2,
    title: "Kreatif + Teknoloji Dengesi",
    desc: "Yaratıcılığı yapay zeka, otomasyon ve modern araçlarla destekleriz. Zamanı tekrara değil, fikre ve kaliteye ayırırsın.",
  },
  {
    icon: Lightbulb,
    title: "Hızlı, Şeffaf ve Öğreten Kültür",
    desc: "Fikirler hiyerarşide kaybolmaz. Denersin, öğrenirsin, gelişirsin. İnisiyatif alan, sorumluluk isteyen bir ekip kültürü sunarız.",
  },
];

const positions = [
  {
    id: 1,
    title: "Grafik Tasarımcı",
    department: "Tasarım",
    type: "Tam Zamanlı",
    location: "Ofisten / Denizli",
    tags: ["Sosyal medya post & story", "Photoshop", "Illustrator"],
  },
  {
    id: 2,
    title: "Motion Designer / Video Editor",
    department: "Video & Motion",
    type: "Tam Zamanlı",
    location: "Ofisten / Denizli",
    tags: ["Reels video", "Motion post", "After Effects", "Premiere Pro"],
  },
  {
    id: 3,
    title: "Meta & Google Ads Uzmanı",
    department: "Performans Pazarlama",
    type: "Tam Zamanlı",
    location: "Ofisten / Denizli",
    tags: ["Meta Ads", "Google Ads", "Pixel & CAPI"],
  },
  {
    id: 4,
    title: "No-Code / Otomasyon Uzmanı",
    department: "Otomasyon",
    type: "Tam Zamanlı",
    location: "Ofisten / Denizli",
    tags: ["CRM entegrasyonu", "Zapier", "Make", "Otomasyon akışları", "N8N"],
  },
];

const studentPrograms = [
  {
    id: 101,
    title: "Sosyal Medya Yöneticisi",
    department: "Staj Programı",
    type: "Staj",
    location: "Ofisten / Denizli",
    desc: "Gerçek markalar için içerik planlamayı, trend takibini ve sosyal medya yönetimini birebir ajans içinde öğrenmek isteyen öğrenciler için.",
  },
  {
    id: 102,
    title: "Video Editör",
    department: "Staj Programı",
    type: "Staj",
    location: "Ofisten / Denizli",
    desc: "Reels ve kısa video üretimini, kurgu–montaj süreçlerini ve ajansın video üretim akışını uygulamalı öğrenmek isteyen öğrenciler için.",
  },
  {
    id: 103,
    title: "Grafik Tasarımcı",
    department: "Staj Programı",
    type: "Staj",
    location: "Ofisten / Denizli",
    desc: "Sosyal medya ve reklam tasarımları üreterek gerçek projelerde tasarım becerilerini geliştirmek isteyen öğrenciler için.",
  },
];

const internProgramOptions: InternProgram[] = [
  "Sosyal Medya Yöneticisi Stajyeri",
  "Video Editör Stajyeri",
  "Grafik Tasarımcı Stajyeri",
];

const internDayOptions: InternDays[] = ["2 gün", "3 gün", "4 gün", "5 gün"];
const internDurationOptions: InternDuration[] = [
  "Zorunlu staj (okul kapsamında)",
  "Gönüllü staj",
];

const staffPositionOptions: StaffPosition[] = [
  "Account Manager",
  "Grafik Tasarımcı",
  "Video Editör / Motion Designer",
  "Sosyal Medya Uzmanı",
  "Reklam & Performans Uzmanı",
  "Diğer",
];

const staffWorkTypeOptions: StaffWorkType[] = ["Tam zamanlı", "Yarı zamanlı"];
const staffExperienceOptions: StaffExperience[] = [
  "Deneyimsiz",
  "0–1 yıl",
  "1–3 yıl",
  "3+ yıl",
];
const staffAvailabilityOptions: StaffAvailability[] = [
  "Hemen",
  "2 hafta içinde",
  "1 ay içinde",
];

export default function CareerPage() {
  const [activeTab, setActiveTab] = useState<CareerTab>("pro");
  const [activePage, setActivePage] = useState<PageTab>("home");
  const [activeForm, setActiveForm] = useState<"intern" | "staff" | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();
  const listings = activeTab === "pro" ? positions : studentPrograms;

  const [internForm, setInternForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    school: "",
    program: "" as InternProgram | "",
    days: "" as InternDays | "",
    duration: "" as InternDuration | "",
    tools: "",
    learnGoals: "",
    motivation: "",
    portfolio: "",
    extra: "",
  });

  const [staffForm, setStaffForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    position: "" as StaffPosition | "",
    workType: "" as StaffWorkType | "",
    experience: "" as StaffExperience | "",
    agencies: "",
    tools: "",
    strengths: "",
    reason: "",
    fit: "",
    salary: "",
    availability: "" as StaffAvailability | "",
    portfolio: "",
    extra: "",
  });

  const handleNavChange = (page: PageTab) => {
    setActivePage(page);
    const target = page === "home" ? "/" : `/#${page}`;
    router.push(target);
  };

  const handleTitleMove = (event: React.MouseEvent<HTMLSpanElement>) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    target.style.setProperty("--spot-x", `${x}px`);
    target.style.setProperty("--spot-y", `${y}px`);
  };

  const resetTitleGlow = (event: React.MouseEvent<HTMLSpanElement>) => {
    const target = event.currentTarget;
    target.style.setProperty("--spot-x", "50%");
    target.style.setProperty("--spot-y", "50%");
  };

  type GlowStyle = React.CSSProperties & {
    ["--spot-x"]?: string;
    ["--spot-y"]?: string;
  };

  const titleGlowStyle: GlowStyle = {
    backgroundImage:
      "radial-gradient(140px circle at var(--spot-x) var(--spot-y), rgba(255,255,255,0.9), rgba(255,255,255,0.35) 40%, transparent 65%), linear-gradient(90deg, #111111, #800000, #ff4d6d)",
    ["--spot-x"]: "50%",
    ["--spot-y"]: "50%",
  };

  const inputClass =
    "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#ff4d6d]/20 focus:border-[#ff4d6d]/50";

  const labelClass = "text-xs font-semibold text-neutral-700";

  const mapInternProgram = (title: string): InternProgram => {
    if (title.toLowerCase().includes("sosyal medya")) {
      return "Sosyal Medya Yöneticisi Stajyeri";
    }
    if (title.toLowerCase().includes("video")) {
      return "Video Editör Stajyeri";
    }
    return "Grafik Tasarımcı Stajyeri";
  };

  const mapStaffPosition = (title: string): StaffPosition => {
    if (title.toLowerCase().includes("grafik")) return "Grafik Tasarımcı";
    if (title.toLowerCase().includes("motion") || title.toLowerCase().includes("video")) {
      return "Video Editör / Motion Designer";
    }
    if (title.toLowerCase().includes("ads") || title.toLowerCase().includes("reklam")) {
      return "Reklam & Performans Uzmanı";
    }
    return "Diğer";
  };

  const handleApplyClick = (title: string) => {
    setSubmitStatus(null);
    if (activeTab === "student") {
      setInternForm((prev) => ({ ...prev, program: mapInternProgram(title) }));
      setActiveForm("intern");
      return;
    }

    setStaffForm((prev) => ({ ...prev, position: mapStaffPosition(title) }));
    setActiveForm("staff");
  };

  const handleCloseForm = () => {
    setSubmitStatus(null);
    setIsSubmitting(false);
    setActiveForm(null);
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleInternSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    sendCareerApplicationEmail({ kind: "intern", data: internForm })
      .then((result) => {
        if (result?.success) {
          setActiveForm(null);
          showToast("Başvurunuz alınmıştır, teşekkür ederiz!");
        } else {
          setSubmitStatus({
            type: "error",
            message: result?.error || "Başvuru gönderilemedi. Lütfen tekrar deneyin.",
          });
        }
      })
      .catch(() => {
        setSubmitStatus({
          type: "error",
          message: "Başvuru gönderilemedi. Lütfen tekrar deneyin.",
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleStaffSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    sendCareerApplicationEmail({ kind: "staff", data: staffForm })
      .then((result) => {
        if (result?.success) {
          setActiveForm(null);
          showToast("Başvurunuz alınmıştır, teşekkür ederiz!");
        } else {
          setSubmitStatus({
            type: "error",
            message: result?.error || "Başvuru gönderilemedi. Lütfen tekrar deneyin.",
          });
        }
      })
      .catch(() => {
        setSubmitStatus({
          type: "error",
          message: "Başvuru gönderilemedi. Lütfen tekrar deneyin.",
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#f7f6f2] text-neutral-900 relative overflow-x-hidden">
      <InteractiveBackground />

      <div className="pointer-events-none fixed inset-0 -z-10 opacity-50 bg-[linear-gradient(rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:48px_48px]" />

      <Navbar activePage={activePage} setActivePage={handleNavChange} variant="light" />

      <main className="relative z-10 max-w-6xl mx-auto px-4 pb-20 pt-24 md:pt-28">
        {/* HERO */}
        <section className="text-center max-w-4xl mx-auto mb-20 animate-fade-in">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-4 py-1.5 mb-6 text-xs text-neutral-700">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff4d6d]/60 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff4d6d]" />
            </span>
            Ekibimizi büyütüyoruz
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            <span
              onMouseMove={handleTitleMove}
              onMouseLeave={resetTitleGlow}
              className="relative inline-block bg-clip-text text-transparent transition-[filter] duration-300 hover:drop-shadow-[0_0_18px_rgba(255,77,109,0.35)]"
              style={titleGlowStyle}
            >
              Geleceği birlikte tasarlayalım.
            </span>
          </h1>

          <p className="text-base md:text-lg text-neutral-600 leading-relaxed">
            Sıradan bir ajans değil, yaratıcılık ve performansın kesiştiği bir teknoloji üssüyüz.
            Tutkulu, meraklı ve sınırları zorlamayı seven yetenekleri arıyoruz.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={() =>
                document.getElementById("openings")?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-7 py-3 rounded-xl bg-[#111111] text-white font-semibold inline-flex items-center gap-2 hover:bg-[#1a1a1a] transition-all shadow-lg shadow-black/15"
            >
              Açık Pozisyonlar
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* VALUE PROPOSITION */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Neden Dou Social?</h2>
              <p className="text-sm text-neutral-600 mt-2">
                AI teknolojilerine erişim, global vizyon ve esnek çalışma kültürüyle fark yaratıyoruz.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="group p-6 rounded-2xl bg-white border border-black/10 hover:border-[#ff4d6d]/40 hover:shadow-[0_0_30px_rgba(255,77,109,0.12)] transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-neutral-100 rounded-xl flex items-center justify-center mb-4 text-neutral-500 group-hover:text-[#ff4d6d] group-hover:bg-[#ff4d6d]/10 transition-all">
                    <Icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed group-hover:text-neutral-700">
                    {benefit.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* TAB SWITCHER */}
        <section className="w-full max-w-md mx-auto mb-12">
          <div className="relative p-1 rounded-2xl bg-white/80 border border-black/10 backdrop-blur">
            <span
              className={`absolute top-1 bottom-1 left-1 w-[calc(50%-0.25rem)] rounded-xl bg-[#111111] shadow-lg shadow-black/10 transition-transform duration-500 ease-out ${
                activeTab === "pro" ? "translate-x-0" : "translate-x-full"
              }`}
            />
            <div className="relative z-10 grid grid-cols-2">
              <button
                onClick={() => setActiveTab("pro")}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ease-out active:scale-[0.98] ${
                  activeTab === "pro"
                    ? "text-white"
                    : "text-neutral-500 hover:text-neutral-900"
                }`}
              >
                <Briefcase className="w-4 h-4" />
                Profesyoneller
              </button>
              <button
                onClick={() => setActiveTab("student")}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ease-out active:scale-[0.98] ${
                  activeTab === "student"
                    ? "text-white"
                    : "text-neutral-500 hover:text-neutral-900"
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                Genç Yetenekler
              </button>
            </div>
          </div>
        </section>

        {/* JOB LISTINGS */}
        <section id="openings" className="w-full max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-8 border-b border-black/10 pb-4">
            <div>
              <h2 className="text-3xl font-bold">Açık Pozisyonlar</h2>
              <p className="text-neutral-600 mt-2 text-sm">
                {activeTab === "pro"
                  ? "Deneyiminle fark yaratacağın roller."
                  : "Kariyerine güçlü bir başlangıç yapacağın fırsatlar."}
              </p>
            </div>
          </div>

          <div key={activeTab} className="space-y-4 animate-fade-in">
            {listings.map((job) => (
              <div
                key={job.id}
                className="group relative overflow-hidden rounded-2xl border border-black/10 bg-white p-6 transition-all duration-300 hover:border-[#ff4d6d]/50 hover:shadow-[0_0_40px_rgba(255,77,109,0.12)]"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_top,rgba(255,77,109,0.15),transparent_60%)]" />

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-bold text-[#800000] uppercase tracking-wider">
                        {job.department}
                      </span>
                      {activeTab === "student" && (
                        <span className="px-2 py-0.5 rounded text-[10px] bg-[#ff4d6d]/10 text-[#7a1a1a] border border-[#ff4d6d]/30">
                          Staj Programı
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-900 group-hover:text-[#800000] transition-colors">
                      {job.title}
                    </h3>

                    <div className="flex flex-wrap gap-4 mt-3 text-sm text-neutral-600">
                      <div className="flex items-center">
                        <Clock className="w-3.5 h-3.5 mr-1.5" />
                        {job.type}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-3.5 h-3.5 mr-1.5" />
                        {job.location}
                      </div>
                    </div>

                    {"tags" in job && job.tags && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {job.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 rounded-md bg-neutral-100 text-xs text-neutral-700 border border-black/10 group-hover:border-black/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {"desc" in job && job.desc && (
                      <p className="mt-3 text-sm text-neutral-600">{job.desc}</p>
                    )}
                  </div>

                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() => handleApplyClick(job.title)}
                      className="flex items-center gap-2 text-sm font-semibold text-neutral-900 bg-neutral-100 px-5 py-2.5 rounded-lg border border-black/10 group-hover:bg-[#111111] group-hover:text-white transition-all duration-300"
                    >
                      Başvur
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          <div className="mt-12 p-8 rounded-2xl bg-white border border-dashed border-black/20 text-center">
            <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Rocket className="w-6 h-6 text-neutral-500" />
            </div>
            <h3 className="text-lg font-medium text-neutral-900">Aradığın pozisyonu bulamadın mı?</h3>
            <p className="text-neutral-600 text-sm mt-2 max-w-md mx-auto">
              Yetenek havuzumuza katıl, senin için uygun bir fırsat olduğunda ilk sana haber verelim.
            </p>
            <button className="mt-6 text-sm text-[#800000] hover:text-[#ff4d6d] font-medium border-b border-[#ff4d6d]/40 hover:border-[#ff4d6d] pb-0.5 transition-colors">
              Genel Başvuru Gönder
            </button>
          </div>
        </section>
      </main>

      <footer className="border-t border-black/10 bg-white/80 backdrop-blur py-10">
        <div className="max-w-6xl mx-auto px-4 grid gap-8 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="space-y-3">
            <div className="text-lg font-semibold text-neutral-900">
              Dou<span className="text-[#800000]">Social</span>
            </div>
            <p className="text-sm text-neutral-600 leading-relaxed max-w-sm">
              Creative Performance ajansı olarak strateji, içerik, reklam ve otomasyonu
              tek sistemde birleştiriyoruz.
            </p>
            <p className="text-xs text-neutral-500">© 2026 Dou Social. Tüm hakları saklıdır.</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-neutral-900 mb-3">Hızlı Erişim</h4>
            <div className="flex flex-col gap-2 text-sm">
              <a href="/" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                Ana Sayfa
              </a>
              <a href="/#about" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                Hakkımızda
              </a>
              <a href="/#wizard" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                Paket Önerici
              </a>
              <a href="/#contact" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                İletişim
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-neutral-900 mb-3">İletişim</h4>
            <div className="text-sm text-neutral-600 space-y-2">
              <a href="mailto:info@dousocial.com" className="hover:text-neutral-900 transition-colors">
                info@dousocial.com
              </a>
              <a href="tel:+905300845468" className="hover:text-neutral-900 transition-colors">
                +90 530 084 54 68
              </a>
              <p>Denizli, Türkiye</p>
              <a
                href="https://wa.me/905300845468"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#800000] hover:text-[#ff4d6d] transition-colors"
              >
                WhatsApp’tan Yazın
              </a>
            </div>
          </div>
        </div>
      </footer>

      {activeForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0"
            onClick={handleCloseForm}
          />
          <div className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl border border-black/10 p-6 md:p-8">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <p className="text-xs font-semibold text-[#800000] uppercase tracking-[0.2em]">
                  Dou Social
                </p>
                <h3 className="text-2xl md:text-3xl font-bold text-neutral-900">
                  {activeForm === "intern" ? "Stajyer Başvuru Formu" : "Çalışan Başvuru Formu"}
                </h3>
                <p className="text-sm text-neutral-500 mt-2">
                  {activeForm === "intern"
                    ? "Sosyal Medya, Video Editör ve Grafik Tasarım stajyerleri için başvuru formu."
                    : "Tam zamanlı veya yarı zamanlı pozisyonlar için başvuru formu."}
                </p>
              </div>
              <button
                onClick={handleCloseForm}
                className="rounded-full border border-black/10 px-3 py-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 hover:border-black/30 transition-colors"
              >
                Kapat
              </button>
            </div>

            {submitStatus?.type === "error" && (
              <div
                className={`mb-6 rounded-xl border px-4 py-3 text-sm ${
                  submitStatus.type === "error"
                    ? "border-red-200 bg-red-50 text-red-700"
                    : ""
                }`}
              >
                {submitStatus.message}
              </div>
            )}

            {activeForm === "intern" && (
              <form onSubmit={handleInternSubmit} className="space-y-8">
                <section className="space-y-4">
                  <h4 className="text-sm font-semibold text-neutral-800">
                    1. Genel Bilgiler
                  </h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className={labelClass}>Ad Soyad</label>
                      <input
                        type="text"
                        className={inputClass}
                        value={internForm.fullName}
                        onChange={(e) =>
                          setInternForm((prev) => ({ ...prev, fullName: e.target.value }))
                        }
                        autoComplete="name"
                        placeholder="Adınız Soyadınız"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className={labelClass}>Telefon Numarası</label>
                      <input
                        type="tel"
                        className={inputClass}
                        value={internForm.phone}
                        onChange={(e) =>
                          setInternForm((prev) => ({ ...prev, phone: e.target.value }))
                        }
                        autoComplete="tel"
                        placeholder="05xx xxx xx xx"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className={labelClass}>E-posta Adresi</label>
                      <input
                        type="email"
                        className={inputClass}
                        value={internForm.email}
                        onChange={(e) =>
                          setInternForm((prev) => ({ ...prev, email: e.target.value }))
                        }
                        autoComplete="email"
                        placeholder="ornek@mail.com"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className={labelClass}>Okuduğun Üniversite / Bölüm</label>
                      <input
                        type="text"
                        className={inputClass}
                        value={internForm.school}
                        onChange={(e) =>
                          setInternForm((prev) => ({ ...prev, school: e.target.value }))
                        }
                        autoComplete="organization"
                        placeholder="Üniversite / Bölüm"
                        required
                      />
                    </div>
                  </div>
                </section>

                <section className="space-y-4">
                  <h4 className="text-sm font-semibold text-neutral-800">
                    2. Staj Alanı Seçimi
                  </h4>
                  <div className="space-y-2">
                    <label className={labelClass}>
                      Hangi staj programına başvuruyorsun?
                    </label>
                    <select
                      className={inputClass}
                      value={internForm.program}
                      onChange={(e) =>
                        setInternForm((prev) => ({
                          ...prev,
                          program: e.target.value as InternProgram,
                        }))
                      }
                      autoComplete="on"
                      required
                    >
                      <option value="" disabled>
                        Seçiniz
                      </option>
                      {internProgramOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </section>

                <section className="space-y-4">
                  <h4 className="text-sm font-semibold text-neutral-800">
                    3. Zaman & Devam Durumu
                  </h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className={labelClass}>Haftada kaç gün staj yapabilirsin?</label>
                      <select
                        className={inputClass}
                        value={internForm.days}
                        onChange={(e) =>
                          setInternForm((prev) => ({
                            ...prev,
                            days: e.target.value as InternDays,
                          }))
                        }
                        autoComplete="on"
                        required
                      >
                        <option value="" disabled>
                          Seçiniz
                        </option>
                        {internDayOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className={labelClass}>Staj süren ne kadar olacak?</label>
                      <select
                        className={inputClass}
                        value={internForm.duration}
                        onChange={(e) =>
                          setInternForm((prev) => ({
                            ...prev,
                            duration: e.target.value as InternDuration,
                          }))
                        }
                        autoComplete="on"
                        required
                      >
                        <option value="" disabled>
                          Seçiniz
                        </option>
                        {internDurationOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </section>

                <section className="space-y-4">
                  <h4 className="text-sm font-semibold text-neutral-800">
                    4. Yetkinlik & İlgi
                  </h4>
                  <div className="space-y-2">
                    <label className={labelClass}>
                      Kullandığın ya da aşina olduğun programlar / araçlar
                    </label>
                    <textarea
                      className={inputClass + " min-h-[96px]"}
                      value={internForm.tools}
                      onChange={(e) =>
                        setInternForm((prev) => ({ ...prev, tools: e.target.value }))
                      }
                      autoComplete="on"
                      placeholder="Instagram, Canva, Photoshop, Premiere Pro..."
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>Bu stajdan ne öğrenmek istiyorsun?</label>
                    <textarea
                      className={inputClass + " min-h-[96px]"}
                      value={internForm.learnGoals}
                      onChange={(e) =>
                        setInternForm((prev) => ({ ...prev, learnGoals: e.target.value }))
                      }
                      autoComplete="on"
                      required
                    />
                  </div>
                </section>

                <section className="space-y-4">
                  <h4 className="text-sm font-semibold text-neutral-800">5. Motivasyon</h4>
                  <div className="space-y-2">
                    <label className={labelClass}>
                      Neden Dou Social’da staj yapmak istiyorsun?
                    </label>
                    <textarea
                      className={inputClass + " min-h-[96px]"}
                      value={internForm.motivation}
                      onChange={(e) =>
                        setInternForm((prev) => ({ ...prev, motivation: e.target.value }))
                      }
                      autoComplete="on"
                      required
                    />
                  </div>
                </section>

                <section className="space-y-4">
                  <h4 className="text-sm font-semibold text-neutral-800">6. Ek Bilgiler</h4>
                  <div className="space-y-2">
                    <label className={labelClass}>
                      Portfolyo / Instagram / Behance / Drive linki (varsa)
                    </label>
                    <input
                      type="url"
                      className={inputClass}
                      value={internForm.portfolio}
                      onChange={(e) =>
                        setInternForm((prev) => ({ ...prev, portfolio: e.target.value }))
                      }
                      autoComplete="url"
                      placeholder="https://"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>Eklemek istediğin başka bir bilgi var mı?</label>
                    <textarea
                      className={inputClass + " min-h-[80px]"}
                      value={internForm.extra}
                      onChange={(e) =>
                        setInternForm((prev) => ({ ...prev, extra: e.target.value }))
                      }
                      autoComplete="on"
                    />
                  </div>
                </section>

                <div className="flex flex-col sm:flex-row gap-3 justify-end">
                  <button
                    type="button"
                    onClick={handleCloseForm}
                    className="px-5 py-2.5 rounded-xl border border-black/10 text-sm font-semibold text-neutral-600 hover:text-neutral-900"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                      isSubmitting
                        ? "bg-neutral-300 text-neutral-600 cursor-not-allowed"
                        : "bg-[#111111] text-white hover:bg-[#1c1c1c]"
                    }`}
                  >
                    {isSubmitting ? "Gönderiliyor..." : "Başvuruyu Gönder"}
                  </button>
                </div>
              </form>
            )}

            {activeForm === "staff" && (
              <form onSubmit={handleStaffSubmit} className="space-y-8">
                <section className="space-y-4">
                  <h4 className="text-sm font-semibold text-neutral-800">
                    1. Genel Bilgiler
                  </h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className={labelClass}>Ad Soyad</label>
                      <input
                        type="text"
                        className={inputClass}
                        value={staffForm.fullName}
                        onChange={(e) =>
                          setStaffForm((prev) => ({ ...prev, fullName: e.target.value }))
                        }
                        autoComplete="name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className={labelClass}>Telefon Numarası</label>
                      <input
                        type="tel"
                        className={inputClass}
                        value={staffForm.phone}
                        onChange={(e) =>
                          setStaffForm((prev) => ({ ...prev, phone: e.target.value }))
                        }
                        autoComplete="tel"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className={labelClass}>E-posta Adresi</label>
                      <input
                        type="email"
                        className={inputClass}
                        value={staffForm.email}
                        onChange={(e) =>
                          setStaffForm((prev) => ({ ...prev, email: e.target.value }))
                        }
                        autoComplete="email"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className={labelClass}>İkamet Şehri</label>
                      <input
                        type="text"
                        className={inputClass}
                        value={staffForm.city}
                        onChange={(e) =>
                          setStaffForm((prev) => ({ ...prev, city: e.target.value }))
                        }
                        autoComplete="address-level2"
                        required
                      />
                    </div>
                  </div>
                </section>

                <section className="space-y-4">
                  <h4 className="text-sm font-semibold text-neutral-800">
                    2. Pozisyon Bilgisi
                  </h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className={labelClass}>Başvurduğun pozisyon</label>
                      <select
                        className={inputClass}
                        value={staffForm.position}
                        onChange={(e) =>
                          setStaffForm((prev) => ({
                            ...prev,
                            position: e.target.value as StaffPosition,
                          }))
                        }
                        autoComplete="on"
                        required
                      >
                        <option value="" disabled>
                          Seçiniz
                        </option>
                        {staffPositionOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className={labelClass}>Çalışma tercihin</label>
                      <select
                        className={inputClass}
                        value={staffForm.workType}
                        onChange={(e) =>
                          setStaffForm((prev) => ({
                            ...prev,
                            workType: e.target.value as StaffWorkType,
                          }))
                        }
                        autoComplete="on"
                        required
                      >
                        <option value="" disabled>
                          Seçiniz
                        </option>
                        {staffWorkTypeOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </section>

                <section className="space-y-4">
                  <h4 className="text-sm font-semibold text-neutral-800">3. Deneyim</h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className={labelClass}>
                        Bu alandaki toplam deneyim süren
                      </label>
                      <select
                        className={inputClass}
                        value={staffForm.experience}
                        onChange={(e) =>
                          setStaffForm((prev) => ({
                            ...prev,
                            experience: e.target.value as StaffExperience,
                          }))
                        }
                        autoComplete="on"
                        required
                      >
                        <option value="" disabled>
                          Seçiniz
                        </option>
                        {staffExperienceOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className={labelClass}>
                        Daha önce çalıştığın ajanslar / markalar (varsa)
                      </label>
                      <input
                        type="text"
                        className={inputClass}
                        value={staffForm.agencies}
                        onChange={(e) =>
                          setStaffForm((prev) => ({ ...prev, agencies: e.target.value }))
                        }
                        autoComplete="organization"
                      />
                    </div>
                  </div>
                </section>

                <section className="space-y-4">
                  <h4 className="text-sm font-semibold text-neutral-800">
                    4. Yetkinlikler
                  </h4>
                  <div className="space-y-2">
                    <label className={labelClass}>Hakim olduğun araçlar / platformlar</label>
                    <textarea
                      className={inputClass + " min-h-[96px]"}
                      value={staffForm.tools}
                      onChange={(e) =>
                        setStaffForm((prev) => ({ ...prev, tools: e.target.value }))
                      }
                      autoComplete="on"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>Güçlü olduğunu düşündüğün alanlar</label>
                    <textarea
                      className={inputClass + " min-h-[96px]"}
                      value={staffForm.strengths}
                      onChange={(e) =>
                        setStaffForm((prev) => ({ ...prev, strengths: e.target.value }))
                      }
                      autoComplete="on"
                      required
                    />
                  </div>
                </section>

                <section className="space-y-4">
                  <h4 className="text-sm font-semibold text-neutral-800">
                    5. Çalışma & Beklenti
                  </h4>
                  <div className="space-y-2">
                    <label className={labelClass}>
                      Dou Social’da çalışmak isteme sebebin nedir?
                    </label>
                    <textarea
                      className={inputClass + " min-h-[96px]"}
                      value={staffForm.reason}
                      onChange={(e) =>
                        setStaffForm((prev) => ({ ...prev, reason: e.target.value }))
                      }
                      autoComplete="on"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>
                      Kendini bu pozisyon için neden uygun görüyorsun?
                    </label>
                    <textarea
                      className={inputClass + " min-h-[96px]"}
                      value={staffForm.fit}
                      onChange={(e) =>
                        setStaffForm((prev) => ({ ...prev, fit: e.target.value }))
                      }
                      autoComplete="on"
                      required
                    />
                  </div>
                </section>

                <section className="space-y-4">
                  <h4 className="text-sm font-semibold text-neutral-800">
                    6. Ücret & Müsaitlik
                  </h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className={labelClass}>Ücret beklentin (opsiyonel)</label>
                      <input
                        type="text"
                        className={inputClass}
                        value={staffForm.salary}
                        onChange={(e) =>
                          setStaffForm((prev) => ({ ...prev, salary: e.target.value }))
                        }
                        autoComplete="on"
                        placeholder="Opsiyonel"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className={labelClass}>Ne zaman başlayabilirsin?</label>
                      <select
                        className={inputClass}
                        value={staffForm.availability}
                        onChange={(e) =>
                          setStaffForm((prev) => ({
                            ...prev,
                            availability: e.target.value as StaffAvailability,
                          }))
                        }
                        autoComplete="on"
                        required
                      >
                        <option value="" disabled>
                          Seçiniz
                        </option>
                        {staffAvailabilityOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </section>

                <section className="space-y-4">
                  <h4 className="text-sm font-semibold text-neutral-800">
                    7. Portfolyo & Ek Bilgiler
                  </h4>
                  <div className="space-y-2">
                    <label className={labelClass}>
                      Portfolyo / CV / LinkedIn / Drive linki
                    </label>
                    <input
                      type="url"
                      className={inputClass}
                      value={staffForm.portfolio}
                      onChange={(e) =>
                        setStaffForm((prev) => ({ ...prev, portfolio: e.target.value }))
                      }
                      autoComplete="url"
                      placeholder="https://"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={labelClass}>Eklemek istediğin başka bir bilgi var mı?</label>
                    <textarea
                      className={inputClass + " min-h-[80px]"}
                      value={staffForm.extra}
                      onChange={(e) =>
                        setStaffForm((prev) => ({ ...prev, extra: e.target.value }))
                      }
                      autoComplete="on"
                    />
                  </div>
                </section>

                <div className="flex flex-col sm:flex-row gap-3 justify-end">
                  <button
                    type="button"
                    onClick={handleCloseForm}
                    className="px-5 py-2.5 rounded-xl border border-black/10 text-sm font-semibold text-neutral-600 hover:text-neutral-900"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                      isSubmitting
                        ? "bg-neutral-300 text-neutral-600 cursor-not-allowed"
                        : "bg-[#111111] text-white hover:bg-[#1c1c1c]"
                    }`}
                  >
                    {isSubmitting ? "Gönderiliyor..." : "Başvuruyu Gönder"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {toastMessage && (
        <div className="fixed top-6 right-6 z-[60]">
          <div className="rounded-2xl border border-green-200 bg-green-50 px-5 py-3 text-sm font-semibold text-green-800 shadow-lg">
            {toastMessage}
          </div>
        </div>
      )}
    </div>
  );
}
