"use client";

import React, { useState } from 'react';
// import { saveLeadToSheet } from './actions'; // ESKİ (Hatalı)
import { saveLeadToSheet } from '../actions'; // YENİ: Kök dizinden import (Daha güvenli)
import confetti from 'canvas-confetti'; 
import { 
  Check, ChevronRight, Sparkles, Loader2, MessageCircle, Fingerprint, 
  Palette, Star, RefreshCcw, Bot, User, Briefcase, Phone, Mail,
  X, CheckCircle2 
} from 'lucide-react';

// --- CONFIG ---
// GÜVENLİK NOTU: Gerçek projede bu API Key'i sunucu tarafına (actions.ts) taşıyın.
const apiKey = "AIzaSyBBikXR8UdBhpsA0mS_84ml3TcQH__xdi4"; 
const AGENCY_WHATSAPP_NUMBER = "905424407672"; 

// --- TYPES ---
type Category = 'social' | 'production' | 'ads' | 'automation' | '360';
type Level = 'low' | 'mid' | 'high';
type ScenarioType = 'economy' | 'growth' | 'aggressive';

interface AgencyPackage {
  id: string;
  name: string;
  category: Category;
  target_audience: string[];
  content_level: Level;
  video_weight: Level;
  platform_count: number;
  total_content_count: number;
  shoot_days: number;
  price: number;
  currency: 'TL' | 'USD';
  description: string;
  features: string[];
}

interface UserAnswers {
  business_type: string;
  goal: string;
  content_volume: string;
  ads_needs: string;
  budget_range: string;
}

interface LeadInfo {
  fullName: string;
  companyName: string;
  phone: string;
  email: string;
}

interface Scenarios {
  economy: { items: AgencyPackage[], total: number, label: string, desc: string };
  growth: { items: AgencyPackage[], total: number, label: string, desc: string };
  aggressive: { items: AgencyPackage[], total: number, label: string, desc: string };
}

// --- DATA ---
const PACKAGES: AgencyPackage[] = [
  // SOSYAL MEDYA
  { id: 'sm1', name: 'Paket 1 - Başlangıç', category: 'social', target_audience: ['kucuk'], content_level: 'low', video_weight: 'low', platform_count: 1, total_content_count: 8, shoot_days: 0, price: 10000, currency: 'TL', description: 'Temel sosyal medya varlığı.', features: ['1 Platform', '6 Post + 2 Reels', 'Temel Tasarım'] },
  { id: 'sm2', name: 'Paket 2 - Büyüme', category: 'social', target_audience: ['orta'], content_level: 'mid', video_weight: 'mid', platform_count: 2, total_content_count: 16, shoot_days: 3, price: 20000, currency: 'TL', description: 'İdeal büyüme paketi.', features: ['2 Platform', '8 Post + 8 Reels', '3 Çekim Günü', 'Moderasyon'] },
  { id: 'sm3', name: 'Paket 3 - Profesyonel', category: 'social', target_audience: ['buyuk'], content_level: 'high', video_weight: 'high', platform_count: 3, total_content_count: 20, shoot_days: 4, price: 25000, currency: 'TL', description: 'Tam kapsamlı yönetim.', features: ['3 Platform', '10 Post + 10 Reels', '4 Çekim Günü', 'Rakip Analizi'] },
  // PRODÜKSİYON
  { id: 'prodA', name: 'Paket A - Mini Çekim', category: 'production', target_audience: ['hepsi'], content_level: 'low', video_weight: 'mid', platform_count: 0, total_content_count: 13, shoot_days: 0.5, price: 5000, currency: 'TL', description: 'Hızlı içerik üretimi.', features: ['2-3 Saat Çekim', '10 Foto + 3 Reels'] },
  { id: 'prodB', name: 'Paket B - Gün Boyu', category: 'production', target_audience: ['otel'], content_level: 'high', video_weight: 'high', platform_count: 0, total_content_count: 40, shoot_days: 1, price: 10000, currency: 'TL', description: 'Geniş kapsamlı çekim.', features: ['Tam Gün Çekim', 'Drone Çekimi', 'Tanıtım Filmi'] },
  // REKLAM
  { id: 'ads1', name: 'R1 - Temel Reklam', category: 'ads', target_audience: ['kucuk'], content_level: 'low', video_weight: 'low', platform_count: 2, total_content_count: 0, shoot_days: 0, price: 10000, currency: 'TL', description: 'Sponsorlu reklam girişi.', features: ['Insta & FB Reklam', 'Aylık Rapor'] },
  { id: 'ads2', name: 'R2 - Performans', category: 'ads', target_audience: ['eticaret'], content_level: 'mid', video_weight: 'mid', platform_count: 2, total_content_count: 0, shoot_days: 0, price: 17500, currency: 'TL', description: 'Veriye dayalı reklam.', features: ['Gelişmiş Meta', 'A/B Testleri', 'Landing Page'] },
  { id: 'ads3', name: 'R3 - Tam Büyüme', category: 'ads', target_audience: ['buyuk'], content_level: 'high', video_weight: 'high', platform_count: 3, total_content_count: 0, shoot_days: 0, price: 25500, currency: 'TL', description: 'Full performans.', features: ['Meta + Google Ads', 'Remarketing', 'Haftalık Rapor'] },
  // 360
  { id: '360S', name: '360 S - Standart', category: '360', target_audience: ['startup'], content_level: 'mid', video_weight: 'mid', platform_count: 2, total_content_count: 10, shoot_days: 1, price: 30000, currency: 'TL', description: 'Tek elden yönetim.', features: ['Sosyal Medya + Reklam', 'Tek Fatura'] },
  { id: '360XL', name: '360 XL - Dominasyon', category: '360', target_audience: ['holding'], content_level: 'high', video_weight: 'high', platform_count: 4, total_content_count: 30, shoot_days: 4, price: 60000, currency: 'TL', description: 'Pazar liderliği paketi.', features: ['Tüm Dijital Süreçler', 'VIP Destek', 'Strateji Toplantıları'] },
];

const QUESTIONS = [
  { id: 1, text: "Hangi sektörde hizmet veriyorsunuz?", key: "business_type", options: [{ label: "Hizmet / Danışmanlık", value: "hizmet" }, { label: "E-Ticaret", value: "eticaret" }, { label: "Mekan / Otel", value: "mekan" }, { label: "Kurumsal / B2B", value: "kurumsal" }, { label: "Gayrimenkul", value: "emlak" }] },
  { id: 2, text: "Ana hedefiniz nedir?", key: "goal", options: [{ label: "Marka Bilinirliği", value: "bilinirlik" }, { label: "Sıcak Satış / Ciro", value: "satis" }, { label: "Lead / Form Toplama", value: "lead" }, { label: "Prestij / İmaj", value: "prestij" }] },
  { id: 3, text: "İçerik durumunuz nedir?", key: "content_volume", options: [{ label: "Sıfırdan çekim lazım", value: "cekim_lazim" }, { label: "Materyal var, kurgu lazım", value: "materyal_var" }, { label: "Sadece statik tasarım", value: "statik" }] },
  { id: 4, text: "Reklam bütçesi (Sponsorlu)?", key: "ads_needs", options: [{ label: "Organik büyüyelim", value: "organik" }, { label: "Ufak destek bütçesi", value: "dusuk_reklam" }, { label: "Agresif reklam", value: "yuksek_reklam" }] },
  { id: 5, text: "Aylık AJANS bütçeniz?", key: "budget_range", options: [{ label: "10-20 Bin ₺", value: "low" }, { label: "20-40 Bin ₺", value: "mid" }, { label: "40-75 Bin ₺", value: "high" }, { label: "75 Bin ₺ +", value: "vip" }] }
];

// --- HELPER FUNCTIONS ---
function safeJsonParse(text: string | null) {
  if (!text) return null;
  let cleanText = text.replace(/```json/gi, '').replace(/```/g, '');
  const firstBrace = cleanText.indexOf('{');
  const lastBrace = cleanText.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1) {
    cleanText = cleanText.substring(firstBrace, lastBrace + 1);
  }
  try {
    return JSON.parse(cleanText);
  } catch (error) {
    console.warn("JSON Parse Uyarısı:", error);
    return null;
  }
}

async function callGemini(prompt: string): Promise<string | null> {
  const models = ['gemini-2.5-flash-preview-09-2025', 'gemini-1.5-flash', 'gemini-pro'];
  for (const model of models) {
    try {
      if (!apiKey || apiKey.length < 10) return null;
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.4,
              ...(model.includes('flash') ? { response_mime_type: "application/json" } : {})
            }
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || null;
      }
    } catch (error) {
      console.warn(`Model Error (${model}):`, error);
    }
  }
  return null;
}

const Wizard = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<UserAnswers>>({});
  const [leadInfo, setLeadInfo] = useState<LeadInfo>({ fullName: '', companyName: '', phone: '', email: '' });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [scenarios, setScenarios] = useState<Scenarios | null>(null);
  const [activeTab, setActiveTab] = useState<ScenarioType>('growth');
  const [strategyNote, setStrategyNote] = useState<string>('');
  const [brandIdentity, setBrandIdentity] = useState<any>(null);
  const [isLoadingIdentity, setIsLoadingIdentity] = useState(false);
  const [leadScore, setLeadScore] = useState<{ score: number, label: string }>({ score: 0, label: 'Cold' });
  const [errors, setErrors] = useState<{ phone?: string; email?: string }>({});
  
  // YENİ: Başarı Modalı State'i
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const calculateLeadScore = (ans: Partial<UserAnswers>) => {
    let score = 0;
    if (ans.budget_range === 'vip') score += 40;
    else if (ans.budget_range === 'high') score += 30;
    else if (ans.budget_range === 'mid') score += 15;
    
    if (ans.goal === 'satis' || ans.goal === 'lead') score += 30;
    else score += 10;

    if (ans.ads_needs === 'yuksek_reklam') score += 30;
    else if (ans.ads_needs === 'dusuk_reklam') score += 15;

    let label = 'Cold';
    if (score > 70) label = 'Hot 🔥';
    else if (score > 40) label = 'Warm 🌤️';

    return { score, label };
  };

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({ ...prev, [QUESTIONS[step].key]: value }));
    if (step < QUESTIONS.length - 1) {
      setTimeout(() => setStep(s => s + 1), 250);
    } else {
      setTimeout(() => setStep(s => s + 1), 250);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(s => s - 1);
  };

  const validateForm = () => {
    const newErrors: { phone?: string; email?: string } = {};
    let isValid = true;
    if (leadInfo.phone.length < 10) {
        newErrors.phone = "Lütfen geçerli bir telefon numarası giriniz (En az 10 hane).";
        isValid = false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(leadInfo.email)) {
        newErrors.email = "Lütfen geçerli bir e-posta adresi giriniz.";
        isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const saveToDatabase = async (data: any) => {
    console.log("🚀 Google Sheets işlemi başlatılıyor...", data);
    try {
      const result = await saveLeadToSheet(data);
      if (result.success) {
        console.log("✅ Başarıyla Google Sheet'e kaydedildi!");
      } else {
        console.error("❌ Kayıt hatası (Server):", result.error);
      }
    } catch (e) {
      console.error("❌ Beklenmedik hata (Client):", e);
    }
  };

  // --- KONFETİ EFEKTİ ---
  const fireConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 }; // Modal'ın (z-50) üstünde olsun

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // Ekranın iki köşesinden rastgele konfeti fırlat
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return; 

    setIsAnalyzing(true);
    const scoreData = calculateLeadScore(answers);
    setLeadScore(scoreData);

    // 1. Veriyi Kaydet
    await saveToDatabase({ 
      ...leadInfo, 
      ...answers, 
      score: scoreData 
    });

    // 2. Yükleme ekranını durdur, Konfeti patlat ve Modalı aç
    setIsAnalyzing(false);
    fireConfetti();
    setShowSuccessModal(true);

    // 3. Arka planda raporu oluşturmaya devam et
    generateRecommendation();
  };

  const generateRecommendation = async () => {
    const getLabel = (key: any, val: any) => QUESTIONS.find(q => q.key === key)?.options.find(o => o.value === val)?.label || val;

    const prompt = `
      Sen uzman bir dijital ajans stratejistisin.
      Müşteri: ${getLabel('business_type', answers.business_type)}, Hedef: ${getLabel('goal', answers.goal)}, Bütçe: ${getLabel('budget_range', answers.budget_range)}.
      
      GÖREV: Bu müşteri için en ideal paket kombinasyonunu seç.
      ÇIKTI (JSON): { "recommended_ids": ["sm2", "ads1"], "strategy_note": "Strateji metni..." }
    `;

    const responseText = await callGemini(prompt);
    const result = safeJsonParse(responseText);
    
    const baseIds = result?.recommended_ids || ['sm1'];
    const aiNote = result?.strategy_note || "Hedeflerinize uygun strateji oluşturuldu.";
    setStrategyNote(aiNote);

    const baseItems = PACKAGES.filter(p => baseIds.includes(p.id));
    const baseTotal = baseItems.reduce((acc, i) => acc + i.price, 0);

    const growthScenario = {
      items: baseItems,
      total: baseTotal,
      label: "Büyüme Planı (Önerilen)",
      desc: "İhtiyaçlarınızı tam karşılayan ideal denge."
    };

    const economyIds = baseItems.map(i => {
      const cheapestInCat = PACKAGES.filter(p => p.category === i.category).sort((a,b) => a.price - b.price)[0];
      return cheapestInCat.id;
    });
    const economyItems = PACKAGES.filter(p => [...new Set(economyIds)].includes(p.id));
    const economyScenario = {
      items: economyItems,
      total: economyItems.reduce((acc, i) => acc + i.price, 0),
      label: "Başlangıç Planı",
      desc: "Bütçe dostu, temel gereksinimler."
    };

    const aggressiveIds = baseItems.map(i => {
      const expensiveInCat = PACKAGES.filter(p => p.category === i.category).sort((a,b) => b.price - a.price)[0];
      return expensiveInCat.id;
    });
    if (answers.budget_range === 'vip' || answers.budget_range === 'high') aggressiveIds.push('360XL');
    
    const aggressiveItems = PACKAGES.filter(p => [...new Set(aggressiveIds)].includes(p.id));
    const aggressiveScenario = {
      items: aggressiveItems,
      total: aggressiveItems.reduce((acc, i) => acc + i.price, 0),
      label: "Agresif Büyüme",
      desc: "Pazar liderliği için maksimum güç."
    };

    setScenarios({
      economy: economyScenario,
      growth: growthScenario,
      aggressive: aggressiveScenario
    });
  };

  const generateBrandIdentity = async () => {
    setIsLoadingIdentity(true);
    const prompt = `Marka Kimliği oluştur: Sektör ${answers.business_type}, Hedef ${answers.goal}. JSON formatında: {archetype, archetype_description, tones:[], slogans:[], visual_style:{colors, imagery, typography}}`;
    const res = await callGemini(prompt);
    const data = safeJsonParse(res);
    if (data) setBrandIdentity(data);
    setIsLoadingIdentity(false);
  };

  const handleWhatsAppClick = () => {
    if (!scenarios) return;
    const currentScenario = scenarios[activeTab];
    const pkgNames = currentScenario.items.map(i => i.name).join('\n- ');
    const msg = `Merhaba, ${leadInfo.fullName} ben (${leadInfo.companyName}).\nSeçtiğim Plan: ${currentScenario.label}\nPaketler:\n- ${pkgNames}\n\nToplam: ${currentScenario.total}₺`;
    window.open(`https://wa.me/${AGENCY_WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const restart = () => {
    setStep(0); 
    setAnswers({}); 
    setScenarios(null); 
    setBrandIdentity(null); 
    setLeadInfo({ fullName: '', companyName: '', phone: '', email: '' });
    setShowSuccessModal(false); // Modalı sıfırla
  };

  // --- RENDER ---
  if (isAnalyzing) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-brand mb-6"></div>
        <h2 className="text-2xl font-bold mb-2">Veriler İşleniyor...</h2>
        <p className="text-neutral-400">Lütfen bekleyiniz, bağlantı kuruluyor.</p>
      </div>
    );
  }

  // Scenarios varsa Raporu göster (Ama Modal açıksa modal üstte olacak)
  if (scenarios) {
    const currentData = scenarios[activeTab];
    return (
      <div className="max-w-6xl mx-auto animate-in fade-in duration-500 relative">
        
        {/* --- SUCCESS MODAL --- */}
        {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div 
              className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"
              onClick={() => setShowSuccessModal(false)}
            />
            <div className="relative bg-[#111] border border-white/10 rounded-3xl p-8 max-w-md w-full text-center shadow-2xl shadow-brand/30 animate-in zoom-in-95 duration-300 overflow-hidden">
              {/* Glow Effect */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-brand/40 rounded-full blur-[50px] -mt-16 pointer-events-none"></div>

              <div className="relative z-10">
                <div className="mx-auto w-20 h-20 bg-linear-to-br from-brand to-red-600 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-red-900/40">
                  <CheckCircle2 className="text-white w-10 h-10 animate-bounce" />
                </div>
                
                <h2 className="text-3xl font-bold text-white mb-2">Harikasınız!</h2>
                <p className="text-neutral-400 mb-8 leading-relaxed text-sm">
                  Bilgileriniz bize başarıyla ulaştı. Yapay zeka şu an işletmeniz için en stratejik yol haritasını arka planda hazırladı.
                </p>

                <button 
                  onClick={() => setShowSuccessModal(false)}
                  className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-neutral-200 transition-all transform hover:scale-[1.02] shadow-lg"
                >
                  Raporumu Görüntüle
                </button>
              </div>

              <button 
                onClick={() => setShowSuccessModal(false)}
                className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row justify-between items-center mb-8 pb-4 border-b border-white/10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-2">
              Sonuç Raporu <Sparkles className="text-brand" />
            </h1>
            <div className="flex gap-2 text-sm text-neutral-400 mt-1">
              <span>{leadInfo.companyName}</span>
              <span>•</span>
              <span className={`${leadScore.label.includes('Hot') ? 'text-green-500' : 'text-yellow-500'}`}>
                Potansiyel: {leadScore.label} ({leadScore.score}/100)
              </span>
            </div>
          </div>
          <div className="flex gap-3">
               <button onClick={restart} className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white px-4 py-2 rounded-lg hover:bg-white/5"><RefreshCcw size={16} /> Yeni Test</button>
          </div>
        </div>

        <div className="bg-linear-to-br from-neutral-900 to-[#1a0000]/30 p-6 rounded-2xl border border-white/10 mb-8 backdrop-blur-sm">
          <div className="flex items-start gap-4">
            <Bot className="text-brand shrink-0 mt-1" size={32} />
            <div>
              <h3 className="font-bold text-lg mb-2">Strateji Özeti</h3>
              <p className="text-neutral-300 leading-relaxed text-sm md:text-base">{strategyNote}</p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="grid grid-cols-3 gap-2 p-1 bg-neutral-900/80 rounded-xl border border-white/10 mb-6 backdrop-blur-sm">
            {(['economy', 'growth', 'aggressive'] as ScenarioType[]).map((type) => (
              <button
                key={type}
                onClick={() => setActiveTab(type)}
                className={`py-3 px-4 rounded-lg text-sm font-bold transition-all duration-300 ${
                  activeTab === type 
                  ? 'bg-brand text-white shadow-lg' 
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {scenarios[type].label}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Star className="text-brand" size={20} />
                {currentData.label} İçeriği
              </h3>
              <p className="text-neutral-400 text-sm mb-4">{currentData.desc}</p>
              
              <div className="grid md:grid-cols-2 gap-4">
                {currentData.items.map((pkg, idx) => (
                  <div 
                    key={idx} 
                    className={`
                      bg-neutral-900/60 border border-white/10 p-5 rounded-xl transition-all duration-300
                      hover:border-brand hover:shadow-lg hover:shadow-brand/20 hover:-translate-y-2
                      flex flex-col h-full animate-in slide-in-from-bottom-4 fade-in fill-mode-both
                      ${(currentData.items.length % 2 !== 0 && idx === currentData.items.length - 1) ? 'md:col-span-2' : ''}
                    `}
                    style={{ animationDelay: `${idx * 150}ms` }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold px-2 py-1 rounded bg-white/5 text-neutral-300 uppercase">{pkg.category}</span>
                      <span className="text-brand font-bold">{pkg.price.toLocaleString()}₺</span>
                    </div>
                    <h4 className="font-bold text-white mb-1">{pkg.name}</h4>
                    <ul className="space-y-2 mt-3 grow">
                      {pkg.features.map((f, i) => (
                        <li key={i} className="text-xs text-neutral-400 flex items-start gap-2">
                          <Check size={12} className="text-brand mt-0.5" /> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-brand p-6 rounded-2xl text-white shadow-xl shadow-brand/20 sticky top-8 text-center transition-all duration-300 hover:shadow-brand/40 hover:-translate-y-1">
                <div className="text-white/80 text-sm font-medium mb-1">Toplam Aylık Yatırım</div>
                <div className="text-4xl font-bold mb-1">{currentData.total.toLocaleString()}₺</div>
                <div className="text-xs text-white/60 mb-6">+KDV</div>
                
                <button onClick={handleWhatsAppClick} className="w-full bg-white text-brand py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-neutral-100 transition-colors shadow-lg">
                  <MessageCircle size={18} /> Planı Onayla
                </button>
                <p className="text-[10px] text-white/70 mt-4 leading-tight">
                  Bu plan {leadInfo.companyName} için özel olarak oluşturulmuştur. Fiyatlar tahmini olup, detaylı toplantıda netleşecektir.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 mt-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold flex items-center gap-2"><Fingerprint className="text-brand"/> Marka Kimliği Analizi</h3>
            {!brandIdentity && (
              <button onClick={generateBrandIdentity} disabled={isLoadingIdentity} className="bg-neutral-800 border border-white/10 px-4 py-2 rounded text-xs hover:bg-neutral-700 transition-colors flex items-center gap-2">
                {isLoadingIdentity ? <Loader2 className="animate-spin" size={14}/> : <Palette size={14}/>} {isLoadingIdentity ? 'Analiz Ediliyor...' : 'Analizi Başlat'}
              </button>
            )}
          </div>
          {brandIdentity && (
            <div className="grid md:grid-cols-2 gap-6 bg-neutral-900/40 p-6 rounded-xl border border-white/5 animate-in fade-in">
              <div>
                <div className="text-brand text-sm font-bold uppercase mb-1">Arketip</div>
                <div className="text-2xl font-bold text-white mb-2">{brandIdentity.archetype}</div>
                <p className="text-neutral-400 text-sm mb-4">{brandIdentity.archetype_description}</p>
                <div className="flex flex-wrap gap-2">
                  {brandIdentity.tones?.map((t: string, i: number) => <span key={i} className="px-2 py-1 bg-white/5 rounded text-xs text-neutral-300">{t}</span>)}
                </div>
              </div>
              <div>
                <div className="text-brand text-sm font-bold uppercase mb-2">Slogan Önerileri</div>
                <ul className="space-y-2">
                  {brandIdentity.slogans?.map((s: string, i: number) => <li key={i} className="text-neutral-300 italic text-sm border-b border-white/5 pb-1">"{s}"</li>)}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  const progress = ((step) / (QUESTIONS.length + 1)) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto py-8">
         <div className="w-full h-1 bg-neutral-900 fixed top-20 left-0 z-40">
            <div className="h-full bg-brand transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
        </div>

        {step < QUESTIONS.length ? (
        <>
          <div className="mb-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            <span className="text-brand font-bold text-xs tracking-widest uppercase mb-2 block">ADIM {step + 1} / {QUESTIONS.length}</span>
            <h2 className="text-3xl font-bold text-white mb-6">{QUESTIONS[step].text}</h2>
          </div>
          <div className="space-y-3">
            {QUESTIONS[step].options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(opt.value)}
                className="w-full flex items-center justify-between p-5 bg-neutral-900/80 border border-white/10 rounded-xl hover:border-brand hover:bg-brand/10 transition-all text-left group backdrop-blur-sm"
              >
                <span className="text-lg font-medium text-neutral-300 group-hover:text-white">{opt.label}</span>
                <ChevronRight className="text-neutral-600 group-hover:text-brand transition-all" />
              </button>
            ))}
          </div>
          <div className="mt-8 flex justify-between items-center px-2">
            <button onClick={handleBack} disabled={step === 0} className={`text-neutral-500 hover:text-white text-sm transition-colors ${step === 0 ? 'opacity-0 cursor-default' : ''}`}>← Önceki</button>
          </div>
        </>
      ) : (
        <div className="bg-neutral-900/90 p-8 rounded-2xl border border-white/10 backdrop-blur-md animate-in zoom-in duration-300 shadow-2xl">
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-brand/20 rounded-full flex items-center justify-center mx-auto mb-4 text-brand">
              <Check size={24} />
            </div>
            <h2 className="text-2xl font-bold text-white">Harika! Son bir adım...</h2>
            <p className="text-neutral-400 text-sm mt-2">AI raporunuzu hazırlamak ve size iletmek için bilgilerinizi girin.</p>
          </div>
          
          <form onSubmit={handleLeadSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-neutral-500 ml-1 mb-1 block">Adınız Soyadınız</label>
              <div className="relative">
                <User className="absolute left-3 top-3.5 text-neutral-500" size={18} />
                <input 
                  required 
                  type="text" 
                  className="w-full bg-black/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:border-brand focus:outline-none transition-colors"
                  placeholder="Örn: Ahmet Yılmaz"
                  value={leadInfo.fullName}
                  onChange={e => setLeadInfo({...leadInfo, fullName: e.target.value})}
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-neutral-500 ml-1 mb-1 block">İşletme Adı</label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-3.5 text-neutral-500" size={18} />
                <input 
                  required 
                  type="text" 
                  className="w-full bg-black/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:border-brand focus:outline-none transition-colors"
                  placeholder="Örn: Yılmaz Mimarlık"
                  value={leadInfo.companyName}
                  onChange={e => setLeadInfo({...leadInfo, companyName: e.target.value})}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-neutral-500 ml-1 mb-1 block">Telefon</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3.5 text-neutral-500" size={18} />
                  <input 
                    required 
                    type="tel" 
                  className={`w-full bg-black/50 border rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none transition-colors ${errors.phone ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-brand'}`}
                    placeholder="5XX..."
                    value={leadInfo.phone}
                    onChange={e => {
                      const val = e.target.value.replace(/\D/g, ''); 
                      setLeadInfo({...leadInfo, phone: val});
                      if (errors.phone) setErrors({...errors, phone: undefined});
                    }}
                    maxLength={11}
                  />
                  {errors.phone && <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.phone}</p>}
                </div>
              </div>
              <div>
                <label className="text-xs text-neutral-500 ml-1 mb-1 block">E-Posta</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 text-neutral-500" size={18} />
                  <input 
                    required 
                    type="email" 
                  className={`w-full bg-black/50 border rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none transition-colors ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-brand'}`}
                    placeholder="isim@sirket.com"
                    value={leadInfo.email}
                    onChange={e => {
                      setLeadInfo({...leadInfo, email: e.target.value});
                      if (errors.email) setErrors({...errors, email: undefined});
                    }}
                  />
                  {errors.email && <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.email}</p>}
                </div>
              </div>
            </div>
            <button type="submit" className="w-full bg-brand hover:bg-brand-900 text-white font-bold py-4 rounded-lg mt-4 transition-all transform hover:scale-[1.02] shadow-lg flex items-center justify-center gap-2">
              Raporu Göster <ChevronRight size={20} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Wizard;