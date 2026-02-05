"use client";

import React, { useState } from 'react';
import { saveLeadToSheet } from '../actions'; // actions.ts'in app klasöründe olduğunu varsayıyoruz
import {
  Bot,
  Briefcase,
  Building2,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleOff,
  Compass,
  Cpu,
  Crown,
  Eye,
  Factory,
  Fingerprint,
  HeartPulse,
  Instagram,
  Linkedin,
  Loader2,
  Mail,
  MessageCircle,
  Monitor,
  Music2,
  Package,
  Palette,
  Phone,
  RefreshCcw,
  Search,
  ShoppingCart,
  Sparkles,
  Star,
  TrendingUp,
  User,
  Utensils,
} from 'lucide-react';

// --- CONFIG ---
const apiKey = "AIzaSyBBikXR8UdBhpsA0mS_84ml3TcQH__xdi4"; 
const AGENCY_WHATSAPP_NUMBER = "905300845468"; 

// --- TYPES ---
type Category = 'social' | 'ads' | 'setup';
type Billing = 'monthly' | 'one_time';
type Currency = 'TRY' | 'USD';
type SocialLevel = 'level1' | 'level2' | 'level3';
type SectorGroup = 'b2b' | 'b2c' | 'other';
type AdPlatform = 'meta' | 'google' | 'tiktok' | 'linkedin' | 'none';
type ExtraNeed = 'brand' | 'web' | 'ai_automation' | 'none';
type SetupType = 'brand' | 'web' | 'ai_automation' | 'ai_chatbot';

interface Price {
  amount: number;
  currency: Currency;
  display?: string;
  isMinimum?: boolean;
}

interface AgencyPackage {
  id: string;
  name: string;
  category: Category;
  billing: Billing;
  level?: SocialLevel;
  ad_platform?: Exclude<AdPlatform, 'none'>;
  extra_type?: SetupType;
  includes_meta_ads?: boolean;
  price: Price;
  description: string;
  features: string[];
}

type ScenarioType = 'economy' | 'growth' | 'aggressive';

interface ScenarioTotals {
  TRY: { amount: number; hasMinimum: boolean };
  USD: { amount: number; hasMinimum: boolean };
}

interface ScenarioResult {
  type: ScenarioType;
  label: string;
  description: string;
  items: {
    id: string;
    name: string;
    category: Category;
    billing: Billing;
    price: Price;
    features: string[];
  }[];
  totals: {
    monthly: ScenarioTotals;
    one_time: ScenarioTotals;
  };
}

interface LeadScore {
  score: number;
  label: string;
  color: 'green' | 'yellow' | 'red';
}

interface WizardAnswers {
  sector: string;
  social_scope: string;
  ad_platforms: AdPlatform[];
  extras: ExtraNeed[];
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

type OptionIconProps = {
  className?: string;
  size?: number;
  strokeWidth?: number;
};

interface QuestionOption {
  value: string;
  label: string;
  icon?: React.ReactElement<OptionIconProps>;
  group?: SectorGroup;
}

interface QuestionConfig {
  key: keyof WizardAnswers;
  text: string;
  subtext?: string;
  options: QuestionOption[];
  multi?: boolean;
  exclusiveValue?: string;
  layout?: 'sector';
}

const ICON_CLASS = 'text-[#800000]';
const OPTION_ICON_PROPS: OptionIconProps = { size: 18, className: ICON_CLASS, strokeWidth: 1.8 };

// --- QUESTIONS ---
const QUESTIONS: QuestionConfig[] = [
  {
    key: 'sector',
    text: 'Sektörünüzü seçin',
    subtext: 'Sektörünüze göre önerilen paketlerin ağırlığını değiştiriyoruz.',
    layout: 'sector',
    options: [
      {
        value: 'consulting_agency',
        label: 'Danışmanlık & Ajans Hizmetleri',
        icon: <Compass {...OPTION_ICON_PROPS} />,
        group: 'b2b',
      },
      {
        value: 'manufacturing',
        label: 'Üretim, Sanayi & İmalat',
        icon: <Factory {...OPTION_ICON_PROPS} />,
        group: 'b2b',
      },
      {
        value: 'saas',
        label: 'Yazılım, Teknoloji & SaaS',
        icon: <Cpu {...OPTION_ICON_PROPS} />,
        group: 'b2b',
      },
      {
        value: 'wholesale_export',
        label: 'Toptan Ticaret & İhracat',
        icon: <Package {...OPTION_ICON_PROPS} />,
        group: 'b2b',
      },
      {
        value: 'health_beauty',
        label: 'Sağlık, Güzellik & Klinik',
        icon: <HeartPulse {...OPTION_ICON_PROPS} />,
        group: 'b2c',
      },
      {
        value: 'ecommerce_retail',
        label: 'E-Ticaret & Perakende',
        icon: <ShoppingCart {...OPTION_ICON_PROPS} />,
        group: 'b2c',
      },
      {
        value: 'real_estate_hospitality',
        label: 'Gayrimenkul, Mimarlık & Otel',
        icon: <Building2 {...OPTION_ICON_PROPS} />,
        group: 'b2c',
      },
      {
        value: 'food_local',
        label: 'Yeme-İçme & Yerel Hizmet',
        icon: <Utensils {...OPTION_ICON_PROPS} />,
        group: 'b2c',
      },
      {
        value: 'other',
        label: 'Diğer / Henüz Faaliyette Değil',
        icon: <Sparkles {...OPTION_ICON_PROPS} />,
        group: 'other',
      },
    ],
  },
  {
    key: 'social_scope',
    text: 'Sosyal medya yönetiminde beklentiniz nedir?',
    subtext: 'Seçtiğiniz seviye içerik yoğunluğunu ve ekip planlamasını belirler.',
    options: [
      { value: 'level1', label: 'Temel görünürlük yeterli.', icon: <Eye {...OPTION_ICON_PROPS} /> },
      { value: 'level2', label: 'Büyüme ve viral etki istiyorum.', icon: <TrendingUp {...OPTION_ICON_PROPS} /> },
      { value: 'level3', label: 'Tam otorite ve liderlik.', icon: <Crown {...OPTION_ICON_PROPS} /> },
    ],
  },
  {
    key: 'ad_platforms',
    text: 'Hangi platformlarda reklam çıkmayı hedefliyorsunuz?',
    subtext: 'Birden fazla seçim yapabilirsiniz.',
    multi: true,
    exclusiveValue: 'none',
    options: [
      { value: 'meta', label: 'Meta (Instagram & Facebook)', icon: <Instagram {...OPTION_ICON_PROPS} /> },
      { value: 'google', label: 'Google Ads (Arama Ağı)', icon: <Search {...OPTION_ICON_PROPS} /> },
      { value: 'tiktok', label: 'TikTok (Genç Kitle / Viral)', icon: <Music2 {...OPTION_ICON_PROPS} /> },
      { value: 'linkedin', label: 'LinkedIn (Kurumsal / B2B)', icon: <Linkedin {...OPTION_ICON_PROPS} /> },
      { value: 'none', label: 'Reklam düşünmüyorum.', icon: <CircleOff {...OPTION_ICON_PROPS} /> },
    ],
  },
  {
    key: 'extras',
    text: 'Dijital varlıklarınızda yenileme veya kurulum ihtiyacı var mı?',
    subtext: 'Tek seferlik ihtiyaçları seçebilirsiniz.',
    multi: true,
    exclusiveValue: 'none',
    options: [
      { value: 'brand', label: 'Marka Kimliği / Logo Tasarımı', icon: <Palette {...OPTION_ICON_PROPS} /> },
      { value: 'web', label: 'Web Sitesi / UI-UX Tasarım', icon: <Monitor {...OPTION_ICON_PROPS} /> },
      { value: 'ai_automation', label: 'Yapay Zeka (AI) Otomasyonu', icon: <Bot {...OPTION_ICON_PROPS} /> },
      { value: 'none', label: 'Hayır, sadece yönetim istiyorum.', icon: <CheckCircle2 {...OPTION_ICON_PROPS} /> },
    ],
  },
];

// --- DATA ---
const formatTRY = (amount: number) => amount.toLocaleString('tr-TR');

const priceTRY = (
  amount: number,
  options?: { display?: string; isMinimum?: boolean; includeKDV?: boolean }
): Price => {
  const display =
    options?.display ??
    (options?.includeKDV ? `${formatTRY(amount)}₺ + KDV` : undefined);
  return {
    amount,
    currency: 'TRY',
    display,
    isMinimum: options?.isMinimum ?? false,
  };
};

const priceUSD = (amount: number): Price => ({
  amount,
  currency: 'USD',
  display: `$${amount.toLocaleString('en-US')}`,
});

const CATEGORY_LABELS: Record<Category, string> = {
  social: 'Sosyal Medya',
  ads: 'Reklam',
  setup: 'Tek Seferlik',
};

const PACKAGES: AgencyPackage[] = [
  // SOSYAL MEDYA (AYLIK)
  {
    id: 'sm_level1',
    name: 'Başlangıç Paketi (Seviye 1: Topluluk Temeli)',
    category: 'social',
    billing: 'monthly',
    level: 'level1',
    includes_meta_ads: false,
    price: priceTRY(15000, { includeKDV: true }),
    description: 'Marka sesi oluşturma ve sadık kitle temeli atma odaklıdır.',
    features: [
      'Ayda 1 gün çekim (2–6 saat)',
      'Ayda 12 içerik üretimi',
      '10 statik görsel / karusel',
      '2 video paylaşımı',
      'Storytelling caption + hashtag',
      'Yorum ve DM yönetimi',
    ],
  },
  {
    id: 'sm_level2',
    name: 'Orta Seviye Paket (Seviye 2: İçerik Ekonomisi ve Trend)',
    category: 'social',
    billing: 'monthly',
    level: 'level2',
    includes_meta_ads: true,
    price: priceTRY(25000, { includeKDV: true }),
    description: 'Viral etki, Reels odaklı büyüme ve reklam yönetimi içerir.',
    features: [
      'Ayda 2 gün çekim (2–6 saat)',
      '6 post (statik/karusel)',
      '4 viral video (trend müzik/akım)',
      '2 doğal ürün deneyim videosu (UGC)',
      '8 story tasarımı',
      'Storytelling caption + hashtag',
      'Ay sonu raporlama + gelecek ay planı',
      'Yorum/DM yönetimi',
      'Meta Ads yönetimi dahil (bütçe dahil, harcama hariç)',
    ],
  },
  {
    id: 'sm_level3',
    name: 'İleri Seviye Paket (Seviye 3: Otorite ve Etki)',
    category: 'social',
    billing: 'monthly',
    level: 'level3',
    includes_meta_ads: true,
    price: priceTRY(40000, { includeKDV: true }),
    description: 'Lider iletişimi, yoğun video üretimi ve çoklu platform yönetimi.',
    features: [
      'Ayda 4 gün çekim (2–6 saat)',
      '8 post üretimi',
      '6 viral video',
      '4 doğal ürün deneyim videosu',
      '12 story tasarımı',
      'Ekstra platform (TikTok, LinkedIn, YouTube Shorts, Pinterest veya X)',
      'Planlama + raporlama + yorum/DM yönetimi',
      'Meta Ads yönetimi dahil',
    ],
  },
  // REKLAM YÖNETİMİ (AYLIK)
  {
    id: 'ads_meta',
    name: 'Meta Ads Yönetimi (Instagram & Facebook)',
    category: 'ads',
    billing: 'monthly',
    ad_platform: 'meta',
    price: priceTRY(10000, { includeKDV: true }),
    description: 'Advantage+ kampanya ve katalog satış odaklı yönetim.',
    features: ['Advantage+ kampanya', 'Katalog satış'],
  },
  {
    id: 'ads_google',
    name: 'Google Ads Yönetimi (Arama Ağı)',
    category: 'ads',
    billing: 'monthly',
    ad_platform: 'google',
    price: priceTRY(15000, { includeKDV: true }),
    description: 'Arama ağı performansı ve dönüşüm odaklı yönetim.',
    features: ['Arama ağı', 'Negatif anahtar kelime', 'Dönüşüm takibi'],
  },
  {
    id: 'ads_tiktok',
    name: 'TikTok Ads Yönetimi',
    category: 'ads',
    billing: 'monthly',
    ad_platform: 'tiktok',
    price: priceTRY(7500, { includeKDV: true }),
    description: 'Genç kitle ve viral içerik odaklı reklam yönetimi.',
    features: ['Spark Ads', 'Creator işbirlikleri'],
  },
  {
    id: 'ads_linkedin',
    name: 'LinkedIn Ads Yönetimi',
    category: 'ads',
    billing: 'monthly',
    ad_platform: 'linkedin',
    price: priceTRY(10000, { includeKDV: true }),
    description: 'Kurumsal/B2B hedefleme ve lider iletişimi reklamları.',
    features: ['B2B odaklı', 'Lider iletişimi reklamları'],
  },
  // TEK SEFERLİK HİZMETLER
  {
    id: 'setup_brand',
    name: 'Marka Kimliği / Logo Tasarımı',
    category: 'setup',
    billing: 'one_time',
    extra_type: 'brand',
    price: priceTRY(20000, { includeKDV: true }),
    description: 'Logo, renk paleti ve kurumsal kimlik tasarımı.',
    features: ['Logo', 'Renk paleti', 'Kurumsal kimlik'],
  },
  {
    id: 'setup_web',
    name: 'Web Sitesi / UI-UX Tasarım',
    category: 'setup',
    billing: 'one_time',
    extra_type: 'web',
    price: priceTRY(50000, { display: '50.000₺+', isMinimum: true }),
    description: 'Kurumsal web sitesi ve UI-UX tasarım çalışması.',
    features: ['50.000₺–100.000₺ aralığı', 'UI-UX tasarım', 'Kurulum & yayın'],
  },
  {
    id: 'setup_ai_automation',
    name: 'Yapay Zeka (AI) Otomasyonu',
    category: 'setup',
    billing: 'one_time',
    extra_type: 'ai_automation',
    price: priceUSD(500),
    description: 'CRM entegrasyonu ve lead bildirimleri.',
    features: ['CRM entegrasyonu', 'Lead bildirimleri'],
  },
  {
    id: 'setup_ai_chatbot',
    name: 'AI Chatbot',
    category: 'setup',
    billing: 'one_time',
    extra_type: 'ai_chatbot',
    price: priceUSD(750),
    description: 'Web sitesi için akıllı asistan kurulumu.',
    features: ['Web sitesi asistanı', 'Sık sorular & yönlendirme'],
  },
];

// --- HELPERS ---
const SECTOR_GROUP_BY_VALUE: Record<string, SectorGroup> = {
  consulting_agency: 'b2b',
  manufacturing: 'b2b',
  saas: 'b2b',
  wholesale_export: 'b2b',
  health_beauty: 'b2c',
  ecommerce_retail: 'b2c',
  real_estate_hospitality: 'b2c',
  food_local: 'b2c',
  other: 'other',
};

const getSectorGroup = (sector: string): SectorGroup =>
  SECTOR_GROUP_BY_VALUE[sector] ?? 'other';

const getOptionLabel = (key: keyof WizardAnswers, value: string) => {
  const question = QUESTIONS.find((q) => q.key === key);
  const option = question?.options?.find((o) => o.value === value);
  return option?.label ?? value;
};

const formatMultiAnswer = (
  key: keyof WizardAnswers,
  values: string[],
  emptyLabel = 'Yok'
) => {
  if (!values || values.length === 0) return emptyLabel;
  if (values.includes('none')) return getOptionLabel(key, 'none');
  return values.map((v) => getOptionLabel(key, v)).join(', ');
};

const formatPrice = (price: Price) => {
  if (price.display) return price.display;
  if (price.currency === 'TRY') return `${formatTRY(price.amount)}₺`;
  return `$${price.amount.toLocaleString('en-US')}`;
};

const sumTotals = (items: AgencyPackage[], billing: Billing): ScenarioTotals => {
  return items.reduce<ScenarioTotals>(
    (acc, item) => {
      if (item.billing !== billing) return acc;
      const currencyKey = item.price.currency;
      acc[currencyKey].amount += item.price.amount;
      acc[currencyKey].hasMinimum =
        acc[currencyKey].hasMinimum || Boolean(item.price.isMinimum);
      return acc;
    },
    {
      TRY: { amount: 0, hasMinimum: false },
      USD: { amount: 0, hasMinimum: false },
    }
  );
};

const formatTotals = (totals: ScenarioTotals) => {
  const parts: string[] = [];
  if (totals.TRY.amount > 0) {
    parts.push(`${formatTRY(totals.TRY.amount)}₺${totals.TRY.hasMinimum ? '+' : ''}`);
  }
  if (totals.USD.amount > 0) {
    parts.push(`$${totals.USD.amount.toLocaleString('en-US')}${totals.USD.hasMinimum ? '+' : ''}`);
  }
  return parts.length > 0 ? parts.join(' + ') : 'Yok';
};

const getSocialPackage = (level: SocialLevel) =>
  PACKAGES.find((p) => p.category === 'social' && p.level === level) || null;

const getAdsPackage = (platform: Exclude<AdPlatform, 'none'>) =>
  PACKAGES.find((p) => p.category === 'ads' && p.ad_platform === platform) || null;

const getSetupPackage = (type: SetupType) =>
  PACKAGES.find((p) => p.category === 'setup' && p.extra_type === type) || null;

const addUnique = (list: AgencyPackage[], pkg: AgencyPackage | null) => {
  if (!pkg) return;
  if (list.some((item) => item.id === pkg.id)) return;
  list.push(pkg);
};

function calculateLeadScore(answers: WizardAnswers): LeadScore {
  let score = 50;

  if (answers.social_scope === 'level2') score += 10;
  if (answers.social_scope === 'level3') score += 20;

  const hasAds =
    answers.ad_platforms.length > 0 && !answers.ad_platforms.includes('none');
  if (hasAds) score += 10;
  if (answers.ad_platforms.includes('google') || answers.ad_platforms.includes('linkedin')) {
    score += 8;
  }

  if (answers.extras.includes('web')) score += 10;
  if (answers.extras.includes('ai_automation')) score += 8;
  if (answers.extras.includes('brand')) score += 5;

  if (score > 100) score = 100;

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
  const sectorGroup = getSectorGroup(answers.sector);
  const selectedAds = answers.ad_platforms.includes('none')
    ? []
    : answers.ad_platforms.filter((p) => p !== 'none');
  const wantsAds = selectedAds.length > 0;
  const selectedExtras = answers.extras.includes('none')
    ? []
    : answers.extras.filter((e) => e !== 'none');

  const buildScenarioResult = (
    type: ScenarioType,
    label: string,
    description: string,
    items: AgencyPackage[]
  ): ScenarioResult => {
    const monthly = sumTotals(items, 'monthly');
    const oneTime = sumTotals(items, 'one_time');

    return {
      type,
      label,
      description,
      items: items.map((item) => ({
        id: item.id,
        name: item.name,
        category: item.category,
        billing: item.billing,
        price: item.price,
        features: item.features,
      })),
      totals: {
        monthly,
        one_time: oneTime,
      },
    };
  };

  const scenarios: ScenarioResult[] = [];

  // Economy (Minimum Risk)
  {
    const items: AgencyPackage[] = [];
    addUnique(items, getSocialPackage('level1'));

    if (wantsAds) {
      let economyAd: AgencyPackage | null = null;
      if (selectedAds.includes('tiktok')) {
        economyAd = getAdsPackage('tiktok');
      } else if (selectedAds.includes('meta')) {
        economyAd = getAdsPackage('meta');
      } else {
        economyAd = getAdsPackage('tiktok');
      }
      addUnique(items, economyAd);
    }

    scenarios.push(
      buildScenarioResult(
        'economy',
        'Ekonomik Plan (Minimum Risk)',
        'Minimum riskle başlayan, temel görünürlük ve kontrollü büyüme isteyen markalar için.',
        items
      )
    );
  }

  // Growth
  {
    const items: AgencyPackage[] = [];
    addUnique(items, getSocialPackage('level2'));

    if (wantsAds) {
      const adSet = new Set<Exclude<AdPlatform, 'none'>>();
      if (selectedAds.includes('google')) adSet.add('google');
      if (selectedAds.includes('tiktok')) adSet.add('tiktok');
      if (selectedAds.includes('linkedin')) adSet.add('linkedin');

      // B2B ağırlığı: LinkedIn'i öne çıkar
      if (sectorGroup === 'b2b' && !adSet.has('linkedin')) {
        adSet.add('linkedin');
      }

      adSet.forEach((platform) => addUnique(items, getAdsPackage(platform)));
    }

    if (selectedExtras.includes('brand')) addUnique(items, getSetupPackage('brand'));
    if (selectedExtras.includes('ai_automation')) addUnique(items, getSetupPackage('ai_automation'));

    scenarios.push(
      buildScenarioResult(
        'growth',
        'Büyüme Planı (Önerilen)',
        'Büyüme ve geri dönüş dengesini koruyan, Meta Ads avantajı içeren plan.',
        items
      )
    );
  }

  // Aggressive
  {
    const items: AgencyPackage[] = [];
    addUnique(items, getSocialPackage('level3'));

    if (wantsAds) {
      const adSet = new Set<Exclude<AdPlatform, 'none'>>();
      selectedAds.forEach((platform) => {
        if (platform !== 'meta') {
          adSet.add(platform as Exclude<AdPlatform, 'none'>);
        }
      });

      if (sectorGroup === 'b2b') {
        adSet.add('linkedin');
        adSet.add('google');
      } else if (sectorGroup === 'b2c') {
        adSet.add('tiktok');
      }

      adSet.forEach((platform) => addUnique(items, getAdsPackage(platform)));
    }

    if (selectedExtras.includes('brand')) addUnique(items, getSetupPackage('brand'));
    if (selectedExtras.includes('web')) addUnique(items, getSetupPackage('web'));
    if (selectedExtras.includes('ai_automation')) addUnique(items, getSetupPackage('ai_automation'));

    if (!selectedExtras.includes('web')) {
      addUnique(items, getSetupPackage('ai_chatbot'));
    }

    scenarios.push(
      buildScenarioResult(
        'aggressive',
        'Agresif Plan (Dominasyon)',
        'Pazarda hızlı yer kaplamak ve görünürlüğü domine etmek isteyen markalar için.',
        items
      )
    );
  }

  return scenarios;
}

// --- MAIN COMPONENT ---
const Wizard: React.FC = () => {
  const [step, setStep] = useState<number>(0);
  const [answers, setAnswers] = useState<WizardAnswers>({
    sector: '',
    social_scope: '',
    ad_platforms: [],
    extras: [],
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

  const toggleMultiValue = <T extends string>(
    currentValues: T[],
    value: T,
    exclusiveValue?: T
  ): T[] => {
    if (exclusiveValue && value === exclusiveValue) {
      return [value];
    }

    const nextValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];

    return exclusiveValue ? nextValues.filter((v) => v !== exclusiveValue) : nextValues;
  };

  const handleAnswer = (question: QuestionConfig, value: string) => {
    const key = question.key;

    if (question.multi) {
      if (key === 'ad_platforms') {
        const typedValue = value as AdPlatform;
        setAnswers((prev) => ({
          ...prev,
          ad_platforms: toggleMultiValue(
            prev.ad_platforms,
            typedValue,
            question.exclusiveValue as AdPlatform | undefined
          ),
        }));
        return;
      }

      if (key === 'extras') {
        const typedValue = value as ExtraNeed;
        setAnswers((prev) => ({
          ...prev,
          extras: toggleMultiValue(
            prev.extras,
            typedValue,
            question.exclusiveValue as ExtraNeed | undefined
          ),
        }));
        return;
      }
    }

    if (key === 'sector') {
      setAnswers((prev) => ({ ...prev, sector: value }));
      return;
    }

    if (key === 'social_scope') {
      setAnswers((prev) => ({ ...prev, social_scope: value }));
    }
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

Sektör: ${getOptionLabel('sector', answers.sector)}
Sosyal medya beklentisi: ${getOptionLabel('social_scope', answers.social_scope)}
Reklam platformları: ${formatMultiAnswer('ad_platforms', answers.ad_platforms, 'Reklam düşünmüyor')}
Ekstra ihtiyaçlar: ${formatMultiAnswer('extras', answers.extras, 'Yok')}

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
          business_type: getOptionLabel('sector', answers.sector),
          budget_range: `${getOptionLabel('social_scope', answers.social_scope)} | Ads: ${formatMultiAnswer(
            'ad_platforms',
            answers.ad_platforms
          )} | Ekstra: ${formatMultiAnswer('extras', answers.extras)}`,
          score,
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

    const current = scenarios.find((s) => s.type === activeTab) ?? scenarios[0];
    if (!current) return;

    const monthlyTotalLabel = formatTotals(current.totals.monthly);
    const oneTimeTotalLabel = formatTotals(current.totals.one_time);
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
      `Aylık Toplam: ${monthlyTotalLabel}`,
      `Tek Seferlik Ekstra: ${oneTimeTotalLabel}`,
      ``,
      `Önerilen paketler:`,
      ...current.items.map(
        (item) =>
          `- ${item.name} (${CATEGORY_LABELS[item.category]} • ${
            item.billing === 'monthly' ? 'Aylık' : 'Tek Seferlik'
          }) ~ ${formatPrice(item.price)}`
      ),
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

Sektör: ${getOptionLabel('sector', answers.sector)}
Sosyal medya beklentisi: ${getOptionLabel('social_scope', answers.social_scope)}
Reklam platformları: ${formatMultiAnswer('ad_platforms', answers.ad_platforms, 'Reklam düşünmüyor')}
Ekstra ihtiyaçlar: ${formatMultiAnswer('extras', answers.extras, 'Yok')}

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
      sector: '',
      social_scope: '',
      ad_platforms: [],
      extras: [],
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

  const expectationDescriptions: Record<string, string> = {
    level1: "Mevcut durumu koruyalım.",
    level2: "Satışları ve etkileşimi artıralım.",
    level3: "Sektörü domine edelim.",
  };

  const renderOptionIcon = (icon: QuestionOption['icon'], className: string) => {
    if (!icon) return null;
    const props: OptionIconProps = { className };
    if (icon.props?.size) props.size = icon.props.size;
    if (icon.props?.strokeWidth) props.strokeWidth = icon.props.strokeWidth;
    return React.cloneElement(icon, props);
  };

  const isOptionSelected = (question: QuestionConfig, option: QuestionOption) => {
    const currentValue = answers[question.key];
    return Array.isArray(currentValue)
      ? (currentValue as string[]).includes(option.value)
      : currentValue === option.value;
  };

  const isQuestionAnswered = (question: QuestionConfig) => {
    const value = answers[question.key];
    if (Array.isArray(value)) return value.length > 0;
    return Boolean(value);
  };

  if (scenarios && scenarios.length > 0) {
    const currentData =
      scenarios.find((s) => s.type === activeTab) ?? scenarios[0];

    if (!currentData) {
      return null;
    }

    const scenarioBadge: Record<ScenarioType, string> = {
      economy: "Minimum Risk",
      growth: "Önerilen",
      aggressive: "Dominasyon",
    };

    const scenarioTone: Record<ScenarioType, string> = {
      economy: "Minimum riskle başlayan ve bütçeyi kontrollü büyüten plan.",
      growth: "Büyüme ve geri dönüş dengesini koruyan plan.",
      aggressive: "Hızlı büyüme ve pazar payı kazanma odaklı.",
    };

    const monthlyTotalsLabel = formatTotals(currentData.totals.monthly);
    const oneTimeTotalsLabel = formatTotals(currentData.totals.one_time);
    const monthlyTryTotal = currentData.totals.monthly.TRY.amount;
    const avgDailyBudget = monthlyTryTotal > 0 ? Math.round(monthlyTryTotal / 30) : 0;
    const avgDailyLabel =
      monthlyTryTotal > 0
        ? `~${formatTRY(avgDailyBudget)}₺${currentData.totals.monthly.TRY.hasMinimum ? '+' : ''}`
        : '—';

    return (
      <div className="max-w-6xl mx-auto animate-fade-in duration-500 space-y-8">
        {/* Üst Başlık Alanı */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-white/10">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-2">
              Sonuç Raporu <Sparkles className={ICON_CLASS} />
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
              <RefreshCcw size={16} className={ICON_CLASS} /> Yeni Test
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
                <Bot className={`${ICON_CLASS} shrink-0 mt-1`} size={32} />
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
                  <div className="text-[11px] text-neutral-400 mb-1">Aylık Toplam (Ajans + Yönetim)</div>
                  <div className="text-lg font-bold text-brand-100">{monthlyTotalsLabel}</div>
                  <p className="text-[11px] text-neutral-500 mt-1">
                    Günlük ortalama: {avgDailyLabel}. Fiyatlar detaylı görüşmede netleşir.
                  </p>
                </div>
                <div className="bg-neutral-900/70 border border-white/10 rounded-xl p-3">
                  <div className="text-[11px] text-neutral-400 mb-1">Tek Seferlik Ekstra</div>
                  <div className="text-lg font-bold text-white">{oneTimeTotalsLabel}</div>
                  <p className="text-[11px] text-neutral-500 mt-1">
                    Kurulum/yenileme ihtiyaçları bu kalemde listelenir.
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
                        {CATEGORY_LABELS[pkg.category]} • {pkg.billing === 'monthly' ? 'Aylık' : 'Tek Seferlik'}
                      </span>
                      <span className="text-brand-100 font-bold text-base">
                        {formatPrice(pkg.price)}
                      </span>
                    </div>
                    <h4 className="font-bold text-white mb-1 text-sm md:text-base">{pkg.name}</h4>
                    <ul className="space-y-2 mt-3 flex-grow">
                      {pkg.features.map((f, i) => (
                        <li key={i} className="text-xs text-neutral-400 flex items-start gap-2">
                          <Check size={12} className={`${ICON_CLASS} mt-0.5`} /> {f}
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
                  <Sparkles size={14} className={ICON_CLASS} />
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
                  <MessageCircle size={18} className={ICON_CLASS} /> WhatsApp’tan Devam Et
                </button>

                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  Mesajda; işletme adınız, seçtiğiniz plan tipi ve paketler otomatik olarak iletilecek. Siz sadece gönderip
                  danışmanımızla konuşmaya başlayacaksınız.
                </p>

                <div className="grid gap-2 text-[11px] text-neutral-400">
                  <div className="flex items-center gap-2">
                    <Fingerprint size={14} className={ICON_CLASS} />
                    <span>Bu rapor sadece {leadInfo.companyName || "işletmeniz"} için oluşturuldu.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star size={14} className={ICON_CLASS} />
                    <span>Fiyatlar ilk toplantıda netleşir; bu ekran, karar vermenize yardımcı olmak içindir.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Müşteri Yanıt Özeti (Mikro Güven Alanı) */}
            <div className="bg-neutral-900/70 border border-white/10 rounded-2xl p-4 space-y-3">
              <div className="flex items-center gap-2">
                <User size={16} className={ICON_CLASS} />
                <span className="text-xs font-semibold text-neutral-200">Yanıtlarınızın Özeti</span>
              </div>
              <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                {Object.entries(answers).map(([key, value]) => {
                  const q = QUESTIONS.find((q) => q.key === key);
                  if (!q) return null;

                  const displayValue = Array.isArray(value)
                    ? formatMultiAnswer(q.key, value)
                    : getOptionLabel(q.key, String(value));

                  return (
                    <div key={key} className="flex justify-between gap-3 text-[11px]">
                      <span className="text-neutral-500 line-clamp-1">{q.text}</span>
                      <span className="text-neutral-100 font-medium line-clamp-1 text-right">
                        {displayValue}
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
              <Fingerprint className={ICON_CLASS} /> Marka Kimliği Analizi
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
                    <Sparkles size={14} className={ICON_CLASS} /> Marka kimliği raporu oluştur
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
  const totalSteps = QUESTIONS.length;
  const stepNumber = Math.min(step + 1, totalSteps);
  const progressPercentage = (stepNumber / totalSteps) * 100;
  const leadTotalSteps = totalSteps + 1;
  const leadStepNumber = leadTotalSteps;
  const leadProgressPercentage = (leadStepNumber / leadTotalSteps) * 100;

  return (
    <div className="max-w-6xl mx-auto">
      {step < QUESTIONS.length && currentQuestion && (
        <div className="space-y-10">
          {/* Progress Bar */}
          <div className="w-full max-w-6xl mx-auto px-2">
            <div className="flex justify-between items-center text-xs text-neutral-500 mb-3 font-medium tracking-wide">
              <span>Adım {stepNumber} / {totalSteps}</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full relative">
              <div
                className="h-full rounded-full transition-all duration-700 ease-out bg-gradient-to-r from-[#800000] via-[#b3124a] to-[#ff4d6d] relative"
                style={{ width: `${progressPercentage}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 pointer-events-none">
                  <div className="absolute inset-0 bg-white rounded-full blur-[2px] shadow-[0_0_12px_4px_rgba(255,77,109,0.6)] animate-pulse" />
                  <div className="absolute inset-[-4px] bg-[#ff4d6d]/40 rounded-full blur-md" />
                  <div className="absolute inset-0 bg-yellow-200 rounded-full opacity-80 scale-50" />
                </div>
              </div>
            </div>
          </div>

          {/* Wizard Content */}
          <div className="w-full max-w-6xl mx-auto px-2 md:px-6 flex flex-col">
            {/* AI Badge */}
            <div className="mb-8 flex justify-start">
              <div className="relative group cursor-default">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#800000] to-[#ff4d6d] rounded-full blur opacity-30 group-hover:opacity-60 transition duration-500" />
                <div className="relative flex items-center space-x-2.5 bg-[#0a0a0a] border border-white/10 rounded-full px-4 py-1.5 pr-5">
                  <div className="relative flex items-center justify-center w-5 h-5">
                    <div className="absolute inset-0 bg-[#800000] rounded-full animate-ping opacity-20" />
                    <Sparkles className="w-3.5 h-3.5 text-[#ffb3b3] relative z-10" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] bg-gradient-to-r from-white via-[#ffb3b3] to-gray-400 bg-clip-text text-transparent">
                      Dou Social AI
                    </span>
                    <span className="text-[8px] text-neutral-500 font-medium tracking-wide leading-none -mt-0.5">
                      Wizard Engine v2.0
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step Content */}
            <div className="flex-grow animate-fade-in">
              {currentQuestion.key === "sector" && (
                <div className="space-y-8">
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Sektörünüzü seçin</h1>
                    <p className="text-neutral-400 text-sm leading-relaxed">
                      Sektörünüze özel stratejiler sunabilmemiz için faaliyet alanınızı belirleyin.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    <div>
                      <div className="flex items-center space-x-2 mb-4">
                        <div className="h-px w-6 bg-[#800000]/60" />
                        <h3 className="text-xs font-bold text-[#ffb3b3] uppercase tracking-widest">B2B - Kurumsal</h3>
                      </div>
                      <div className="flex flex-col gap-3">
                        {currentQuestion.options
                          .filter((option) => option.group === "b2b")
                          .map((option) => {
                            const selected = isOptionSelected(currentQuestion, option);
                            return (
                              <button
                                key={option.value}
                                onClick={() => handleAnswer(currentQuestion, option.value)}
                                className={`relative group cursor-pointer p-3.5 rounded-xl border transition-all duration-200 text-left ${
                                  selected
                                    ? "bg-white/10 border-[#800000]/60 shadow-[0_0_15px_-5px_rgba(128,0,0,0.4)]"
                                    : "bg-[#111111] border-white/5 hover:bg-[#161616] hover:border-white/10"
                                }`}
                              >
                                <div className="flex items-center space-x-3">
                                  <div className={`p-2 rounded-lg ${selected ? "bg-[#800000] text-white" : "bg-white/5 text-neutral-400 group-hover:text-white"}`}>
                                    {renderOptionIcon(option.icon, selected ? "text-white" : "text-neutral-400")}
                                  </div>
                                  <span className={`text-sm font-medium ${selected ? "text-white" : "text-neutral-300 group-hover:text-white"}`}>
                                    {option.label}
                                  </span>
                                </div>
                                {selected && (
                                  <div className="absolute top-2 right-2 w-2 h-2 bg-[#800000] rounded-full shadow-[0_0_6px_rgba(128,0,0,0.8)]" />
                                )}
                              </button>
                            );
                          })}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center space-x-2 mb-4">
                        <div className="h-px w-6 bg-[#ff4d6d]/60" />
                        <h3 className="text-xs font-bold text-[#ffb3b3] uppercase tracking-widest">B2C - Tüketici</h3>
                      </div>
                      <div className="flex flex-col gap-3">
                        {currentQuestion.options
                          .filter((option) => option.group === "b2c")
                          .map((option) => {
                            const selected = isOptionSelected(currentQuestion, option);
                            return (
                              <button
                                key={option.value}
                                onClick={() => handleAnswer(currentQuestion, option.value)}
                                className={`relative group cursor-pointer p-3.5 rounded-xl border transition-all duration-200 text-left ${
                                  selected
                                    ? "bg-white/10 border-[#ff4d6d]/60 shadow-[0_0_15px_-5px_rgba(255,77,109,0.4)]"
                                    : "bg-[#111111] border-white/5 hover:bg-[#161616] hover:border-white/10"
                                }`}
                              >
                                <div className="flex items-center space-x-3">
                                  <div className={`p-2 rounded-lg ${selected ? "bg-[#ff4d6d] text-white" : "bg-white/5 text-neutral-400 group-hover:text-white"}`}>
                                    {renderOptionIcon(option.icon, selected ? "text-white" : "text-neutral-400")}
                                  </div>
                                  <span className={`text-sm font-medium ${selected ? "text-white" : "text-neutral-300 group-hover:text-white"}`}>
                                    {option.label}
                                  </span>
                                </div>
                                {selected && (
                                  <div className="absolute top-2 right-2 w-2 h-2 bg-[#ff4d6d] rounded-full shadow-[0_0_6px_rgba(255,77,109,0.8)]" />
                                )}
                              </button>
                            );
                          })}
                        {currentQuestion.options
                          .filter((option) => option.group === "other")
                          .map((option) => {
                            const selected = isOptionSelected(currentQuestion, option);
                            return (
                              <button
                                key={option.value}
                                onClick={() => handleAnswer(currentQuestion, option.value)}
                                className={`relative group cursor-pointer p-3.5 rounded-xl border transition-all duration-200 text-left ${
                                  selected
                                    ? "bg-white/10 border-[#ff4d6d]/60 shadow-[0_0_15px_-5px_rgba(255,77,109,0.4)]"
                                    : "bg-[#111111] border-white/5 hover:bg-[#161616] hover:border-white/10"
                                }`}
                              >
                                <div className="flex items-center space-x-3">
                                  <div className={`p-2 rounded-lg ${selected ? "bg-[#ff4d6d] text-white" : "bg-white/5 text-neutral-400 group-hover:text-white"}`}>
                                    {renderOptionIcon(option.icon, selected ? "text-white" : "text-neutral-400")}
                                  </div>
                                  <span className={`text-sm font-medium ${selected ? "text-white" : "text-neutral-300 group-hover:text-white"}`}>
                                    {option.label}
                                  </span>
                                </div>
                                {selected && (
                                  <div className="absolute top-2 right-2 w-2 h-2 bg-[#ff4d6d] rounded-full shadow-[0_0_6px_rgba(255,77,109,0.8)]" />
                                )}
                              </button>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentQuestion.key === "social_scope" && (
                <div className="space-y-8 max-w-2xl mx-auto">
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Beklentiniz nedir?</h1>
                    <p className="text-neutral-400 text-sm leading-relaxed">
                      Seçtiğiniz seviye içerik yoğunluğunu ve ekip planlamasını belirler.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3">
                    {currentQuestion.options.map((option) => {
                      const selected = isOptionSelected(currentQuestion, option);
                      const desc = expectationDescriptions[option.value] || "";
                      return (
                        <button
                          key={option.value}
                          onClick={() => handleAnswer(currentQuestion, option.value)}
                          className={`flex items-center justify-between p-5 rounded-xl border cursor-pointer transition-all duration-200 text-left ${
                            selected
                              ? "bg-white/10 border-[#800000]/60 shadow-[0_0_15px_-5px_rgba(128,0,0,0.4)]"
                              : "bg-[#111111] border-white/5 hover:bg-[#161616] hover:border-white/10"
                          }`}
                        >
                          <div className="flex items-center space-x-4">
                            <div className={`p-3 rounded-lg ${selected ? "bg-[#800000] text-white" : "bg-white/5 text-neutral-400"}`}>
                              {renderOptionIcon(option.icon, selected ? "text-white" : "text-neutral-400")}
                            </div>
                            <div>
                              <h3 className={`font-semibold ${selected ? "text-white" : "text-neutral-200"}`}>
                                {option.label}
                              </h3>
                              {desc && <p className="text-xs text-neutral-500 mt-0.5">{desc}</p>}
                            </div>
                          </div>
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                            selected ? "border-[#800000] bg-[#800000] text-white" : "border-white/20 text-transparent"
                          }`}>
                            <CheckCircle2 size={12} />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {(currentQuestion.key === "ad_platforms" || currentQuestion.key === "extras") && (
                <div className="space-y-8 max-w-2xl mx-auto">
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-2">
                      {currentQuestion.key === "ad_platforms" ? "Reklam Platformları" : "Dijital Varlık İhtiyacı"}
                    </h1>
                    <p className="text-neutral-400 text-sm leading-relaxed">
                      {currentQuestion.key === "ad_platforms"
                        ? "Reklam çıkmayı hedeflediğiniz platformları seçin. (Çoklu seçim yapılabilir)"
                        : "Yenileme veya kurulum ihtiyacınız var mı? Tek seferlik ihtiyaçları seçebilirsiniz."}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentQuestion.options.map((option) => {
                      const selected = isOptionSelected(currentQuestion, option);
                      return (
                        <button
                          key={option.value}
                          onClick={() => handleAnswer(currentQuestion, option.value)}
                          className={`flex items-center p-4 rounded-xl border cursor-pointer transition-all duration-200 h-full text-left ${
                            selected
                              ? "bg-white/10 border-[#ff4d6d]/60 shadow-[0_0_15px_-5px_rgba(255,77,109,0.35)]"
                              : "bg-[#111111] border-white/5 hover:bg-[#161616] hover:border-white/10"
                          }`}
                        >
                          <div className={`p-2.5 rounded-lg mr-3 transition-colors ${selected ? "bg-[#ff4d6d] text-white" : "bg-white/5 text-neutral-400"}`}>
                            {renderOptionIcon(option.icon, selected ? "text-white" : "text-neutral-400")}
                          </div>
                          <span className={`text-sm font-medium flex-grow ${selected ? "text-white" : "text-neutral-300"}`}>
                            {option.label}
                          </span>
                          <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ml-2 ${
                            selected ? "bg-[#ff4d6d] border-[#ff4d6d] text-white" : "border-white/20 bg-transparent"
                          }`}>
                            {selected && <CheckCircle2 size={10} />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Footer Navigation */}
            <div className="mt-auto pt-8 flex justify-between items-center border-t border-white/5">
              <button
                onClick={() => setStep((prev) => Math.max(prev - 1, 0))}
                className={`flex items-center text-sm font-medium text-neutral-500 hover:text-white transition-colors ${
                  step === 0 ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Geri
              </button>

              <button
                onClick={handleNext}
                disabled={!isQuestionAnswered(currentQuestion)}
                className={`group flex items-center space-x-2 px-6 py-3 rounded-lg font-medium text-sm transition-all duration-300 ${
                  !isQuestionAnswered(currentQuestion)
                    ? "bg-white/5 text-neutral-500 cursor-not-allowed border border-white/5"
                    : "bg-white text-black hover:bg-gray-200 shadow-[0_0_15px_-3px_rgba(255,255,255,0.3)]"
                }`}
              >
                <span>{stepNumber === totalSteps ? "Tamamla" : "Devam Et"}</span>
                <ChevronRight className={`w-4 h-4 transition-transform ${!isQuestionAnswered(currentQuestion) ? "" : "group-hover:translate-x-1"} ${ICON_CLASS}`} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LEAD FORM STEP */}
      {step === QUESTIONS.length && (
        <div className="space-y-10">
          <div className="w-full max-w-6xl mx-auto px-2">
            <div className="flex justify-between items-center text-xs text-neutral-500 mb-3 font-medium tracking-wide">
              <span>Adım {leadStepNumber} / {leadTotalSteps}</span>
              <span>{Math.round(leadProgressPercentage)}%</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full relative">
              <div
                className="h-full rounded-full transition-all duration-700 ease-out bg-gradient-to-r from-[#800000] via-[#b3124a] to-[#ff4d6d] relative"
                style={{ width: `${leadProgressPercentage}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 pointer-events-none">
                  <div className="absolute inset-0 bg-white rounded-full blur-[2px] shadow-[0_0_12px_4px_rgba(255,77,109,0.6)] animate-pulse" />
                  <div className="absolute inset-[-4px] bg-[#ff4d6d]/40 rounded-full blur-md" />
                  <div className="absolute inset-0 bg-yellow-200 rounded-full opacity-80 scale-50" />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full max-w-6xl mx-auto px-2 md:px-6 flex flex-col">
            <div className="mb-8 flex justify-start">
              <div className="relative group cursor-default">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#800000] to-[#ff4d6d] rounded-full blur opacity-30 group-hover:opacity-60 transition duration-500" />
                <div className="relative flex items-center space-x-2.5 bg-[#0a0a0a] border border-white/10 rounded-full px-4 py-1.5 pr-5">
                  <div className="relative flex items-center justify-center w-5 h-5">
                    <div className="absolute inset-0 bg-[#800000] rounded-full animate-ping opacity-20" />
                    <Sparkles className="w-3.5 h-3.5 text-[#ffb3b3] relative z-10" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] bg-gradient-to-r from-white via-[#ffb3b3] to-gray-400 bg-clip-text text-transparent">
                      Dou Social AI
                    </span>
                    <span className="text-[8px] text-neutral-500 font-medium tracking-wide leading-none -mt-0.5">
                      Wizard Engine v2.0
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8 animate-fade-in">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Sizi nasıl arayalım?
                </h1>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  Planı netleştirmek ve size özel teklif hazırlamak için iletişim bilgilerinize ihtiyacımız var.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-neutral-300 flex items-center gap-2">
                    <User className={`h-4 w-4 ${ICON_CLASS}`} /> Ad Soyad
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={leadInfo.fullName}
                    onChange={(e) => handleLeadInfoChange("fullName", e.target.value)}
                    autoComplete="name"
                    className="w-full rounded-xl bg-[#111111] border border-white/10 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#800000]/60 focus:ring-1 focus:ring-[#800000]/20"
                    placeholder="Örn. Deniz Kılıç"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-neutral-300 flex items-center gap-2">
                    <Briefcase className={`h-4 w-4 ${ICON_CLASS}`} /> İşletme / Marka Adı
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={leadInfo.companyName}
                    onChange={(e) => handleLeadInfoChange("companyName", e.target.value)}
                    autoComplete="organization"
                    className="w-full rounded-xl bg-[#111111] border border-white/10 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#800000]/60 focus:ring-1 focus:ring-[#800000]/20"
                    placeholder="Örn. En20 Sport's Club"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-neutral-300 flex items-center gap-2">
                    <Phone className={`h-4 w-4 ${ICON_CLASS}`} /> Telefon
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    inputMode="numeric"
                    maxLength={10}
                    value={leadInfo.phone}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      handleLeadInfoChange("phone", value);
                    }}
                    autoComplete="tel"
                    pattern="^5[0-9]{9}$"
                    className={`w-full rounded-xl bg-[#111111] border px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-1 ${
                      leadInfo.phone.length === 0
                        ? "border-white/10 focus:border-[#800000]/60 focus:ring-[#800000]/20"
                        : /^5\d{9}$/.test(leadInfo.phone)
                        ? "border-green-500/60 focus:border-green-500/70 focus:ring-green-500/20"
                        : "border-red-500/60 focus:border-red-500/70 focus:ring-red-500/20"
                    }`}
                    placeholder="5xx xxx xx xx"
                  />
                  {leadInfo.phone.length > 0 && !/^5\d{9}$/.test(leadInfo.phone) && (
                    <p className="text-[11px] text-red-400">
                      Telefon numarası 5 ile başlamalı ve 10 haneli olmalıdır.
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-neutral-300 flex items-center gap-2">
                    <Mail className={`h-4 w-4 ${ICON_CLASS}`} /> E-posta
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={leadInfo.email}
                    onChange={(e) => {
                      const value = e.target.value.trim();
                      handleLeadInfoChange("email", value);
                    }}
                    autoComplete="email"
                    pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                    className={`w-full rounded-xl bg-[#111111] border px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-1 ${
                      leadInfo.email.length === 0
                        ? "border-white/10 focus:border-[#800000]/60 focus:ring-[#800000]/20"
                        : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leadInfo.email)
                        ? "border-green-500/60 focus:border-green-500/70 focus:ring-green-500/20"
                        : "border-red-500/60 focus:border-red-500/70 focus:ring-red-500/20"
                    }`}
                    placeholder="ornek@firma.com"
                  />
                  {leadInfo.email.length > 0 &&
                    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leadInfo.email) && (
                      <p className="text-[11px] text-red-400">
                        Lütfen geçerli bir e-posta adresi girin.
                      </p>
                    )}
                </div>
              </div>

              <div className="flex flex-wrap justify-between items-center gap-3 text-xs text-neutral-500 border-t border-white/5 pt-4">
                <span>
                  Bilgileriniz sadece Dou Social ekibi tarafından teklif & bilgi paylaşımı için kullanılacaktır.
                </span>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleNext}
                  disabled={isLoading}
                  className={`group flex items-center space-x-2 px-6 py-3 rounded-lg font-medium text-sm transition-all duration-300 ${
                    isLoading
                      ? "bg-white/70 text-black cursor-not-allowed"
                      : "bg-white text-black hover:bg-gray-200 shadow-[0_0_15px_-3px_rgba(255,255,255,0.3)]"
                  }`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Analiz ediliyor...</span>
                    </>
                  ) : (
                    <>
                      <span>Planı Oluştur</span>
                      <ChevronRight className={`h-4 w-4 transition-transform group-hover:translate-x-1 ${ICON_CLASS}`} />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wizard;
