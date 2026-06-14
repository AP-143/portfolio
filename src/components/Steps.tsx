import { steps } from "../content";

/** Step text (01–04) synced to the active scroll segment. */
export default function Steps({ active }: { active: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-end md:items-center">
      <div className="mx-auto w-full max-w-6xl px-6 pb-24 md:px-10 md:pb-0">
        <div className="max-w-xl">
          <p className="eyebrow mb-5">Four things I’d bring to the Academy</p>
          {/* progress segments */}
          <div className="mb-7 flex gap-2">
            {steps.map((_, i) => (
              <span
                key={i}
                className="h-[3px] flex-1 rounded-full transition-colors duration-500"
                style={{
                  background:
                    i <= active ? "#C4502D" : "rgba(255,255,255,0.14)",
                }}
              />
            ))}
          </div>

          <div className="relative">
            {steps.map((s, i) => {
              const on = i === active;
              return (
                <div
                  key={s.no}
                  className="transition-all duration-700"
                  style={{
                    position: i === 0 ? "relative" : "absolute",
                    inset: i === 0 ? undefined : 0,
                    opacity: on ? 1 : 0,
                    transform: on
                      ? "translateY(0)"
                      : `translateY(${i < active ? -24 : 24}px)`,
                  }}
                  aria-hidden={!on}
                >
                  <div className="mb-3 flex items-baseline gap-4">
                    <span className="font-serif text-2xl font-medium text-terra">
                      {s.no}
                    </span>
                    <span className="klabel">Beat {s.no} / 04</span>
                  </div>
                  <h2 className="font-serif text-4xl font-medium leading-[1.05] text-paper md:text-6xl">
                    {s.title}
                  </h2>
                  <p className="mt-5 max-w-md text-[15px] leading-relaxed text-paper/70 md:text-base">
                    {s.body}
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-terra/40 bg-terra/10 px-4 py-2">
                    <span className="text-terra">↳</span>
                    <span className="text-[13px] font-medium text-paper/90">{s.proof}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
