// app/actions.ts
'use server'

import { google } from 'googleapis';
import nodemailer from 'nodemailer';

// --- AYARLAR ---
const GOOGLE_CLIENT_EMAIL = "dou-social@modular-aileron-426115-m0.iam.gserviceaccount.com";
const SPREADSHEET_ID = "15_aZ1fKu7w8VK9tl7kgoSMK6VW5DApU0RnkXQtgV-7M";

// Private Key'i "Template Literal" (Ters tırnak) içine aldık. En güvenli yöntem budur.
const GOOGLE_PRIVATE_KEY = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDJChAYY6I36yRM
mjgyY1kTViFITftmo8DSZyAXDvTZ7HziZEwfsQt9/Ibx+0jAV7sF053Ox/PAux5v
oTF5+QCbEO72BYqXTC2jzHNAPMcGfBjjrzOirl2L/NiB4yGY0++aWM/yONo3QZgR
Qbl+gx6ToM8C7DFD9CZt5ZJzlKjrLXHHgmXj4gfnqOb+YdtpQlcGRg4pIlsxRlTS
q7sQVcgph1IMJ26biDHhKjJVDDDUh+XJXNZ5L66zaZTChGNs0f3fjZzRX4r0sMhx
s4IYjjrrVG67B7Mxdg7OShLZYNtTlTxK8wY4ZZjJQey6H+VADuqpNysNnw4Ad51Z
ad1yKMR7AgMBAAECggEADKI/wbCdNKNnzBKS/oOkyOTMQaV464nV58MITrqnY3yL
mpSP/hvbq4avmkxe1YuN2r9iNuj05gM8VeqM1+vwgE4vnjFZ9MkaQyVphrtrDHrG
+6P6fDo18cKpfnweE+MZtxrmsoOlHvzVyBvXwt4NkVx1NetO60TQF27qZa4NcX30
aUv4UyTVGXj/VGg41WSkIhQsHb0qX1E96QHt+cO/b5soFejn0oV9/jMmZWzMnIb4
aSkKGfbHaFZXAIYz8Ch18UagEnypn9dJjptL1xiusNYWPtF6NZvPsVXZfHMeYUN5
ZpRcYIK7YxWRiKRvml7F1coRmN7uV6bhI3Cvt7OhTQKBgQD+fyD/tNnkrkBdlqlN
OFC/MKr1X0LAMtrMPQv6D3Yylp+HxKy8Blo7Zx8+CnTkoQe9UyAlmN7ahkT2/sep
soUgFdIskJVSZvDxa7R2mpZKnZPOaexs9yY/btQWnlztyRXSWirNflKv02tS886H
FnaxzlE/b99ibcCCXYSFM109BQKBgQDKOhdkT9d7wAmp+3AAXonhQtScyatipe4l
RUtID9b2fPUsZHIa85QugDAGn5ycJdoLDYDE9AcGBTDXJThcd6wuJPIV1iRv59qL
GnSfAEBd22T/3EQEfWEqJXbd2PQmdFjlejLLjaehdVQHgKPWQ81a2hiWLtspgE1y
6x+7nNmzfwKBgQC43LWmqMLiBuVAVjEyo2acCokUZZcCL66ZTvrFMLgF9T16jJWA
mwiuP7EFCulwLbyGfLxMMygmCgRMejOkg8WJ0e/yaS/eRGJeq4LR6GalWqND+9M+
L6T7zNCIgY41N6z/OHoA/PKpP2SlQ+5QWDPt4lVIREY6pEiDKdUaQH5I1QKBgGJ9
/oyVsl6MPmiylG8pnD/BG+os8rL+G8m9QRgc1taAL6zqUwS7Y41uU3W2YUFP0i2V
6wSB0bXl606tyxCGHK7wwZNPE7oJE1CyluAl8DOGOl+/OMVzB1LOomEUXH0qJ23E
oV6wZFdn3IA28BTYOvknxdfHhGhnG9F/oJnwn7sjAoGAW/w5xjFjVIKV1aJh2evw
4vqqh41RjoGq4bRd5F+BsmGHf/iVAn2NyUd4+jDpdwupOHgGvkkJRMNXVWu5zHJd
T/57NO4pEgCTUyLWgxpFjtCAzjHtaaBMnyI05yGMeds5XZeOS61nu/TmAstcZn/9
l8IZn9XwC5Bkkgf451gA57A=
-----END PRIVATE KEY-----`;

type InternApplication = {
  fullName: string;
  phone: string;
  email: string;
  school: string;
  program: string;
  days: string;
  duration: string;
  tools: string;
  learnGoals: string;
  motivation: string;
  portfolio: string;
  extra: string;
};

type StaffApplication = {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  position: string;
  workType: string;
  experience: string;
  agencies: string;
  tools: string;
  strengths: string;
  reason: string;
  fit: string;
  salary: string;
  availability: string;
  portfolio: string;
  extra: string;
};

type CareerApplicationPayload =
  | { kind: 'intern'; data: InternApplication }
  | { kind: 'staff'; data: StaffApplication };

// app/actions.ts içindeki getGlSheets fonksiyonunu tamamen bununla değiştirin:

async function getGlSheets() {
  // Anahtarı temizleme işlemi: Hem ters tırnak hem de \n karakterlerini düzeltir
  const cleanKey = GOOGLE_PRIVATE_KEY
    .replace(/\\n/g, '\n') // Eğer \n yazı olarak geldiyse gerçek satır sonuna çevir
    .replace(/"/g, '');    // Tırnak kalıntısı varsa temizle

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: GOOGLE_CLIENT_EMAIL,
      private_key: cleanKey, 
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const client = await auth.getClient();
  return google.sheets({ version: 'v4', auth: client as any });
}

// 1. YENİ LEAD KAYDETME
// app/actions.ts içindeki saveLeadToSheet fonksiyonunu tamamen bununla değiştirin:

export async function saveLeadToSheet(data: any) {
  console.log("1. Server Action Başladı via:", GOOGLE_CLIENT_EMAIL);
  console.log("2. Gelen Veri:", JSON.stringify(data));

  try {
    const sheets = await getGlSheets();
    console.log("3. Google Sheets Bağlantısı Başarılı");
    
    const rowData = [
      new Date().toLocaleString('tr-TR'),
      data.fullName || 'İsim Yok',
      data.companyName || 'Firma Yok',
      String(data.phone || 'Tel Yok'),
      data.email || 'Email Yok',
      data.business_type || '-',
      data.budget_range || '-',
      data.score?.label || 'Bilinmiyor'
    ];

    console.log("4. Yazılacak Satır:", rowData);

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sayfa1!A:H', // Sayfa adınızın "Sayfa1" olduğundan emin olun
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [rowData],
      },
    });

    console.log("5. Google Yanıtı (Status):", response.status);
    console.log("6. ✅ İŞLEM BAŞARILI!");
    
    return { success: true };

  } catch (error: any) {
    // BURASI ÇOK ÖNEMLİ: Hatayı detaylı görelim
    console.error("🚨 HATA OLUŞTU!");
    console.error("Hata Mesajı:", error.message);
    if (error.response) {
       console.error("Google API Hatası:", JSON.stringify(error.response.data, null, 2));
    }
    return { success: false, error: String(error) };
  }
}

export async function sendCareerApplicationEmail(payload: CareerApplicationPayload) {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT || '587');
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const mailTo = process.env.MAIL_TO || 'info@dousocial.com';
  const mailFrom = process.env.MAIL_FROM || smtpUser || 'no-reply@dousocial.com';

  if (!smtpHost || !smtpUser || !smtpPass) {
    return { success: false, error: 'SMTP ayarları eksik.' };
  }

  const formatValue = (value: string) => (value && value.trim().length > 0 ? value : '-');

  const timestamp = new Date().toLocaleString('tr-TR');
  const subjectPrefix = payload.kind === 'intern' ? 'Stajyer Başvurusu' : 'Çalışan Başvurusu';

  const baseLines = [
    `Başvuru Türü: ${payload.kind === 'intern' ? 'Stajyer' : 'Çalışan'}`,
    `Tarih: ${timestamp}`,
    '',
  ];

  let detailLines: string[] = [];

  if (payload.kind === 'intern') {
    const data = payload.data;
    detailLines = [
      '--- Genel Bilgiler ---',
      `Ad Soyad: ${formatValue(data.fullName)}`,
      `Telefon: ${formatValue(data.phone)}`,
      `E-posta: ${formatValue(data.email)}`,
      `Üniversite / Bölüm: ${formatValue(data.school)}`,
      '',
      '--- Staj Alanı ---',
      `Program: ${formatValue(data.program)}`,
      '',
      '--- Zaman & Devam ---',
      `Haftalık gün: ${formatValue(data.days)}`,
      `Staj türü: ${formatValue(data.duration)}`,
      '',
      '--- Yetkinlik & İlgi ---',
      `Araçlar: ${formatValue(data.tools)}`,
      `Öğrenme hedefi: ${formatValue(data.learnGoals)}`,
      '',
      '--- Motivasyon ---',
      `${formatValue(data.motivation)}`,
      '',
      '--- Ek Bilgiler ---',
      `Portfolyo / Link: ${formatValue(data.portfolio)}`,
      `Ek Not: ${formatValue(data.extra)}`,
    ];
  } else {
    const data = payload.data;
    detailLines = [
      '--- Genel Bilgiler ---',
      `Ad Soyad: ${formatValue(data.fullName)}`,
      `Telefon: ${formatValue(data.phone)}`,
      `E-posta: ${formatValue(data.email)}`,
      `İkamet: ${formatValue(data.city)}`,
      '',
      '--- Pozisyon Bilgisi ---',
      `Pozisyon: ${formatValue(data.position)}`,
      `Çalışma tercihi: ${formatValue(data.workType)}`,
      '',
      '--- Deneyim ---',
      `Deneyim süresi: ${formatValue(data.experience)}`,
      `Ajans/marka geçmişi: ${formatValue(data.agencies)}`,
      '',
      '--- Yetkinlikler ---',
      `Araçlar / platformlar: ${formatValue(data.tools)}`,
      `Güçlü alanlar: ${formatValue(data.strengths)}`,
      '',
      '--- Çalışma & Beklenti ---',
      `Motivasyon: ${formatValue(data.reason)}`,
      `Uygunluk gerekçesi: ${formatValue(data.fit)}`,
      '',
      '--- Ücret & Müsaitlik ---',
      `Ücret beklentisi: ${formatValue(data.salary)}`,
      `Başlayabileceği tarih: ${formatValue(data.availability)}`,
      '',
      '--- Portfolyo & Ek Bilgiler ---',
      `Link: ${formatValue(data.portfolio)}`,
      `Ek Not: ${formatValue(data.extra)}`,
    ];
  }

  const text = [...baseLines, ...detailLines].join('\n');

  const applicantName =
    payload.data.fullName && payload.data.fullName.trim().length > 0
      ? payload.data.fullName.trim()
      : 'Merhaba';
  const applicantRole =
    payload.kind === 'intern'
      ? formatValue((payload as { kind: 'intern'; data: InternApplication }).data.program)
      : formatValue((payload as { kind: 'staff'; data: StaffApplication }).data.position);

  const applicantText = [
    `${applicantName},`,
    '',
    'Başvurunuz başarıyla alınmıştır.',
    'Dou Social ekibi olarak başvurunuzu en kısa sürede inceleyip sizinle iletişime geçeceğiz.',
    '',
    `Başvuru Türü: ${payload.kind === 'intern' ? 'Stajyer' : 'Çalışan'}`,
    `Pozisyon/Program: ${applicantRole}`,
    `Tarih: ${timestamp}`,
    '',
    'Teşekkürler,',
    'Dou Social',
  ].join('\n');

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: mailFrom,
      to: mailTo,
      replyTo: payload.data.email,
      subject: `${subjectPrefix} - ${payload.data.fullName || 'İsimsiz Aday'}`,
      text,
    });

    await transporter.sendMail({
      from: mailFrom,
      to: payload.data.email,
      replyTo: mailTo,
      subject: 'Başvurunuz Alındı - Dou Social',
      text: applicantText,
    });

    return { success: true };
  } catch (error) {
    console.error('E-posta gönderim hatası:', error);
    return { success: false, error: 'E-posta gönderilemedi.' };
  }
}

// 2. ADMIN İSTATİSTİKLERİNİ ÇEKME
export async function getAdminStats() {
  try {
    const sheets = await getGlSheets();
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sayfa1!A:H', 
    });

    const rows = response.data.values || [];
    // İlk satırı (Başlıkları) atlıyoruz
    const dataRows = rows.slice(1); 

    const totalLeads = dataRows.length;
    const hotLeadCount = dataRows.filter(r => r[7] && r[7].includes('Hot')).length;
    
    const recentLeads = dataRows.slice(-5).reverse().map(r => ({
        date: r[0],
        name: r[1],
        company: r[2],
        budget: r[6],
        status: r[7]
    }));

    return { 
      success: true, 
      stats: { totalLeads, hotLeads: hotLeadCount, recentLeads } 
    };
  } catch (error) {
    console.error("❌ Admin Veri Çekme Hatası:", error);
    return { success: false, error: String(error) };
  }
}
