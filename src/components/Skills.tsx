import { about, skills } from "../content";

export default function Skills() {
  return (
    <section id="about" className="bg-ink px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="reveal mb-4 flex items-baseline gap-4">
          <span className="text-[13px] font-semibold text-terra">00</span>
          <span className="klabel">Who I am</span>
        </div>

        <div className="grid gap-10 md:grid-cols-2 md:gap-20">
          <h2 className="reveal max-w-[14ch] font-serif text-[clamp(26px,3.6vw,44px)] font-medium leading-[1.15] tracking-tight text-paper">
            {about.statementLead}{" "}
            <span className="serif-italic text-terra">{about.statementAccent}</span>
          </h2>

          <div className="reveal">
            {about.paragraphs.map((para, i) => (
              <p key={i} className="mb-5 leading-relaxed text-paper/75 last:mb-0">
                {para}
              </p>
            ))}

            <div className="mt-9 flex flex-wrap gap-2.5">
              {skills.strengths.map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-terra px-4 py-2 text-[12.5px] font-medium text-white"
                >
                  {s}
                </span>
              ))}
              {skills.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/12 px-4 py-2 text-[12.5px] font-medium text-paper transition-transform duration-200 hover:-translate-y-0.5"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-10 border-l-2 border-terra bg-ink2 px-5 py-4 text-[14px] leading-relaxed text-muted">
              {about.note}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
