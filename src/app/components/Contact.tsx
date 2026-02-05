"use client";
import CustomerExperienceSlider from "../components/CustomerExperienceSlider";
import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  SendHorizonal,
  ChevronDown,
  Quote,
  DollarSign,
  Layers,
  FlaskConical,
  Cpu,
  MessageCircle,
} from "lucide-react";

interface ContactProps {
  onContactSubmit?: () => void;
}

const faqs = [
  {
    question: "Hangi sektörlerle çalışıyorsunuz?",
    answer:
      "Dou Social olarak sektör seçmekten çok doğru hedef kitle ve satış modeli ile ilgileniyoruz.\nBugüne kadar hizmet sektörü, e-ticaret, sağlık & fitness, gıda, inşaat/taş-mermer, mimarlık ve yerel işletmeler ile çalıştık.\nÖzetle: Satılabilir bir ürünü ya da hizmeti olan her markaya sistem kurarız.",
  },
  {
    question: "Sosyal medya mı yapıyorsunuz, reklam mı?",
    answer:
      "Biz “post paylaşan ajans” değiliz.\nSosyal medya, reklam, içerik ve teknoloji tarafını tek bir satış sistemi altında yönetiyoruz.\nAmaç; beğeni değil, talep ve müşteri üretmek.",
  },
  {
    question: "Satış ve lead odaklı çalışma ne anlama geliyor?",
    answer:
      "Tüm çalışmalar;\n• Form dolduran\n• WhatsApp’tan yazan\n• DM atan\n• Satın alma niyeti olan\nkullanıcıyı merkeze alır.\nHer içerik ve reklamın ölçülebilir bir hedefi vardır.",
  },
  {
    question: "Reklam bütçesini siz mi yönetiyorsunuz?",
    answer:
      "Reklam bütçesi markanın kendi hesabından harcanır.\nDou Social bütçeyi kullanmaz; strateji, kurulum, optimizasyon ve büyütme tarafını yönetir.\nTüm süreç şeffaftır.",
  },
  {
    question: "Teknik kurulumları siz mi yapıyorsunuz?",
    answer:
      "Evet.\nPixel, CAPI, form, WhatsApp, DM, web sitesi, CRM ve ölçümleme altyapıları tarafımızdan kurulur.\nBu sayede reklamlar doğru veriye göre çalışır.",
  },
  {
    question: "Kreatif süreç nasıl ilerliyor?",
    answer:
      "Önce strateji, sonra kreatif.\nHer tasarım ve video;\n1️⃣ Hedef kitle\n2️⃣ Satın alma motivasyonu\n3️⃣ Platform algoritması\n dikkate alınarak üretilir.\n“Güzel görünsün” değil, iş yapsın diye tasarlarız.",
  },
  {
    question: "İçerikler ve reklamlar kimden onay alıyor?",
    answer:
      "Tüm içerikler yayına girmeden önce markanın onayına sunulur.\nSürpriz paylaşım ya da kontrolsüz reklam çıkılmaz.",
  },
  {
    question: "Raporlama nasıl yapılıyor?",
    answer:
      "Aylık olarak;\n• Harcanan bütçe\n• Lead / satış sayısı\n• Maliyetler\n• Performans analizi\n• Bir sonraki ayın planı\nnet ve anlaşılır şekilde paylaşılır.",
  },
  {
    question: "Minimum çalışma süresi var mı?",
    answer:
      "Evet. Sağlıklı sonuçlar için minimum 3 ay öneriyoruz.\nÇünkü sistem kurmak, test etmek ve ölçeklemek zaman ister.",
  },
  {
    question: "Dou Social ile çalışmak bana ne kazandırır?",
    answer:
      "Net cevap:\n➡️ Daha fazla doğru müşteri\n➡️ Ölçülebilir reklam sistemi\n➡️ Plansız değil, stratejik büyüme",
  },
];

const Contact: React.FC<ContactProps> = ({ onContactSubmit }) => {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    message: "",
  });

  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const premiumCards = [
    {
      title: "ROI Odaklı Satış Hunisi",
      description:
        'Sadece "beğeni" değil, banka hesabınıza yansıyan sonuçları konuşuyoruz. Her kuruşun dönüşünü ölçümlüyoruz.',
      icon: DollarSign,
    },
    {
      title: "Dikey Sektör Uzmanlığı",
      description:
        "Spor, sağlık ve deneyim odaklı niş pazarlarda derin tecrübe. Sektörünüzün dilini konuşan tek ajans.",
      icon: Layers,
    },
    {
      title: "Bilimsel Kreatif Testler",
      description:
        "A/B testleriyle doğrulanmış içerikler. Tahminlere değil, kullanıcı davranışlarına dayalı tasarımlar.",
      icon: FlaskConical,
    },
    {
      title: "Uçtan Uca Otomasyon",
      description:
        "WhatsApp, CRM ve AI destekli otomasyonlarla operasyonunuzu otomatikleştirin. Teknoloji sizin için çalışsın.",
      icon: Cpu,
    },
  ];

  const handleSpotlightMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty("--spot-x", `${x}px`);
    target.style.setProperty("--spot-y", `${y}px`);
  };

  const resetSpotlight = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    target.style.setProperty("--spot-x", `50%`);
    target.style.setProperty("--spot-y", `25%`);
  };

  const handleCardMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -8;
    const rotateY = ((x / rect.width) - 0.5) * 8;

    card.style.setProperty("--card-x", `${x}px`);
    card.style.setProperty("--card-y", `${y}px`);
    card.style.setProperty("--tilt-x", `${rotateY}deg`);
    card.style.setProperty("--tilt-y", `${rotateX}deg`);
  };

  const resetCard = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.setProperty("--tilt-x", `0deg`);
    card.style.setProperty("--tilt-y", `0deg`);
    card.style.setProperty("--card-x", `50%`);
    card.style.setProperty("--card-y", `50%`);
  };

  const handleFaqMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  const resetFaq = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.setProperty("--mouse-x", `50%`);
    card.style.setProperty("--mouse-y", `50%`);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basit validasyon
    if (!form.name || !form.email || !form.message) {
      alert("Lütfen ad, e-posta ve mesaj alanlarını doldurun.");
      return;
    }

    const whatsappNumber = "905300845468"; // Dou Social WhatsApp numarası (ülke kodlu)

    const text = `
Merhaba Dou Social 👋

Web sitenizdeki iletişim formundan yazıyorum.

Ad Soyad: ${form.name}
Şirket: ${form.company || "-"}
E-posta: ${form.email}

Mesajım:
${form.message}

Bu bilgileri kullanarak benimle iletişime geçebilirsiniz.
    `.trim();

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      text
    )}`;

    // WhatsApp'ı yeni sekmede aç
    window.open(url, "_blank");

    if (onContactSubmit) onContactSubmit();

    // Formu resetlemek istersen:
    setForm({
      name: "",
      company: "",
      email: "",
      message: "",
    });
  };

  return (
    <section className="relative">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-[#800000]/30 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto space-y-10">
        {/* Müşteri Deneyimleri */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-neutral-900/70 p-5 backdrop-blur shadow-[0_0_40px_rgba(0,0,0,0.4)] space-y-4">
            <div className="flex items-center gap-2">
              <Quote className="text-[#ffb3b3]" size={18} />
              <h3 className="text-sm font-semibold text-white">
                Müşteri Deneyimleri
              </h3>
            </div>

            <CustomerExperienceSlider />

            <p className="text-xs md:text-sm text-neutral-300 leading-relaxed">
              “Dou Social ile çalışmaya başladıktan sonra, rastgele paylaşım
              mantığından çıkıp net bir kampanya takvimiyle ilerlemeye başladık.
              Reklam bütçemiz aynı kaldı ama gelen kaliteli soru sayısı ciddi
              şekilde arttı.”
            </p>
            <p className="text-[11px] text-neutral-400">
              — FitlifeKitchen
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-neutral-900/70 p-5 backdrop-blur shadow-[0_0_40px_rgba(0,0,0,0.4)] space-y-4">
            <div className="flex items-center gap-2">
              <Quote className="text-[#ffb3b3]" size={18} />
              <h3 className="text-sm font-semibold text-white">
                Sektörün Dinamizmi
              </h3>
            </div>

            <div className="overflow-hidden rounded-xl border border-white/10 bg-black/40">
              <iframe
                title="Sektörün Dinamizmi | En20 Spor Merkezi"
                src="https://www.youtube.com/embed/Xa9IArXH37U"
                className="w-full aspect-video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <p className="text-center text-sm text-white/70">
              Sektörün Dinamizmi | En20 Spor Merkezi
            </p>

            <p className="text-xs md:text-sm text-neutral-300 leading-relaxed">
              En20 Spor Merkezi’nin enerjisini dijitale taşıyacak içerik ve
              performans kurgusunu birlikte şekillendirdik. Kısa sürede daha
              nitelikli üyelik talepleri ve sürdürülebilir bir iletişim dili
              yakalandı.
            </p>
            <p className="text-[11px] text-neutral-400">
              — En20 Spor Merkezi
            </p>
          </div>
        </div>

        {/* Neden Dou Social? */}
        <div
          className="premium-why relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-950/70 p-8 md:p-12"
          onMouseMove={handleSpotlightMove}
          onMouseLeave={resetSpotlight}
          style={
            {
              "--spot-x": "50%",
              "--spot-y": "20%",
            } as React.CSSProperties
          }
        >
          <div className="premium-grid" />
          <div className="premium-spotlight" />

          <div className="relative z-10 flex flex-col items-center text-center gap-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[11px] font-semibold tracking-widest uppercase text-white/70">
                Dijital Büyüme Ortağınız
              </span>
            </div>

            <h2 className="shimmer-text text-4xl md:text-6xl font-black tracking-tight text-white">
              Neden Dou Social?
            </h2>

            <p className="text-sm md:text-base text-neutral-400 max-w-2xl leading-relaxed">
              Geleneksel ajans modellerini geride bırakıyoruz. Veriyi sanata,
              etkileşimi satışa, teknolojiyi ise büyüme stratejinize dönüştürüyoruz.
            </p>
          </div>

          <div className="relative z-10 mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {premiumCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="premium-card rounded-[28px] p-6 md:p-7"
                  onMouseMove={handleCardMove}
                  onMouseLeave={resetCard}
                  style={
                    {
                      "--card-x": "50%",
                      "--card-y": "50%",
                      "--tilt-x": "0deg",
                      "--tilt-y": "0deg",
                    } as React.CSSProperties
                  }
                >
                  <div className="premium-icon mb-5">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-extrabold text-white mb-3 tracking-tight">
                    {card.title}
                  </h3>
                  <p className="text-xs md:text-sm text-neutral-400 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="relative z-10 mt-10 flex justify-center">
            <a
              href="https://wa.me/905300845468"
              target="_blank"
              rel="noopener noreferrer"
              className="premium-cta inline-flex items-center justify-center"
            >
              Bize Ulaşın!
            </a>
          </div>
        </div>

        {/* Title Section */}
        <div className="space-y-3 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Bizimle İletişime Geçin
          </h2>
          <p className="text-neutral-400 text-sm md:text-base max-w-2xl mx-auto">
            Projeniz, markanız veya büyüme hedefleriniz hakkında konuşalım. Ortalama
            24 saat içinde dönüş yapıyoruz.
          </p>
        </div>

        {/* Ana Grid: Form + İletişim Bilgileri */}
        <div className="grid gap-8 md:grid-cols-[1.3fr_minmax(0,1fr)]">
          {/* SOL: Form + Neden Dou Social */}
          <div className="space-y-5">
            {/* Contact Form */}
            <form
              onSubmit={handleSubmit}
              className="bg-neutral-900/70 border border-white/10 p-6 rounded-2xl backdrop-blur space-y-5 shadow-[0_0_40px_rgba(0,0,0,0.5)]"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-white">
                    Projenizi Anlatarak Başlayın
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Bu form, mesajınızı doğrudan WhatsApp’a taşıyacak şekilde
                    düzenlendi.
                  </p>
                </div>
                <div className="hidden md:flex items-center gap-1 rounded-full border border-white/10 px-3 py-1 text-[11px] text-neutral-300 bg-white/5">
                  <MessageCircle size={13} />
                  <span>WhatsApp’a yönlendirileceksiniz</span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm text-neutral-300">
                  Ad Soyad <span className="text-[#ffb3b3]">*</span>
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  autoComplete="name"
                  className="w-full rounded-lg bg-neutral-800/70 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:border-[#800000]/60"
                  placeholder="Örn. Deniz Kılıç"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm text-neutral-300">Şirket Adı</label>
                <input
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  autoComplete="organization"
                  className="w-full rounded-lg bg-neutral-800/70 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:border-[#800000]/60"
                  placeholder="Örn. Dou Social / En20 Sport's Club"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm text-neutral-300">
                  E-posta Adresi <span className="text-[#ffb3b3]">*</span>
                </label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  autoComplete="email"
                  className="w-full rounded-lg bg-neutral-800/70 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:border-[#800000]/60"
                  placeholder="Ornek: isim@firma.com"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm text-neutral-300">
                  Mesajınız <span className="text-[#ffb3b3]">*</span>
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  autoComplete="on"
                  className="w-full rounded-lg bg-neutral-800/70 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:border-[#800000]/60"
                  placeholder="Kısaca markanızı, hedefinizi ve hangi hizmetlerle ilgilendiğinizi yazabilirsiniz."
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-white text-black font-semibold py-3 text-sm flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-lg shadow-black/40"
              >
                WhatsApp’a Taşı ve Gönder
                <SendHorizonal size={16} />
              </button>

              <p className="text-[11px] text-neutral-500 text-center">
                Formu gönderdiğinizde, bilgileriniz WhatsApp mesajı olarak
                önceden doldurulacak. Son onayı WhatsApp üzerinden verirsiniz.
              </p>
            </form>

          </div>

          {/* SAĞ: İletişim Bilgileri + Hızlı WhatsApp CTA */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="rounded-2xl bg-neutral-900/60 border border-white/10 p-6 backdrop-blur space-y-6 shadow-[0_0_40px_rgba(0,0,0,0.4)]">
              <h3 className="text-lg font-semibold text-white">
                İletişim Bilgileri
              </h3>

             {/* SAĞ: İletişim Bilgileri + Hızlı WhatsApp CTA */}
<div className="space-y-6">
  {/* Contact Info */}
  <div className="rounded-2xl bg-neutral-900/60 border border-white/10 p-6 backdrop-blur space-y-6 shadow-[0_0_40px_rgba(0,0,0,0.4)]">
    <h3 className="text-lg font-semibold text-white">
      İletişim Bilgileri
    </h3>

    {/* Telefon */}
    <a
      href="tel:+905300845468"
      className="flex items-start gap-3 group"
    >
      <Phone className="text-[#ffb3b3] group-hover:scale-105 transition" size={20} />
      <div className="text-sm text-neutral-300">
        <p className="group-hover:text-white transition">
          0530 084 54 68
        </p>
        <p className="text-xs text-neutral-500">
          Hafta içi 09:00 – 18:00
        </p>
      </div>
    </a>

    {/* Mail */}
    <a
      href="mailto:iletisim@dousocial.com"
      className="flex items-start gap-3 group"
    >
      <Mail className="text-[#ffb3b3] group-hover:scale-105 transition" size={20} />
      <div className="text-sm text-neutral-300">
        <p className="group-hover:text-white transition">
          iletisim@dousocial.com
        </p>
        <p className="text-xs text-neutral-500">
          Genel destek &amp; proje teklifleri
        </p>
      </div>
    </a>

    {/* Adres */}
    <a
      href="https://www.google.com/maps/place//data=!4m2!3m1!1s0x14c73fdc1c33d3cd:0x3ad05ae70bb24de0?sa=X&ved=1t:8290&ictx=111"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-start gap-3 group"
    >
      <MapPin className="text-[#ffb3b3] group-hover:scale-105 transition" size={20} />
      <div className="text-sm text-neutral-300">
        <p className="group-hover:text-white transition">
          Zafer Mah. Zafer Cd. No:60/1, Merkezefendi / Denizli
        </p>
      </div>
    </a>
  </div>

  {/* Hızlı WhatsApp CTA Kartı */}
  <div className="rounded-2xl bg-gradient-to-br from-[#800000]/40 to-neutral-900/60 border border-white/10 p-6 shadow-[0_0_50px_rgba(128,0,0,0.4)] backdrop-blur">
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-white">
        Hızlı Bir Görüşme mi İstersiniz?
      </h3>
      <p className="text-sm text-neutral-300">
        Projeniz için doğru paketi seçmekte zorlanıyorsanız, 5 dakikalık
        hızlı bir WhatsApp görüşmesiyle yönlendirebiliriz.
      </p>

      <a
        href="https://wa.me/905300845468"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-[#25D366] text-black px-5 py-2.5 font-semibold text-sm hover:scale-[1.03] active:scale-95 transition-transform shadow-md shadow-[#25D366]/40"
      >
        WhatsApp’tan Yazın
        <ArrowRight size={16} />
      </a>
    </div>
  </div>
</div>

              
            </div>

            {/* Hızlı WhatsApp CTA Kartı */}
          
          </div>
        </div>

        {/* SSS / FAQ (Glass + Spotlight) */}
        <div
          className="faq-shell relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-950/70 p-8 md:p-12"
          onMouseMove={handleSpotlightMove}
          onMouseLeave={resetSpotlight}
          style={
            {
              "--spot-x": "50%",
              "--spot-y": "20%",
            } as React.CSSProperties
          }
        >
          <div className="faq-grid" />
          <div className="faq-spotlight" />

          <div className="relative z-10 text-center space-y-3">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
              Sıkça Sorulan Sorular
            </h2>
            <p className="text-sm md:text-base text-neutral-400 max-w-2xl mx-auto">
              Dou Social çalışma modeli ve süreçleri hakkında merak edilenler.
            </p>
          </div>

          <div className="relative z-10 mt-8 space-y-4 max-w-3xl mx-auto">
            {faqs.map((item, index) => {
              const isActive = activeFaq === index;
              return (
                <div
                  key={index}
                  className="glass-card rounded-2xl border border-white/10 bg-black/40"
                  onMouseMove={handleFaqMove}
                  onMouseLeave={resetFaq}
                  style={
                    {
                      "--mouse-x": "50%",
                      "--mouse-y": "50%",
                    } as React.CSSProperties
                  }
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isActive ? null : index)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="text-sm md:text-base font-semibold text-white">
                      {item.question}
                    </span>
                    <ChevronDown
                      size={18}
                      className={`text-neutral-300 transition-transform ${
                        isActive ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`px-5 pb-4 text-xs md:text-sm text-neutral-400 leading-relaxed whitespace-pre-line transition-all duration-300 ${
                      isActive ? "opacity-100 max-h-40" : "opacity-0 max-h-0"
                    }`}
                  >
                    {item.answer}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Harita Kartı */}
        <div className="rounded-2xl border border-white/10 bg-neutral-900/70 p-5 backdrop-blur shadow-[0_0_40px_rgba(0,0,0,0.4)] space-y-3">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <MapPin size={16} className="text-[#ffb3b3]" />
            Ofis Konumumuz
          </h3>
          <p className="text-[11px] md:text-xs text-neutral-400">
            Yüz yüze toplantı veya çekim planlamaları için, önceden haber
            vererek ofisimizi ziyaret edebilirsiniz.
          </p>

          <div className="overflow-hidden rounded-xl border border-white/10 bg-neutral-950/80 h-56 md:h-64">
            {/* Bu iframe src'sini kendi Google Maps embed kodunla değiştirebilirsin */}
            <iframe
              title="Dou Social Konum"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3152.405923686833!2d29.0763198!3d37.80395999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c73fdc1c33d3cd%3A0x3ad05ae70bb24de0!2sYAPIGRAN%C4%B0T%20MERMER!5e0!3m2!1str!2str!4v1765110593251!5m2!1str!2str"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .premium-grid {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
          background-size: 48px 48px;
          opacity: 0.35;
          pointer-events: none;
        }

        .premium-spotlight {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            600px circle at var(--spot-x) var(--spot-y),
            rgba(255, 255, 255, 0.08),
            transparent 55%
          );
          pointer-events: none;
          transition: background 0.2s ease;
        }

        .shimmer-text {
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.3) 0%,
            rgba(255, 255, 255, 1) 50%,
            rgba(255, 255, 255, 0.3) 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
        }

        .premium-card {
          position: relative;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(14px);
          transition: transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
          transform: perspective(900px) rotateX(var(--tilt-y)) rotateY(var(--tilt-x));
        }

        .premium-card::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 28px;
          background: radial-gradient(
            520px circle at var(--card-x) var(--card-y),
            rgba(255, 255, 255, 0.12),
            transparent 40%
          );
          opacity: 0;
          transition: opacity 0.35s ease;
          pointer-events: none;
        }

        .premium-card:hover {
          border-color: rgba(255, 255, 255, 0.3);
          transform: perspective(900px) translateY(-8px) scale(1.02) rotateX(var(--tilt-y))
            rotateY(var(--tilt-x));
          box-shadow: 0 24px 50px rgba(0, 0, 0, 0.55);
        }

        .premium-card:hover::before {
          opacity: 1;
        }

        .premium-icon {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.06);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease, background 0.3s ease;
        }

        .premium-card:hover .premium-icon {
          transform: rotate(-5deg) scale(1.05);
          background: rgba(255, 255, 255, 0.12);
        }

        .premium-cta {
          background: #ffffff;
          color: #0a0a0a;
          font-weight: 700;
          padding: 0.9rem 2.6rem;
          border-radius: 999px;
          box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.3);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .premium-cta:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 0 30px rgba(255, 255, 255, 0.2);
        }

        .faq-grid {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
          background-size: 50px 50px;
          opacity: 0.35;
          pointer-events: none;
        }

        .faq-spotlight {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            540px circle at var(--spot-x) var(--spot-y),
            rgba(255, 255, 255, 0.08),
            transparent 55%
          );
          pointer-events: none;
          transition: background 0.2s ease;
        }

        .glass-card {
          position: relative;
          backdrop-filter: blur(12px);
          overflow: hidden;
        }

        .glass-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(
            500px circle at var(--mouse-x) var(--mouse-y),
            rgba(255, 255, 255, 0.12),
            transparent 45%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        .glass-card:hover::before {
          opacity: 1;
        }

        @keyframes shimmer {
          to {
            background-position: 200% center;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .shimmer-text {
            animation: none;
          }
          .premium-card,
          .premium-card:hover {
            transform: none;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;
