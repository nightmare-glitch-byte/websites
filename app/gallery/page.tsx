import { GalleryGrid } from "@/components/gallery";

export default function GalleryPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <section className="mb-12 text-center">
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#ffb347]">Gallery</div>
        <h1 className="mt-4 text-5xl font-black tracking-[-0.05em] text-white sm:text-6xl">
          AURA in motion.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-200">
          Explore posters, banners, workshop moments, leadership moments, and event snapshots from AURA’s evolving journey.
        </p>
      </section>

      <GalleryGrid />
    </main>
  );
}
