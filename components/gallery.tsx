"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useMemo, useState } from "react";

type GalleryItem = {
  id: number;
  category: string;
  title: string;
  meta: string;
  accent: string;
};

const galleryItems: GalleryItem[] = [
  { id: 1, category: "AURA", title: "Orientation Program", meta: "AURA • 2025", accent: "from-[#ffb347] via-[#ff7d52] to-[#ff6464]" },
  { id: 2, category: "Events", title: "DSA War Room", meta: "Coding challenge • 70+ students", accent: "from-[#2ec5c4] via-[#1ba6c9] to-[#0f6ca8]" },
  { id: 3, category: "AURATHON", title: "AURATHON 2025", meta: "Ideathon • National finals", accent: "from-[#f7c25b] via-[#ff8a65] to-[#fe5f75]" },
  { id: 4, category: "Workshops", title: "Generative AI Workshop", meta: "LLMs • RAG • Chatbots", accent: "from-[#41d3c7] via-[#2ec5c4] to-[#2277d8]" },
  { id: 5, category: "Banners", title: "Event Banner", meta: "Campaign • Visual identity", accent: "from-[#f6b73c] via-[#f08c45] to-[#80d0ff]" },
  { id: 6, category: "Posters", title: "Poster Campaign", meta: "Campus outreach • 2025", accent: "from-[#2ec5c4] via-[#3ec9cb] to-[#0b182b]" },
  { id: 7, category: "Events", title: "Speaker Session", meta: "AI market trends • 2026", accent: "from-[#ff8a65] via-[#ffb347] to-[#ffd166]" },
  { id: 8, category: "Team", title: "Leadership Team", meta: "AURA board • GTBIT", accent: "from-[#0f6ca8] via-[#1fa6b5] to-[#40d5c5]" },
];

const categories = [
  "All Media",
  "AURA",
  "AURATHON",
  "Workshops",
  "Events",
  "Orientation",
  "Posters",
  "Banners",
  "Team",
];

export function GalleryGrid() {
  const [selectedCategory, setSelectedCategory] = useState("All Media");
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const visibleItems = useMemo(() => {
    if (selectedCategory === "All Media") return galleryItems;
    return galleryItems.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  const openItem = (index: number) => setCurrentIndex(index);
  const closeItem = () => setCurrentIndex(null);

  const move = (direction: 1 | -1) => {
    if (currentIndex === null) return;
    const nextIndex = (currentIndex + direction + visibleItems.length) % visibleItems.length;
    setCurrentIndex(nextIndex);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => {
          const active = category === selectedCategory;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                active
                  ? "border-transparent bg-gradient-to-r from-[#ffb347] to-[#2ec5c4] text-slate-950"
                  : "border-white/10 bg-white/5 text-slate-200 hover:border-white/20 hover:bg-white/8"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {visibleItems.map((item, index) => (
          <motion.button
            key={item.id}
            type="button"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.05 }}
            onClick={() => openItem(index)}
            className="group overflow-hidden rounded-[28px] border border-white/10 bg-white/5 text-left"
          >
            <div className={`relative h-72 bg-gradient-to-br ${item.accent} p-5`}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.15),_transparent_32%)]" />
              <div className="absolute left-4 top-4 rounded-full border border-white/30 bg-slate-950/30 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                {item.category}
              </div>
              <div className="absolute inset-x-6 bottom-6 rounded-2xl border border-white/20 bg-slate-950/30 p-4 backdrop-blur-sm">
                <div className="text-xs font-medium uppercase tracking-[0.18em] text-slate-200">
                  {item.meta}
                </div>
                <div className="mt-2 text-2xl font-black text-white">{item.title}</div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {currentIndex !== null ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-sm"
            onClick={closeItem}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-4xl overflow-hidden rounded-[30px] border border-white/10 bg-[#091b2a]"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-3 text-sm text-slate-200">
                <span>{visibleItems[currentIndex].title}</span>
                <button type="button" onClick={closeItem} className="rounded-full border border-white/10 p-2">
                  <X size={16} />
                </button>
              </div>

              <div className={`relative h-[60vh] bg-gradient-to-br ${visibleItems[currentIndex].accent}`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,.18),_transparent_30%)]" />
                <div className="absolute inset-x-8 bottom-8 rounded-[26px] border border-white/20 bg-slate-950/35 p-5 backdrop-blur-sm">
                  <div className="text-xs uppercase tracking-[0.22em] text-slate-200">
                    {visibleItems[currentIndex].category}
                  </div>
                  <div className="mt-2 text-3xl font-black text-white">{visibleItems[currentIndex].title}</div>
                  <div className="mt-2 text-sm text-slate-200">{visibleItems[currentIndex].meta}</div>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-white/10 px-5 py-3">
                <button
                  type="button"
                  onClick={() => move(-1)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100"
                >
                  <ChevronLeft size={16} /> Prev
                </button>
                <button
                  type="button"
                  onClick={() => move(1)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100"
                >
                  Next <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
