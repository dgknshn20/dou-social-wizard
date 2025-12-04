"use client";

import React from 'react';
import { Image as ImageIcon, BarChart3, Check, Palette, Bot } from 'lucide-react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-in slide-in-from-bottom-10 duration-700">
      <h2 className="text-4xl font-bold mb-8 text-center">Biz Kimiz?</h2>
      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div className="bg-neutral-900/50 p-8 rounded-2xl border border-white/10">
          <p className="text-neutral-300 text-lg leading-relaxed mb-4">
            Dou Social, geleneksel medya anlayışını modern dijital stratejilerle harmanlayan yeni nesil bir kreatif ajanstır.
          </p>
          <p className="text-neutral-300 text-lg leading-relaxed">
            Amacımız sadece içerik üretmek değil, markanızın hikayesini en doğru kitleye, en etkili şekilde anlatmaktır. Yapay zeka teknolojilerini iş süreçlerimize entegre ederek verimliliği ve yaratıcılığı maksimuma çıkarıyoruz.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
           <div className="bg-neutral-800 h-48 rounded-2xl border border-white/5 flex items-center justify-center text-neutral-600"><ImageIcon size={40}/></div>
           <div className="bg-[#800000]/20 h-48 rounded-2xl border border-[#800000]/20 flex items-center justify-center text-[#800000] mt-8"><BarChart3 size={40}/></div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          { icon: <Check className="text-[#800000]" />, title: "Veri Odaklı", desc: "Kararlarımızı hislerle değil, verilerle alıyoruz." },
          { icon: <Palette className="text-[#800000]" />, title: "Kreatif", desc: "Sıradan olana değil, akılda kalıcı olana odaklanıyoruz." },
          { icon: <Bot className="text-[#800000]" />, title: "Teknoloji", desc: "AI araçlarını en verimli şekilde kullanıyoruz." }
        ].map((item, i) => (
          <div key={i} className="p-6 bg-neutral-900/40 border border-white/10 rounded-xl hover:border-[#800000]/50 transition-colors">
            <div className="bg-white/5 w-12 h-12 rounded-full flex items-center justify-center mb-4">{item.icon}</div>
            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
            <p className="text-neutral-400 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;