"use client";

import React from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';

const Contact = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-in zoom-in duration-500">
      <div className="bg-neutral-900/80 p-8 md:p-12 rounded-3xl border border-white/10 backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#800000]/20 rounded-full blur-[100px] -mr-32 -mt-32"></div>
        
        <h2 className="text-3xl font-bold mb-8 text-center">İletişime Geçin</h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
             <div className="flex items-start gap-4">
               <div className="bg-white/10 p-3 rounded-lg"><MapPin className="text-[#800000]" /></div>
               <div>
                 <h4 className="font-bold text-lg">Ofis</h4>
                 <p className="text-neutral-400">Denizli, Türkiye</p>
               </div>
             </div>
             
             <div className="flex items-start gap-4">
               <div className="bg-white/10 p-3 rounded-lg"><Mail className="text-[#800000]" /></div>
               <div>
                 <h4 className="font-bold text-lg">E-Posta</h4>
                 <p className="text-neutral-400">info@dousocial.com</p>
               </div>
             </div>

             <div className="flex items-start gap-4">
               <div className="bg-white/10 p-3 rounded-lg"><Phone className="text-[#800000]" /></div>
               <div>
                 <h4 className="font-bold text-lg">Telefon</h4>
                 <p className="text-neutral-400">+90 542 440 76 72</p>
               </div>
             </div>
          </div>

          <div className="bg-black/40 p-6 rounded-2xl border border-white/5">
             <h3 className="font-bold mb-4 text-neutral-300">Hemen Mesaj Gönder</h3>
             <form className="space-y-4">
                <input type="text" placeholder="Adınız" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-[#800000] outline-none" />
                <input type="email" placeholder="E-Posta" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-[#800000] outline-none" />
                <textarea rows={3} placeholder="Mesajınız" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-[#800000] outline-none"></textarea>
                <button className="w-full bg-[#800000] hover:bg-[#600000] py-3 rounded-lg font-bold text-white transition-colors">Gönder</button>
             </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;