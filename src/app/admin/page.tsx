'use client';

import { useState, useEffect } from 'react';
import { getAdminStats } from '../actions'; // Server Action'ı import ediyoruz
import { Lock, LayoutDashboard, Loader2 } from 'lucide-react';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  // Basit (Hardcoded) Şifre Kontrolü
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'dou123') { // Şifrenizi buraya yazın
      setIsAuthenticated(true);
      fetchStats();
    } else {
      alert('Hatalı şifre!');
    }
  };

  const fetchStats = async () => {
    setLoading(true);
    const res = await getAdminStats();
    if (res.success) {
      setData(res.stats);
    } else {
      alert('Veri çekilemedi: ' + res.error);
    }
    setLoading(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-neutral-900 p-8 rounded-xl border border-white/10 w-full max-w-sm">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-[#800000]/20 rounded-full text-[#800000]">
              <Lock size={32} />
            </div>
          </div>
          <h2 className="text-xl font-bold text-white text-center mb-6">Yönetici Girişi</h2>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white mb-4 focus:border-[#800000] outline-none"
            placeholder="Şifre"
          />
          <button type="submit" className="w-full bg-[#800000] text-white font-bold py-3 rounded-lg hover:bg-[#600000]">
            Giriş Yap
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="text-[#800000]" size={32} />
            <h1 className="text-2xl font-bold">Dou Dashboard</h1>
          </div>
          <button onClick={fetchStats} className="p-2 bg-neutral-800 rounded hover:bg-neutral-700">
            {loading ? <Loader2 className="animate-spin" /> : 'Yenile'}
          </button>
        </div>

        {data ? (
          <div className="grid gap-6">
            {/* Kartlar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-neutral-900 p-6 rounded-xl border border-white/10">
                <div className="text-neutral-400 text-sm">Toplam Lead</div>
                <div className="text-4xl font-bold mt-2">{data.totalLeads}</div>
              </div>
              <div className="bg-neutral-900 p-6 rounded-xl border border-white/10">
                <div className="text-neutral-400 text-sm">Sıcak Müşteri (Hot)</div>
                <div className="text-4xl font-bold mt-2 text-green-500">{data.hotLeads}</div>
              </div>
            </div>

            {/* Tablo */}
            <div className="bg-neutral-900 rounded-xl border border-white/10 overflow-hidden">
              <div className="p-6 border-b border-white/10 font-bold">Son Gelen Talepler</div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-neutral-400">
                  <thead className="bg-black/40 text-neutral-200 uppercase font-bold text-xs">
                    <tr>
                      <th className="p-4">Tarih</th>
                      <th className="p-4">Ad Soyad</th>
                      <th className="p-4">Firma</th>
                      <th className="p-4">Bütçe</th>
                      <th className="p-4">Durum</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.recentLeads.map((lead: any, i: number) => (
                      <tr key={i} className="border-b border-white/5 hover:bg-white/5">
                        <td className="p-4">{lead.date}</td>
                        <td className="p-4 text-white font-medium">{lead.name}</td>
                        <td className="p-4">{lead.company}</td>
                        <td className="p-4">{lead.budget}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded text-xs border ${lead.status.includes('Hot') ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'}`}>
                            {lead.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">Veriler yükleniyor...</div>
        )}
      </div>
    </div>
  );
}