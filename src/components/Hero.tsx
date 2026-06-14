import { site } from "../content";

export default function Hero() {
  return (
    <header className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden">
      <div className="dotgrid pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000,transparent_75%)]" />

      {/* top bar */}
      <div className="absolute inset-x-0 top-0 z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-7 md:px-10">
        <span className="font-serif text-lg tracking-wide text-paper">
          A<span className="serif-italic text-terra">.</span>JP
        </span>
        <nav className="hidden gap-8 sm:flex">
          <a href="#work" className="klabel transition-colors hover:text-paper">Work</a>
          <a href="#about" className="klabel transition-colors hover:text-paper">About</a>
          <a href="#contact" className="klabel transition-colors hover:text-paper">Contact</a>
        </nav>
      </div>

      <div className="relative z-[1] mx-auto w-full max-w-6xl px-6 md:px-10">
        <p className="eyebrow">{site.eyebrow}</p>
        <h1 className="mt-6 font-serif text-[clamp(46px,9vw,118px)] font-medium leading-[0.98] tracking-tight text-paper">
          {site.nameLead}{" "}
          <span className="serif-italic text-terra">{site.nameAccent}</span>
        </h1>
        <p className="mt-7 max-w-xl text-[clamp(16px,2vw,20px)] leading-relaxed text-paper/70">
          {site.tagline}
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="#work"
            className="rounded-full bg-terra px-6 py-3 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
          >
            View work
          </a>
          <a
            href="#contact"
            className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-paper transition-colors hover:border-white/40"
          >
            Get in touch
          </a>
        </div>

        <div className="mt-16 flex flex-wrap gap-x-12 gap-y-4 border-t border-white/10 pt-7">
          {site.meta.map((m) => (
            <div key={m.label}>
              <div className="klabel">{m.label}</div>
              <div className="mt-1.5 text-sm font-medium text-paper">{m.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
        <span className="klabel">Scroll</span>
        <span className="h-10 w-px overflow-hidden bg-white/20">
          <span className="block h-full w-full animate-[drop_2s_cubic-bezier(.22,.65,.18,1)_infinite] bg-terra" />
        </span>
      </div>

      <style>{`@keyframes drop{0%{transform:translateY(-100%)}60%,100%{transform:translateY(100%)}}`}</style>
    </header>
  );
}
