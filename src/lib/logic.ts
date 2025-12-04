// src/lib/logic.ts

export interface UserData {
  businessType: string;
  budget: string;
  scale: string;
  goals: string[];
  channels: string[];
  contentNeed: string;
  adsNeed: string;
  automation: string;
}

export function calculateRecommendation(data: UserData) {
  const result = {
    socialPackage: "Paket 1 - Başlangıç",
    productionPackage: "Paket A - Mini Çekim",
    adsPackage: "R1 - Temel Reklam",
    automation: "O1 - Karşılama Botu",
    price: "15.000₺ - 20.000₺",
    is360: false,
    opsiyon360: "",
  };

  // --- 1. SOSYAL MEDYA PAKETİ MANTIĞI ---
  if (data.scale === "Kurumsal / Zincir" || data.budget === "50.000₺+") {
    result.socialPackage = "Paket 3 - Kurumsal (3 Platform)";
    result.price = "40.000₺ - 60.000₺";
  } else if (data.goals.includes("Sürekli içerik üretmek") || data.scale === "Büyüyen (2-3 şube)") {
    result.socialPackage = "Paket 2 - Büyüme (Haftalık Reels)";
    result.price = "25.000₺ - 35.000₺";
  }

  // --- 2. PRODÜKSİYON MANTIĞI ---
  if (data.contentNeed === "Üst düzey prodüksiyon") {
    result.productionPackage = "Paket C - Seri Üretim & Hero";
  } else if (data.contentNeed === "Düzenli foto & video") {
    result.productionPackage = "Paket B - Gün Boyu Prodüksiyon";
  }

  // --- 3. REKLAM MANTIĞI ---
  if (data.adsNeed === "Hem marka hem performans") {
    result.adsPackage = "R3 - Tam Büyüme (Google + Meta)";
  } else if (data.adsNeed === "Performans odaklı satış") {
    result.adsPackage = "R2 - Performans Odaklı";
  }

  // --- 4. OTOMASYON MANTIĞI ---
  if (data.automation === "Tam otomasyon") {
    result.automation = "O3 - Tam Entegre Sistem";
  } else if (data.automation === "Lead toplama + CRM") {
    result.automation = "O2 - Lead & CRM Botu";
  }

  // --- 360 DERECE KONTROLÜ ---
  if (data.goals.includes("Online satış / rezervasyon") && data.budget === "50.000₺+") {
    result.is360 = true;
    result.opsiyon360 = "360 Paket XL (Full Domination)";
  } else if (data.adsNeed !== "Sadece temel reklamlar" && data.contentNeed !== "Stok görsel") {
    result.opsiyon360 = "360 Paket M (Marka + Performans)";
  }

  return result;
}