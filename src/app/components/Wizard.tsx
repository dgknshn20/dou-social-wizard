"use client";

import React, { useState } from 'react';
import { saveLeadToSheet } from '../actions'; // actions.ts'in app klasöründe olduğunu varsayıyoruz
import { 
  Check, ChevronRight, Sparkles, Loader2, MessageCircle, Fingerprint, 
  Palette, Star, RefreshCcw, Bot, User, Briefcase, Phone, Mail 
} from 'lucide-react';

// --- CONFIG ---
const apiKey = "AIzaSyBBikXR8UdBhpsA0mS_84ml3TcQH__xdi4"; 
const AGENCY_WHATSAPP_NUMBER = "905424407672"; 

// --- TYPES ---
type Category = 'social' | 'production' | 'ads' | 'automation' | '360';
type Level = 'low' | 'mid' | 'high';

interface AgencyPackage {
  id: string;
  name: string;
  category: Category;
  target_audience: string[];
  content_level: Level;
  video_weight: Level;
  includes_ads: boolean;
  includes_strategy: boolean;
  includes_automation: boolean;
  base_price: number;
  description: string;
  features: string[];
}

type ScenarioType = 'economy' | 'growth' | 'aggressive';

interface ScenarioResult {
  type: ScenarioType;
  label: string;
  description: string;
  items: {
    id: string;
    name: string;
    category: string;
    price: number;
    features: string[];
  }[];
  total: number;
}

interface LeadScore {
  score: number;
  label: string;
  color: 'green' | 'yellow' | 'red';
}

interface WizardAnswers {
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

interface BrandIdentity {
  archetype: string;
  archetype_description: string;
  tones: string[];
  slogans: string[];
  visual_style: {
    colors: string[];
    imagery: string;
    typography: string;
  };
}

// --- QUESTIONS ---
const QUESTIONS = [
  {
    key: 'business_type',
    text: 'İşletmenizi en iyi hangisi tarif ediyor?',
    subtext: 'Sektörünüze göre önerilen paketlerin ağırlığını değiştiriyoruz.',
    options: [
      { value: 'gym', label: 'Spor Salonu / Stüdyo', icon: '💪' },
      { value: 'food', label: 'Sağlıklı Yemek / Kafe', icon: '🥗' },
      { value: 'spa', label: 'Güzellik / Spa / Wellness', icon: '💆‍♀️' },
      { value: 'service', label: 'Hizmet Odaklı KOBİ', icon: '🏢' },
      { value: 'other', label: 'Diğer / Emin Değilim', icon: '✨' },
    ],
  },
  {
    key: 'goal',
    text: 'Öncelikli hedefiniz nedir?',
    subtext: 'Her hedef için creative, medya ve bütçe yaklaşımı farklıdır.',
    options: [
      { value: 'lead', label: 'Daha fazla soru / lead almak', icon: '📩' },
      { value: 'brand', label: 'Marka bilinirliğini artırmak', icon: '📣' },
      { value: 'traffic', label: 'Site / WhatsApp trafiği artırmak', icon: '📲' },
      { value: 'sale', label: 'Doğrudan satış odaklı ilerlemek', icon: '💰' },
    ],
  },
  {
    key: 'content_volume',
    text: 'Aylık içerik temposu beklentiniz ne?',
    subtext: 'Üretim yoğunluğu bütçe ve ekip planlamasını değiştirir.',
    options: [
      { value: 'low', label: 'Düşük: Ayda 8–10 içerik yeterli', icon: '🌙' },
      { value: 'mid', label: 'Orta: 12–18 içerik mantıklı', icon: '⏱️' },
      { value: 'high', label: 'Yüksek: 20+ içerik üretelim', icon: '⚡' },
    ],
  },
  {
    key: 'ads_needs',
    text: 'Reklam (Meta / Google) tarafında ne bekliyorsunuz?',
    subtext: 'Reklam yönetimi için ajans rolümüzü netleştirelim.',
    options: [
      { value: 'basic', label: 'Temel kampanyalar yeterli', icon: '🎯' },
      { value: 'performance', label: 'Performans odaklı sık optimizasyon', icon: '📊' },
      { value: 'aggressive', label: 'Agresif testler, farklı hedeflemeler', icon: '🚀' },
      { value: 'noads', label: 'Şu an reklam düşünmüyorum', icon: '🚫' },
    ],
  },
  {
    key: 'budget_range',
    text: 'Aklınızdaki aylık yatırım aralığı (ajans + içerik + reklam hariç)?',
    subtext: 'Bu bilgi, size hayal kırıklığı yaşatmamak için önemli.',
    options: [
      { value: 'low', label: '25.000₺ altı', icon: '🌱' },
      { value: 'mid', label: '25.000₺ – 50.000₺', icon: '🌿' },
      { value: 'high', label: '50.000₺ – 100.000₺', icon: '🌳' },
      { value: 'ultra', label: '100.000₺ üstü', icon: '🌋' },
    ],
  },
];

// --- DATA ---
const PACKAGES: AgencyPackage[] = [
  // SOSYAL MEDYA
  {
    id: 'sm1',
    name: 'Paket 1 - Başlangıç',
    category: 'social',
    target_audience: ['gym', 'food', 'spa', 'service', 'other'],
    content_level: 'low',
    video_weight: 'low',
    includes_ads: false,
    includes_strategy: true,
    includes_automation: false,
    base_price: 12000,
    description: 'Yeni başlayan veya sosyal medyayı düzenleştirmek isteyen markalar için temel paket.',
    features: ['1 Platform', '6 Post + 2 Reels', 'Temel Tasarım'],
  },
  {
    id: 'sm2',
    name: 'Paket 2 - Büyüme',
    category: 'social',
    target_audience: ['gym', 'food', 'spa', 'service'],
    content_level: 'mid',
    video_weight: 'mid',
    includes_ads: false,
    includes_strategy: true,
    includes_automation: false,
    base_price: 18000,
    description: 'Düzenli içerik ve daha profesyonel görünüm isteyen işletmeler için.',
    features: ['2 Platform', '8 Post + 8 Reels', '3 Çekim Günü', 'Moderasyon'],
  },
  {
    id: 'sm3',
    name: 'Paket 3 - Profesyonel',
    category: 'social',
    target_audience: ['gym', 'food', 'spa', 'service'],
    content_level: 'high',
    video_weight: 'high',
    includes_ads: false,
    includes_strategy: true,
    includes_automation: true,
    base_price: 26000,
    description: 'Markasını dijitalde güçlü göstermek isteyen işletmeler için yoğun üretim planı.',
    features: ['3 Platform', '10 Post + 10 Reels', '4 Çekim Günü', 'Rakip Analizi'],
  },
  // PRODÜKSİYON
  {
    id: 'prodA',
    name: 'Paket A - Mini Çekim',
    category: 'production',
    target_audience: ['gym', 'food', 'spa', 'service'],
    content_level: 'mid',
    video_weight: 'mid',
    includes_ads: false,
    includes_strategy: false,
    includes_automation: false,
    base_price: 14000,
    description: 'Tek kampanya veya dönemsel kampanyalar için hızlı çekim + içerik üretimi.',
    features: ['2-3 Saat Çekim', '10 Foto + 3 Reels'],
  },
  {
    id: 'prodB',
    name: 'Paket B - Gün Boyu',
    category: 'production',
    target_audience: ['gym', 'food', 'spa', 'service'],
    content_level: 'high',
    video_weight: 'high',
    includes_ads: false,
    includes_strategy: false,
    includes_automation: false,
    base_price: 22000,
    description: 'Tüm marka dokunuşlarını aynı gün içerisinde toplayabileceğiniz yoğun çekim planı.',
    features: ['Tam Gün Çekim', 'Drone Çekimi', 'Tanıtım Filmi'],
  },
  // REKLAM
  {
    id: 'ads1',
    name: 'R1 - Temel Reklam',
    category: 'ads',
    target_audience: ['gym', 'food', 'spa', 'service'],
    content_level: 'low',
    video_weight: 'low',
    includes_ads: true,
    includes_strategy: true,
    includes_automation: false,
    base_price: 10000,
    description: 'Dijital reklam tarafında temel görünürlük ve soru akışı için.',
    features: ['Insta & FB Reklam', 'Aylık Rapor'],
  },
  {
    id: 'ads2',
    name: 'R2 - Performans',
    category: 'ads',
    target_audience: ['gym', 'food', 'spa', 'service'],
    content_level: 'mid',
    video_weight: 'mid',
    includes_ads: true,
    includes_strategy: true,
    includes_automation: true,
    base_price: 18000,
    description: 'Lead ve satış hedeflerine yönelik sık optimizasyonlu performans yönetimi.',
    features: ['Gelişmiş Meta', 'A/B Testleri', 'Landing Page'],
  },
  {
    id: 'ads3',
    name: 'R3 - Tam Büyüme',
    category: 'ads',
    target_audience: ['gym', 'food', 'spa', 'service'],
    content_level: 'high',
    video_weight: 'high',
    includes_ads: true,
    includes_strategy: true,
    includes_automation: true,
    base_price: 26000,
    description: 'Büyüme döneminde agresif testler ve çoklu segmentasyon isteyen işletmeler için.',
    features: ['Tam Funnel', 'Retargeting', 'Rapor + Strateji Toplantısı'],
  },
  // OTOMASYON
  {
    id: 'auto1',
    name: 'O1 - Basit Otomasyon',
    category: 'automation',
    target_audience: ['gym', 'food', 'spa', 'service'],
    content_level: 'low',
    video_weight: 'low',
    includes_ads: false,
    includes_strategy: true,
    includes_automation: true,
    base_price: 8000,
    description: 'Form → WhatsApp → Google Sheets gibi basit otomasyon kurguları.',
    features: ['Lead Toplama', 'Sheets Entegrasyonu'],
  },
  {
    id: 'auto2',
    name: 'O2 - CRM Entegrasyonu',
    category: 'automation',
    target_audience: ['gym', 'food', 'spa', 'service'],
    content_level: 'mid',
    video_weight: 'low',
    includes_ads: false,
    includes_strategy: true,
    includes_automation: true,
    base_price: 16000,
    description: 'GymPro gibi sistemlerle entegre otomasyon altyapıları.',
    features: ['CRM Entegrasyonu', 'Otomatik Hatırlatma'],
  },
  // 360
  {
    id: 'full1',
    name: '360 - Dolu Paket',
    category: '360',
    target_audience: ['gym', 'food', 'spa'],
    content_level: 'high',
    video_weight: 'high',
    includes_ads: true,
    includes_strategy: true,
    includes_automation: true,
    base_price: 55000,
    description: 'Sosyal medya + reklam + çekim + otomasyonun birlikte kurgulandığı paket.',
    features: ['Sosyal Medya', 'Reklam Yönetimi', 'Prodüksiyon', 'Otomasyon'],
  },
];

// --- HELPERS ---
function calculateLeadScore(answers: WizardAnswers): LeadScore {
  let score = 50;

  if (answers.goal === 'sale' || answers.goal === 'lead') score += 10;
  if (answers.content_volume === 'high') score += 10;
  if (answers.ads_needs === 'performance' || answers.ads_needs === 'aggressive') score += 10;
  if (answers.budget_range === 'high' || answers.budget_range === 'ultra') score += 10;

  let label: LeadScore['label'] = 'Normal';
  let color: LeadScore['color'] = 'yellow';

  if (score >= 80) {
    label = 'Hot Lead';
    color = 'green';
  } else if (score <= 60) {
    label = 'Soğuk / Erken Aşama';
    color = 'red';
  }

  return { score, label, color };
}

function buildScenarios(answers: WizardAnswers): ScenarioResult[] {
  const selectedPackages: AgencyPackage[] = [];

  const filtered = PACKAGES.filter((pkg) => {
    if (!pkg.target_audience.includes(answers.business_type as any) && !pkg.target_audience.includes('other')) {
      return false;
    }
    return true;
  });

  const social = filtered.filter((p) => p.category === 'social');
  const production = filtered.filter((p) => p.category === 'production');
  const ads = filtered.filter((p) => p.category === 'ads');
  const auto = filtered.filter((p) => p.category === 'automation');
  const full = filtered.filter((p) => p.category === '360');

  const pickByLevel = (list: AgencyPackage[], level: Level): AgencyPackage | null => {
    const candidates = list.filter((p) => p.content_level === level);
    if (candidates.length === 0) return null;
    return candidates[0];
  };

  const scenarios: ScenarioResult[] = [];

  // Economy
  {
    const items: AgencyPackage[] = [];
    const sm = pickByLevel(social, 'low');
    if (sm) items.push(sm);

    if (answers.ads_needs !== 'noads') {
      const a = pickByLevel(ads, 'low');
      if (a) items.push(a);
    }

    const total = items.reduce((sum, item) => sum + item.base_price, 0);

    scenarios.push({
      type: 'economy',
      label: 'Ekonomik Başlangıç Planı',
      description:
        'Daha kontrollü, test ederek ilerleyen ve bütçeyi parça parça büyüten işletmeler için.',
      items: items.map((item) => ({
        id: item.id,
        name: item.name,
        category: item.category,
        price: item.base_price,
        features: item.features,
      })),
      total,
    });
  }

  // Growth
  {
    const items: AgencyPackage[] = [];
    const sm = pickByLevel(social, 'mid') || pickByLevel(social, 'high') || pickByLevel(social, 'low');
    if (sm) items.push(sm);

    if (answers.ads_needs === 'basic' || answers.ads_needs === 'performance' || answers.ads_needs === 'aggressive') {
      const a = pickByLevel(ads, 'mid') || pickByLevel(ads, 'high') || pickByLevel(ads, 'low');
      if (a) items.push(a);
    }

    if (answers.content_volume === 'high') {
      const prod = pickByLevel(production, 'mid') || pickByLevel(production, 'high');
      if (prod) items.push(prod);
    }

    const autoPkg = pickByLevel(auto, 'mid') || pickByLevel(auto, 'low');
    if (autoPkg && (answers.goal === 'lead' || answers.goal === 'sale')) {
      items.push(autoPkg);
    }

    const total = items.reduce((sum, item) => sum + item.base_price, 0);

    scenarios.push({
      type: 'growth',
      label: 'Büyüme Odaklı Plan',
      description:
        'Lead ve marka bilinirliğini birlikte büyütmek isteyen işletmeler için dengeli plan.',
      items: items.map((item) => ({
        id: item.id,
        name: item.name,
        category: item.category,
        price: item.base_price,
        features: item.features,
      })),
      total,
    });
  }

  // Aggressive
  {
    const items: AgencyPackage[] = [];

    if (full.length > 0 && (answers.budget_range === 'high' || answers.budget_range === 'ultra')) {
      const f = full[0];
      items.push(f);
    } else {
      const sm = pickByLevel(social, 'high') || pickByLevel(social, 'mid');
      if (sm) items.push(sm);

      const prod = pickByLevel(production, 'high') || pickByLevel(production, 'mid');
      if (prod) items.push(prod);

      if (answers.ads_needs !== 'noads') {
        const a = pickByLevel(ads, 'high') || pickByLevel(ads, 'mid');
        if (a) items.push(a);
      }

      const autoPkg = pickByLevel(auto, 'mid') || pickByLevel(auto, 'high');
      if (autoPkg) items.push(autoPkg);
    }

    const total = items.reduce((sum, item) => sum + item.base_price, 0);

    scenarios.push({
      type: 'aggressive',
      label: 'Agresif Büyüme Planı',
      description:
        'Pazarda hızlı yer kaplamak isteyen, test etmekten korkmayan işletmeler için.',
      items: items.map((item) => ({
        id: item.id,
        name: item.name,
        category: item.category,
        price: item.base_price,
        features: item.features,
      })),
      total,
    });
  }

  return scenarios;
}

// --- MAIN COMPONENT ---
const Wizard: React.FC = () => {
  const [step, setStep] = useState<number>(0);
  const [answers, setAnswers] = useState<WizardAnswers>({
    business_type: '',
    goal: '',
    content_volume: '',
    ads_needs: '',
    budget_range: '',
  });
  const [leadInfo, setLeadInfo] = useState<LeadInfo>({
    fullName: '',
    companyName: '',
    phone: '',
    email: '',
  });
  const [leadScore, setLeadScore] = useState<LeadScore>({ score: 50, label: 'Normal', color: 'yellow' });
  const [scenarios, setScenarios] = useState<ScenarioResult[] | null>(null);
  const [strategyNote, setStrategyNote] = useState<string>('');
  const [brandIdentity, setBrandIdentity] = useState<BrandIdentity | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingIdentity, setIsLoadingIdentity] = useState(false);
  const [activeTab, setActiveTab] = useState<ScenarioType>('growth');

  const handleAnswer = (key: keyof WizardAnswers, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleLeadInfoChange = (field: keyof LeadInfo, value: string) => {
    setLeadInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNext = async () => {
    if (step < QUESTIONS.length) {
      setStep(step + 1);
    } else if (step === QUESTIONS.length) {
      if (!leadInfo.fullName || !leadInfo.phone || !leadInfo.email) {
        alert('Lütfen ad, telefon ve e-posta bilgilerinizi doldurun.');
        return;
      }

      const loadingTimeout = setTimeout(() => {
        setIsLoading(true);
      }, 300);

      try {
        const score = calculateLeadScore(answers);
        setLeadScore(score);

        const sc = buildScenarios(answers);
        setScenarios(sc);

        const prompt = `
Sen Dou Social adlı kreatif performans ajansının strateji direktörüsün.
Sana verilen bilgiler:

İşletme tipi: ${answers.business_type}
Hedef: ${answers.goal}
İçerik beklentisi: ${answers.content_volume}
Reklam ihtiyacı: ${answers.ads_needs}
Bütçe aralığı: ${answers.budget_range}

Bu bilgilere göre, lead'e aktarılmak üzere maksimum 5-6 cümlede kısa bir strateji özeti yaz.
Metinde kesin fiyat veya paket adı verme; sadece yaklaşımı anlat.
Türkçe, sıcak ama profesyonel bir ajans dili kullan.
`;
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              contents: [
                {
                  parts: [{ text: prompt }],
                },
              ],
            }),
          }
        );

        const data = await response.json();

        if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
          setStrategyNote(data.candidates[0].content.parts[0].text);
        } else {
          setStrategyNote(
            'Verdiğiniz bilgiler ışığında, markanız için önce temel yapıyı güçlendirip ardından performans odaklı kampanyaları kademeli olarak açmak mantıklı görünüyor. Detayları birlikte netleştirebiliriz.'
          );
        }

        await saveLeadToSheet({
          fullName: leadInfo.fullName,
          companyName: leadInfo.companyName,
          phone: leadInfo.phone,
          email: leadInfo.email,
          businessType: answers.business_type,
          goal: answers.goal,
          contentVolume: answers.content_volume,
          adsNeeds: answers.ads_needs,
          budgetRange: answers.budget_range,
          leadScore: score.score,
        });

        setStep(step + 1);
      } catch (error) {
        console.error('AI veya Google Sheets hatası:', error);
        alert('Bir hata oluştu, lütfen daha sonra tekrar deneyin.');
      } finally {
        clearTimeout(loadingTimeout);
        setIsLoading(false);
      }
    }
  };

  const handleWhatsAppClick = () => {
    if (!scenarios) return;

    const current = scenarios[activeTab];
    const messageLines = [
      `Merhaba Dou Social 👋`,
      ``,
      `Wizard üzerinden bir plan oluşturdum ve sizinle paylaşmak istiyorum:`,
      ``,
      `İşletme: ${leadInfo.companyName || 'Belirtilmedi'}`,
      `Ad Soyad: ${leadInfo.fullName}`,
      `Telefon: ${leadInfo.phone}`,
      `E-posta: ${leadInfo.email}`,
      ``,
      `Seçili Senaryo: ${current.label} (${activeTab})`,
      `Toplam Önerilen Yatırım: ${current.total.toLocaleString('tr-TR')}₺`,
      ``,
      `Önerilen paketler:`,
      ...current.items.map((item) => `- ${item.name} (${item.category}) ~ ${item.price.toLocaleString('tr-TR')}₺`),
      ``,
      `Bu planı birlikte gözden geçirip, gerekirse bütçeyi veya içeriği revize etmek istiyorum.`,
    ];

    const text = messageLines.join('\n');
    const url = `https://wa.me/${AGENCY_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const generateBrandIdentity = async () => {
    setIsLoadingIdentity(true);
    try {
      const prompt = `
Aşağıdaki işletme bilgilerine göre marka kimliği analizi yap:

İşletme tipi: ${answers.business_type}
Hedef: ${answers.goal}
İçerik temposu: ${answers.content_volume}
Reklam beklentisi: ${answers.ads_needs}
Bütçe aralığı: ${answers.budget_range}

ÇIKTIYI AŞAĞIDAKİ GİBİ JSON FORMATINDA DÖN:

{
  "archetype": "kısa arketip adı",
  "archetype_description": "2-3 cümlelik açıklama",
  "tones": ["maksimum 4 adet ton", "..."],
  "slogans": ["3-5 tane kısa slogan önerisi"],
  "visual_style": {
    "colors": ["renk paleti örnekleri"],
    "imagery": "görsellerde kullanılabilecek tarz açıklaması",
    "typography": "yazı karakteri tipi / hissi"
  }
}

Sadece geçerli JSON döndür, açıklama ekleme. Türkçe yaz.
`;
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: prompt }],
              },
            ],
          }),
        }
      );

      const data = await response.json();
      let rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

      rawText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();

      try {
        const parsed: BrandIdentity = JSON.parse(rawText);
        setBrandIdentity(parsed);
      } catch (parseError) {
        console.error('JSON parse hatası:', parseError);
        alert('Marka kimliği analizi yapılırken bir hata oluştu. Daha sonra tekrar deneyin.');
      }
    } catch (error) {
      console.error('Brand identity AI hatası:', error);
      alert('Marka kimliği analizi sırasında bir hata oluştu.');
    } finally {
      setIsLoadingIdentity(false);
    }
  };

  const restart = () => {
    setStep(0);
    setAnswers({
      business_type: '',
      goal: '',
      content_volume: '',
      ads_needs: '',
      budget_range: '',
    });
    setLeadInfo({
      fullName: '',
      companyName: '',
      phone: '',
      email: '',
    });
    setLeadScore({ score: 50, label: 'Normal', color: 'yellow' });
    setScenarios(null);
    setStrategyNote('');
    setBrandIdentity(null);
    setActiveTab('growth');
  };

  if (scenarios && scenarios.length > 0) {
    const currentData =
      scenarios.find((s) => s.type === activeTab) ?? scenarios[0];

    if (!currentData) {
      return null;
    }

    const scenarioBadge: Record<ScenarioType, string> = {
      economy: "Minimum Risk Planı",
      growth: "Önerilen Büyüme Planı",
      aggressive: "Agresif Büyüme Planı",
    };

    const scenarioTone: Record<ScenarioType, string> = {
      economy: "Daha kontrollü, minimum riskli ilerleyiş.",
      growth: "Büyüme ve geri dönüş dengesini koruyan plan.",
      aggressive: "Hızlı büyüme ve pazar payı kazanma odaklı.",
    };

    const avgDailyBudget = Math.round(currentData.total / 30);

    return (
      <div className="max-w-6xl mx-auto animate-fade-in duration-500 space-y-8">
        {/* Üst Başlık Alanı */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-white/10">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-2">
              Sonuç Raporu <Sparkles className="text-brand" />
            </h1>
            <div className="flex flex-wrap items-center gap-2 text-sm text-neutral-400 mt-1">
              <span className="font-medium text-white/90">{leadInfo.companyName || "İşletmeniz"}</span>
              <span>•</span>
              <span className={`${leadScore.label.includes("Hot") ? "text-green-400" : "text-yellow-400"}`}>
                Potansiyel Skor: {leadScore.label} ({leadScore.score}/100)
              </span>
            </div>
            <p className="text-xs text-neutral-500 mt-1">
              Bu rapor yanıtlarınıza göre otomatik oluşturulmuştur ve size özel bir çıkarım sunar.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={restart}
              className="flex items-center gap-2 text-xs md:text-sm px-3 py-2 rounded-full border border-white/10 text-neutral-200 hover:bg-white/5 transition-colors"
            >
              <RefreshCcw size={16} /> Yeni Test
            </button>
          </div>
        </div>

        {/* Ana İki Sütun: Sol (Plan Detay) – Sağ (Satış / CTA Kolonu) */}
        <div className="grid gap-6 md:grid-cols-[minmax(0,2.1fr)_minmax(0,1fr)]">
          {/* SOL SÜTUN */}
          <div className="space-y-6">
            {/* Strateji Özeti Kartı */}
            <div className="bg-linear-to-br from-neutral-900 to-brand-900/30 p-5 md:p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <Bot className="text-brand shrink-0 mt-1" size={32} />
                <div>
                  <h3 className="font-bold text-lg text-white mb-1">Strateji Özeti</h3>
                  <p className="text-xs text-brand-100 mb-2">
                    Bu öneri, verdiğiniz cevaplara göre ajans bakış açısıyla hazırlanmıştır.
                  </p>
                  <p className="text-neutral-300 leading-relaxed text-sm md:text-base">
                    {strategyNote}
                  </p>
                </div>
              </div>
            </div>

            {/* Senaryo Seçimi + Kısa Finans Özet */}
            <div className="space-y-4">
              {/* Senaryo Butonları */}
              <div className="grid grid-cols-3 gap-2 p-1 bg-neutral-900/80 rounded-xl border border-white/10 backdrop-blur-sm">
                {(["economy", "growth", "aggressive"] as ScenarioType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => setActiveTab(type)}
                    className={`py-3 px-3 rounded-lg text-xs md:text-sm font-semibold transition-all duration-300 ${
                      activeTab === type
                        ? "bg-white text-black shadow-lg shadow-brand/40"
                        : "text-neutral-300 hover:bg-white/5"
                    }`}
                  >
                    <div className="flex flex-col items-start gap-1">
                      <span>
                        {type === "economy" && "Ekonomik"}
                        {type === "growth" && "Büyüme"}
                        {type === "aggressive" && "Agresif"}
                      </span>
                      <span className="text-[10px] text-neutral-400">
                        {scenarioBadge[type]}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Finans Özeti / Rakamlar */}
              <div className="grid gap-3 md:grid-cols-3">
                <div className="bg-neutral-900/70 border border-white/10 rounded-xl p-3">
                  <div className="text-[11px] text-neutral-400 mb-1">Seçili Senaryo</div>
                  <div className="text-sm font-semibold text-white">{currentData.label}</div>
                  <p className="text-[11px] text-neutral-500 mt-1">
                    {scenarioTone[activeTab]}
                  </p>
                </div>
                <div className="bg-neutral-900/70 border border-white/10 rounded-xl p-3">
                  <div className="text-[11px] text-neutral-400 mb-1">Tahmini Aylık Ajans + Üretim</div>
                  <div className="text-lg font-bold text-brand-100">
                    {currentData.total.toLocaleString("tr-TR")}₺
                  </div>
                  <p className="text-[11px] text-neutral-500 mt-1">
                    Fiyatlar, detaylı görüşmede birlikte netleştirilir.
                  </p>
                </div>
                <div className="bg-neutral-900/70 border border-white/10 rounded-xl p-3">
                  <div className="text-[11px] text-neutral-400 mb-1">Günlük Ortalama Yatırım</div>
                  <div className="text-lg font-bold text-white">
                    ~{avgDailyBudget.toLocaleString("tr-TR")}₺
                  </div>
                  <p className="text-[11px] text-neutral-500 mt-1">
                    Günlük seviyeye böldüğümüzde yatırım psikolojik olarak daha kabul edilebilir görünür.
                  </p>
                </div>
              </div>
            </div>

            {/* Paket Kartları */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-neutral-200 flex items-center gap-2">
                Önerilen Hizmet Paketleri
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-neutral-400">
                  {currentData.items.length} ana başlık
                </span>
              </h3>

              <div className="grid gap-4 md:grid-cols-2">
             {currentData.items.map((pkg, idx) => (
  <div
    key={pkg.id}
    className={`
      bg-neutral-900/60 border border-white/10 p-5 rounded-xl 
      transition-all duration-200 ease-out
      hover:-translate-y-2 hover:scale-[1.02]
      hover:border-[#800000] hover:shadow-[0_0_35px_rgba(128,0,0,0.55)]
      flex flex-col h-full
      ${(currentData.items.length % 2 !== 0 && idx === currentData.items.length - 1) ? "md:col-span-2" : ""}
    `}
    style={{ animationDelay: `${idx * 120}ms` }}
  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-bold px-2 py-1 rounded bg-white/5 text-neutral-300 uppercase tracking-wide">
                        {pkg.category}
                      </span>
                      <span className="text-brand-100 font-bold text-base">
                        {pkg.price.toLocaleString("tr-TR")}₺
                      </span>
                    </div>
                    <h4 className="font-bold text-white mb-1 text-sm md:text-base">{pkg.name}</h4>
                    <ul className="space-y-2 mt-3 flex-grow">
                      {pkg.features.map((f, i) => (
                        <li key={i} className="text-xs text-neutral-400 flex items-start gap-2">
                          <Check size={12} className="text-brand mt-0.5" /> {f}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 text-[11px] text-neutral-500">
                      Bu paket, seçtiğiniz hedef ve bütçeye göre bu senaryoda yer alıyor.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SAĞ SÜTUN – SATIŞ / CTA */}
          <aside className="space-y-4">
            {/* Ana CTA Kartı */}
            <div className="relative overflow-hidden bg-neutral-950/80 border border-brand/60 rounded-2xl p-5 md:p-6 shadow-[0_0_40px_rgba(128,0,0,0.4)]">
              <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_60%)]" />
              <div className="relative space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-neutral-200">
                  <Sparkles size={14} className="text-brand-100" />
                  <span>Son adım: Planı birlikte netleştirelim</span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white">WhatsApp’ta 5 dakikalık mini görüşme</h3>
                  <p className="text-sm text-neutral-300 mt-1">
                    Bu raporu, işletmeniz için uygulanabilir bir aksiyon planına dönüştürelim. İster bütçeyi düşürelim,
                    ister kapsamı büyütelim; tamamen size göre şekillireceğiz.
                  </p>
                </div>

                <button
                  onClick={handleWhatsAppClick}
                  className="w-full bg-[#25D366] text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2 text-sm shadow-lg shadow-[#25D366]/40 hover:scale-[1.02] active:scale-100 transition-transform"
                >
                  <MessageCircle size={18} /> WhatsApp’tan Devam Et
                </button>

                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  Mesajda; işletme adınız, seçtiğiniz plan tipi ve paketler otomatik olarak iletilecek. Siz sadece gönderip
                  danışmanımızla konuşmaya başlayacaksınız.
                </p>

                <div className="grid gap-2 text-[11px] text-neutral-400">
                  <div className="flex items-center gap-2">
                    <Fingerprint size={14} className="text-brand" />
                    <span>Bu rapor sadece {leadInfo.companyName || "işletmeniz"} için oluşturuldu.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star size={14} className="text-yellow-400" />
                    <span>Fiyatlar ilk toplantıda netleşir; bu ekran, karar vermenize yardımcı olmak içindir.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Müşteri Yanıt Özeti (Mikro Güven Alanı) */}
            <div className="bg-neutral-900/70 border border-white/10 rounded-2xl p-4 space-y-3">
              <div className="flex items-center gap-2">
                <User size={16} className="text-neutral-400" />
                <span className="text-xs font-semibold text-neutral-200">Yanıtlarınızın Özeti</span>
              </div>
              <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                {Object.entries(answers).map(([key, value]) => {
                  const q = QUESTIONS.find((q) => q.key === key);
                  const opt = q?.options?.find((o) => o.value === value);
                  if (!q) return null;
                  return (
                    <div key={key} className="flex justify-between gap-3 text-[11px]">
                      <span className="text-neutral-500 line-clamp-1">{q.text}</span>
                      <span className="text-neutral-100 font-medium line-clamp-1 text-right">
                        {opt?.label || String(value)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>

        {/* MARKA KİMLİĞİ ANALİZİ */}
        <div className="border-t border-white/10 pt-8 mt-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 mb-4">
            <h3 className="text-lg font-bold flex items-center gap-2 text-white">
              <Fingerprint className="text-brand" /> Marka Kimliği Analizi
            </h3>
            {!brandIdentity && (
              <button
                onClick={generateBrandIdentity}
                disabled={isLoadingIdentity}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/15 text-xs md:text-sm text-neutral-100 hover:bg-white/10 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              >
                {isLoadingIdentity ? (
                  <>
                    <Loader2 className="animate-spin" size={14} /> Analiz ediliyor...
                  </>
                ) : (
                  <>
                    <Sparkles size={14} /> Marka kimliği raporu oluştur
                  </>
                )}
              </button>
            )}
          </div>

          {brandIdentity && (
            <div className="grid md:grid-cols-3 gap-6 bg-neutral-900/50 p-6 rounded-2xl border border-white/10">
              <div className="space-y-3">
                <div className="text-[11px] text-brand-100 font-semibold uppercase tracking-wide">
                  Arketip
                </div>
                <div className="text-2xl font-bold text-white">
                  {brandIdentity.archetype}
                </div>
                <p className="text-sm text-neutral-400">
                  {brandIdentity.archetype_description}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {brandIdentity.tones?.map((t: string, i: number) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-white/5 rounded-full text-[11px] text-neutral-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-3 md:col-span-1">
                <div className="text-[11px] text-brand-100 font-semibold uppercase tracking-wide">
                  Slogan Önerileri
                </div>
                <ul className="space-y-2">
                  {brandIdentity.slogans?.map((s: string, i: number) => (
                    <li
                      key={i}
                      className="text-sm text-neutral-200 border-b border-white/5 pb-1 italic"
                    >
                      “{s}”
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <div className="text-[11px] text-brand-100 font-semibold uppercase tracking-wide">
                  Görsel Stil Notları
                </div>
                <p className="text-xs text-neutral-400">
                  Bu kısım, tasarım ekibiniz için hızlı bir “creative brief” gibi düşünülebilir.
                </p>
                <div className="space-y-2 text-[12px] text-neutral-300">
                  <p>
                    <span className="font-semibold text-neutral-100">Renk Paleti: </span>
                    {brandIdentity.visual_style?.colors?.join(", ")}
                  </p>
                  <p>
                    <span className="font-semibold text-neutral-100">Görsel Dil: </span>
                    {brandIdentity.visual_style?.imagery}
                  </p>
                  <p>
                    <span className="font-semibold text-neutral-100">Tipografi: </span>
                    {brandIdentity.visual_style?.typography}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  const currentQuestion = QUESTIONS[step] || null;
  const progress = Math.min(((step) / (QUESTIONS.length + 1)) * 100, 100);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center text-xs text-neutral-400 mb-2">
          <span>Adım {Math.min(step + 1, QUESTIONS.length + 1)} / {QUESTIONS.length + 1}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-neutral-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-brand to-brand-100 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* CONTENT */}
      {step < QUESTIONS.length && currentQuestion && (
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] text-neutral-200 backdrop-blur">
              <Sparkles className="h-3 w-3 text-brand-100" />
              <span>Dou Social • Creative Performance Wizard</span>
            </div>

            <h2 className="text-xl md:text-2xl font-bold text-white">
              {currentQuestion.text}
            </h2>
            <p className="text-xs md:text-sm text-neutral-400">
              {currentQuestion.subtext}
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {currentQuestion.options?.map((option) => {
              const isSelected = (answers as any)[currentQuestion.key] === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(currentQuestion.key as keyof WizardAnswers, option.value)}
                  className={`flex items-center justify-between gap-3 rounded-2xl border p-4 text-left transition-all duration-200 ${
                    isSelected
                      ? 'border-brand bg-brand/10 shadow-[0_0_30px_rgba(128,0,0,0.5)]'
                      : 'border-white/10 bg-neutral-900/60 hover:border-brand/60 hover:bg-neutral-900/90'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-800 text-lg">
                      {option.icon}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">
                        {option.label}
                      </div>
                    </div>
                  </div>
                  {isSelected && (
                    <Check className="h-4 w-4 text-brand-100" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleNext}
              disabled={!(answers as any)[currentQuestion.key]}
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs md:text-sm font-semibold text-black shadow-lg shadow-black/40 transition-all disabled:pointer-events-none disabled:opacity-40 hover:translate-y-[1px]"
            >
              <span>Devam Et</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* LEAD FORM STEP */}
      {step === QUESTIONS.length && (
        <div className="space-y-6 animate-fade-in">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] text-neutral-200 backdrop-blur">
              <Briefcase className="h-3 w-3 text-brand-100" />
              <span>Adım 2/2 • İletişim Bilgileriniz</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white">
              Sizi nasıl arayalım?
            </h2>
            <p className="text-xs md:text-sm text-neutral-400">
              Planı netleştirmek ve size özel teklif hazırlamak için iletişim bilgilerinize ihtiyacımız var.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <label className="text-xs text-neutral-300 flex items-center gap-1">
                <User className="h-3 w-3" /> Ad Soyad
              </label>
              <input
                type="text"
                value={leadInfo.fullName}
                onChange={(e) => handleLeadInfoChange('fullName', e.target.value)}
                className="w-full rounded-lg bg-neutral-900/70 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:border-brand/60"
                placeholder="Örn. Deniz Kılıç"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-neutral-300 flex items-center gap-1">
                <Briefcase className="h-3 w-3" /> İşletme / Marka Adı
              </label>
              <input
                type="text"
                value={leadInfo.companyName}
                onChange={(e) => handleLeadInfoChange('companyName', e.target.value)}
                className="w-full rounded-lg bg-neutral-900/70 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:border-brand/60"
                placeholder="Örn. İstanbul Fitness A"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-neutral-300 flex items-center gap-1">
                <Phone className="h-3 w-3" /> Telefon
              </label>
              <input
                type="tel"
                value={leadInfo.phone}
                onChange={(e) => handleLeadInfoChange('phone', e.target.value)}
                className="w-full rounded-lg bg-neutral-900/70 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:border-brand/60"
                placeholder="5xx xxx xx xx"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-neutral-300 flex items-center gap-1">
                <Mail className="h-3 w-3" /> E-posta
              </label>
              <input
                type="email"
                value={leadInfo.email}
                onChange={(e) => handleLeadInfoChange('email', e.target.value)}
                className="w-full rounded-lg bg-neutral-900/70 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:border-brand/60"
                placeholder="ornek@firma.com"
              />
            </div>
          </div>

          <div className="flex justify-between items-center text-xs text-neutral-500">
            <span>
              Bilgileriniz sadece Dou Social ekibi tarafından teklif & bilgi paylaşımı için kullanılacaktır.
            </span>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleNext}
              disabled={isLoading}
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs md:text-sm font-semibold text-black shadow-lg shadow-black/40 transition-all disabled:pointer-events-none disabled:opacity-40 hover:translate-y-[1px]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Analiz ediliyor...</span>
                </>
              ) : (
                <>
                  <span>Planı Oluştur</span>
                  <ChevronRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wizard;