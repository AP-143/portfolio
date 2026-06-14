import { closing, contact } from "../content";

export default function Closing() {
  return (
    <section id="contact" className="relative overflow-hidden bg-navy px-6 py-28 md:px-10 md:py-40">
      <div className="dotgrid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_60%_60%_at_75%_15%,#000,transparent_72%)]" />
      <div className="relative mx-auto max-w-6xl">
        <p className="reveal eyebrow" style={{ color: "#E2895C" }}>{closing.eyebrow}</p>
        <h2 className="reveal mt-4 max-w-[16ch] font-serif text-[clamp(36px,6vw,80px)] font-medium leading-[1.04] tracking-tight text-white">
          {closing.titleLead}{" "}
          <span className="serif-italic text-terra2">{closing.titleAccent}</span>{" "}
          {closing.titleTail}
        </h2>

        <div className="reveal mt-8 space-y-5">
          {closing.paragraphs.map((p, i) => (
            <p key={i} className="max-w-3xl text-[clamp(16px,1.9vw,19px)] leading-relaxed text-white/70">
              {p}
            </p>
          ))}
          <p className="serif-italic text-lg text-white/45">{closing.thanks}</p>
        </div>

        <div className="reveal mt-16 grid gap-5 border-t border-white/15 pt-9 sm:grid-cols-3">
          {contact.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="group"
            >
              <div className="klabel" style={{ color: "#8aa0c4" }}>{c.label}</div>
              <div className="mt-2 break-words text-base font-medium text-white transition-colors group-hover:text-terra2">
                {c.value}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
