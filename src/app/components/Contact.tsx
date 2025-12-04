"use client";

import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  SendHorizonal,
  HelpCircle,
  ChevronDown,
  Quote,
  Play,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";

interface ContactProps {
  onContactSubmit?: () => void;
}

const faqs = [
  {
    question: "Ön görüşme ücretli mi?",
    answer:
      "Hayır, ilk keşif görüşmesi tamamen ücretsizdir. Mevcut durumunuzu, hedeflerinizi ve bütçenizi analiz eder, size en mantıklı modeli öneririz.",
  },
  {
    question: "Fiyat hemen netleşiyor mu?",
    answer:
      "Sitede gördüğünüz paketler ve AI öneriler sadece yol gösterici. Fiyat; sektör, şehir, ihtiyaç duyulan içerik sayısı ve reklam bütçesine göre netleşir.",
  },
  {
    question: "Minimum çalışma süresi ve bütçe nedir?",
    answer:
      "Genellikle minimum 3 aylık çalışma öneriyoruz. Aylık reklam + üretim bütçesi ise işletme tipine göre değişmekle birlikte, çok küçük bütçelerle mucize vaat etmiyoruz.",
  },
  {
    question: "Sözleşme ve raporlama süreci nasıl işliyor?",
    answer:
      "Onay sonrası karşılıklı sözleşme yapılır. Aylık düzenli rapor ve gerektiğinde haftalık özetlerle, tam olarak nereye ne harcandığını görürsünüz.",
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

    const whatsappNumber = "905424407672"; // Dou Social WhatsApp numarası (ülke kodlu)

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

      <div className="relative max-w-5xl mx-auto space-y-10">
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
                  className="w-full rounded-lg bg-neutral-800/70 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:border-[#800000]/60"
                  placeholder="Örn. Dou Social / İstanbul Fitness A"
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

            {/* Neden Dou Social Kartı */}
            <div className="rounded-2xl border border-white/10 bg-neutral-900/70 p-5 backdrop-blur shadow-[0_0_30px_rgba(0,0,0,0.4)] space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-[#ffb3b3]" size={18} />
                <h3 className="text-sm font-semibold text-white">
                  Neden Dou Social ile çalışmalısınız?
                </h3>
              </div>
              <ul className="space-y-2 text-xs text-neutral-300">
                <li>• Sadece beğeni değil, satış ve lead konuşuyoruz.</li>
                <li>• Spor, sağlık, deneyim ve hizmet odaklı markalarda uzmanlık.</li>
                <li>• Her ay test edilen creative’ler ve net raporlama.</li>
                <li>• WhatsApp, otomasyon ve CRM entegrasyonuna hakim bir ekip.</li>
              </ul>
            </div>
          </div>

          {/* SAĞ: İletişim Bilgileri + Hızlı WhatsApp CTA */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="rounded-2xl bg-neutral-900/60 border border-white/10 p-6 backdrop-blur space-y-6 shadow-[0_0_40px_rgba(0,0,0,0.4)]">
              <h3 className="text-lg font-semibold text-white">
                İletişim Bilgileri
              </h3>

              <div className="flex items-start gap-3">
                <Phone className="text-[#ffb3b3]" size={20} />
                <div className="text-sm text-neutral-300">
                  <p>0542 440 76 72</p>
                  <p className="text-xs text-neutral-500">
                    Hafta içi 09:00 – 18:00
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="text-[#ffb3b3]" size={20} />
                <div className="text-sm text-neutral-300">
                  <p>iletisim@dousocial.com</p>
                  <p className="text-xs text-neutral-500">
                    Genel destek & proje teklifleri
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="text-[#ffb3b3]" size={20} />
                <div className="text-sm text-neutral-300">
                  <p>Kayalar Mah. Menderes Bulvarı</p>
                  <p>Aquamall AVM No: 185</p>
                  <p>Merkezefendi / Denizli</p>
                </div>
              </div>
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
                  href="https://wa.me/905424407672"
                  target="_blank"
                  className="inline-flex items-center gap-2 rounded-full bg-[#25D366] text-black px-5 py-2.5 font-semibold text-sm hover:scale-[1.02] active:scale-95 transition-transform shadow-md shadow-[#25D366]/40"
                >
                  WhatsApp’tan Yazın
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ALT GRID: Testimonial + SSS + Harita */}
        <div className="grid gap-8 md:grid-cols-[1.4fr_minmax(0,1fr)]">
          {/* Sol: Testimonial + FAQ */}
          <div className="space-y-6">
            {/* Testimonial / Video Mockup */}
            <div className="rounded-2xl border border-white/10 bg-neutral-900/70 p-5 backdrop-blur shadow-[0_0_40px_rgba(0,0,0,0.4)] space-y-4">
              <div className="flex items-center gap-2">
                <Quote className="text-[#ffb3b3]" size={18} />
                <h3 className="text-sm font-semibold text-white">
                  Müşteri Deneyimi (Örnek)
                </h3>
              </div>

              <div className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-neutral-950 to-neutral-800 aspect-video flex items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.1),_transparent_60%)]" />
                <button
                  type="button"
                  className="relative flex flex-col items-center gap-2"
                >
                  <div className="h-14 w-14 rounded-full bg-black/60 border border-white/40 flex items-center justify-center shadow-lg shadow-black/60">
                    <Play size={22} className="text-white ml-0.5" />
                  </div>
                  <span className="text-xs text-neutral-200">
                    İstanbul Fitness A • 6 ayda dönüşüm hikayesi
                  </span>
                  <span className="text-[10px] text-neutral-400">
                    (Bu alan gerçek case video’nuzla değiştirilebilir.)
                  </span>
                </button>
              </div>

              <p className="text-xs md:text-sm text-neutral-300 leading-relaxed">
                “Dou Social ile çalışmaya başladıktan sonra, rastgele paylaşım
                mantığından çıkıp net bir kampanya takvimiyle ilerlemeye başladık.
                Reklam bütçemiz aynı kaldı ama gelen kaliteli soru sayısı ciddi
                şekilde arttı.”
              </p>
              <p className="text-[11px] text-neutral-400">
                — Örnek Marka Yöneticisi, Denizli
              </p>
            </div>

            {/* SSS / FAQ */}
            <div className="rounded-2xl border border-white/10 bg-neutral-900/70 p-5 backdrop-blur shadow-[0_0_40px_rgba(0,0,0,0.4)] space-y-4">
              <div className="flex items-center gap-2">
                <HelpCircle className="text-[#ffb3b3]" size={18} />
                <h3 className="text-sm font-semibold text-white">
                  Sık Sorulan Sorular
                </h3>
              </div>

              <div className="space-y-2">
                {faqs.map((item, index) => {
                  const isActive = activeFaq === index;
                  return (
                    <div
                      key={index}
                      className="rounded-xl border border-white/10 bg-black/30"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setActiveFaq(isActive ? null : index)
                        }
                        className="w-full flex items-center justify-between gap-3 px-3 py-2.5 text-left"
                      >
                        <span className="text-xs md:text-sm text-neutral-200">
                          {item.question}
                        </span>
                        <ChevronDown
                          size={16}
                          className={`text-neutral-400 transition-transform ${
                            isActive ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isActive && (
                        <div className="px-3 pb-3 text-[11px] md:text-xs text-neutral-400">
                          {item.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sağ: Harita Kartı */}
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
                src="https://www.google.com/maps/embed?pb="
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;