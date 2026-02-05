"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const videos = [
  {
    id: "zyOQEfvNS1c",
    title: "Doğru Reklam, Doğru Müşteriyi Getirir! | FitlifeKitchen",
  },
];

export default function CustomerExperienceSlider() {
  const [active, setActive] = useState(0);

  const next = () => setActive((prev) => (prev + 1) % videos.length);
  const prev = () => setActive((prev) => (prev - 1 + videos.length) % videos.length);
  const hasMultiple = videos.length > 1;

  return (
    <div className="relative w-full">
      {/* Video */}
      <div className="aspect-video rounded-2xl overflow-hidden bg-black shadow-inner">
        <iframe
          key={videos[active].id}
          src={`https://www.youtube-nocookie.com/embed/${videos[active].id}`}
          title={videos[active].title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>

      {/* Oklar */}
      {hasMultiple && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 p-2 rounded-full transition"
          >
            <ChevronLeft className="text-white" />
          </button>

          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 p-2 rounded-full transition"
          >
            <ChevronRight className="text-white" />
          </button>
        </>
      )}

      {/* Dotlar */}
      {hasMultiple && (
        <div className="flex justify-center gap-2 mt-4">
          {videos.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-2 w-2 rounded-full transition ${
                active === i ? "bg-[#800000]" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      )}

      {/* Başlık */}
      <p className="text-center text-sm text-white/70 mt-3">
        {videos[active].title}
      </p>
    </div>
  );
}
