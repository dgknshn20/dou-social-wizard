import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Anahtarı ortam değişkeninden al
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { businessType, budget, scale, goals, contentNeed } = body;

    // Gemini Modelini Seç (Hızlı ve zeki olan flash modeli)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Dinamik Prompt Hazırlığı
    const prompt = `
      Sen profesyonel bir dijital pazarlama stratejistisin "Dou Social" ajansı adına konuşuyorsun.
      Aşağıdaki potansiyel müşteri için kısa, vurucu ve ikna edici bir strateji özeti yaz.

      Müşteri Bilgileri:
      - Sektör: ${businessType}
      - Ölçek: ${scale}
      - Bütçe Aralığı: ${budget}
      - Hedefler: ${goals.join(", ")}
      - İçerik İhtiyacı: ${contentNeed}

      İstekler:
      1. "Merhaba!" diye başla, samimi ve "sen" dili kullan.
      2. Onların sektörüne özel 1 tane çok spesifik büyüme taktiği ver.
      3. Neden profesyonel desteğe ihtiyaçları olduğunu 2 cümleyle özetle.
      4. Emoji kullan ama abartma.
      5. Toplamda 3 kısa paragrafı geçmesin.
      6. Çıktı düz metin olsun (Markdown kullanma).
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ output: text });

  } catch (error) {
    console.error("AI Hatası:", error);
    return NextResponse.json({ output: "Şu an yoğunluktan dolayı yapay zeka yanıt veremedi, ancak paket önerilerimiz aşağıda hazır!" }, { status: 500 });
  }
}