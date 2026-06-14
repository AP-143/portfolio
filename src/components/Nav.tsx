import { useEffect, useState } from "react";

/** Fixed global navigation — keeps identity + links present on every section. */
export default function Nav() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-400 ${
        solid
          ? "bg-ink/70 py-3 backdrop-blur-md [box-shadow:0_1px_0_rgba(255,255,255,0.06)]"
          : "py-6"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 md:px-10">
        <a href="#top" className="font-serif text-lg tracking-wide text-paper">
          Akbar<span className="serif-italic text-terra"> Putra</span>
        </a>
        <div className="hidden gap-8 sm:flex">
          <a href="#work" className="klabel transition-colors hover:text-paper">Work</a>
          <a href="#about" className="klabel transition-colors hover:text-paper">About</a>
          <a
            href="#contact"
            className="rounded-full border border-white/15 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-paper transition-colors hover:border-terra hover:text-terra"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}
