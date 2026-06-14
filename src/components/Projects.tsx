import { projects, type Project, type ProjectImage } from "../content";

// Prefix public asset paths with Vite's base URL so images resolve correctly
// whether the site is served from the domain root or a /repo/ subpath on Pages.
const asset = (src: string) =>
  import.meta.env.BASE_URL.replace(/\/$/, "") + src;

function Shot({ img }: { img: ProjectImage }) {
  return (
    <figure className="reveal overflow-hidden rounded-xl border border-white/10 bg-ink2">
      {img.src ? (
        <img
          src={asset(img.src)}
          alt={img.caption}
          loading="lazy"
          className="aspect-[16/10] w-full object-cover object-top"
        />
      ) : (
        // TODO: drop the real screenshot in /public/assets and set `src` in content.ts
        <div className="dotgrid flex aspect-[16/10] w-full items-center justify-center bg-ink3">
          <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] tracking-wide text-muted">
            screenshot — TODO
          </span>
        </div>
      )}
      <figcaption className="border-t border-white/10 px-4 py-3 text-[12.5px] text-muted">
        {img.caption}
      </figcaption>
    </figure>
  );
}

function Chips({ items }: { items: string[] }) {
  return (
    <div className="mt-3.5 flex flex-wrap gap-2">
      {items.map((c) => (
        <span key={c} className="chip">{c}</span>
      ))}
    </div>
  );
}

function Repo({ repo }: { repo: string }) {
  return (
    <a
      href={`https://${repo}`}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:border-terra hover:text-terra"
    >
      <svg viewBox="0 0 16 16" className="h-4 w-4 fill-current" aria-hidden>
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 014 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" />
      </svg>
      {repo}
    </a>
  );
}

function FeaturedProject({ p, dark }: { p: Project; dark: boolean }) {
  return (
    <section
      className="border-t border-white/8 px-6 py-24 md:px-10 md:py-32"
      style={{ background: dark ? "#1b1b1d" : "#202024" }}
      id={p.id}
    >
      <div className="mx-auto max-w-6xl">
        <div className="reveal">
          <div className="eyebrow">{p.no} · {p.cap}</div>
          <h3 className="mt-3 font-serif text-[clamp(34px,6vw,76px)] font-medium leading-[1] tracking-tight text-paper">
            {p.title}
          </h3>
          <p className="mt-4 max-w-2xl text-[clamp(16px,2vw,22px)] font-medium text-terra2">
            {p.tagline}
          </p>
          <div className="mt-6 flex flex-wrap gap-x-9 gap-y-3">
            {p.meta.map((m) => (
              <div key={m.label}>
                <div className="klabel">{m.label}</div>
                <div className="mt-1 text-sm font-medium text-paper">{m.value}</div>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-3xl leading-relaxed text-paper/70">{p.body}</p>
        </div>

        {p.stats && (
          <div className="reveal mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {p.stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/10 bg-ink p-6 text-center"
              >
                <div className="font-serif text-[clamp(28px,4vw,42px)] font-semibold leading-none text-terra">
                  {s.num}
                </div>
                <div className="klabel mt-2.5">{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {p.images && p.images.length > 0 && (
          <div
            className={`mt-12 grid gap-4 ${
              p.images.length >= 4
                ? "md:grid-cols-2"
                : p.images.length === 3
                ? "md:grid-cols-3"
                : "md:grid-cols-2"
            }`}
          >
            {p.images.map((img, i) => (
              <Shot key={i} img={img} />
            ))}
          </div>
        )}

        {p.pipeline && (
          <div className="reveal mt-12">
            <div className="flex flex-wrap items-stretch gap-2.5">
              {p.pipeline.map((node, i) => (
                <div key={node.no} className="flex items-stretch gap-2.5">
                  <div className="min-w-[128px] flex-1 rounded-xl border border-white/10 bg-ink p-4">
                    <div className="text-[11px] font-semibold text-terra">{node.no}</div>
                    <div className="klabel mt-2.5">{node.k}</div>
                    <div className="mt-1 text-[15px] font-semibold text-paper">{node.v}</div>
                  </div>
                  {i < p.pipeline!.length - 1 && (
                    <span className="hidden items-center text-faint md:flex">→</span>
                  )}
                </div>
              ))}
            </div>
            {p.pipelineCaption && (
              <p className="mt-5 text-center text-sm italic text-muted">{p.pipelineCaption}</p>
            )}
          </div>
        )}

        {(p.built || p.impact) && (
          <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-16">
            {p.built && (
              <div className="reveal">
                <div className="mb-4 border-b border-white/15 pb-2.5 text-[11px] font-bold uppercase tracking-[0.18em] text-paper">
                  {p.stats ? "My process" : "What I built"}
                </div>
                <ul className="space-y-3.5">
                  {p.built.map((b, i) => (
                    <li key={i} className="relative pl-6 text-[15px] leading-relaxed text-paper/75">
                      <span className="absolute left-0 font-semibold text-terra">→</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {p.impact && (
              <div className="reveal">
                <div className="mb-4 border-b border-white/15 pb-2.5 text-[11px] font-bold uppercase tracking-[0.18em] text-paper">
                  {p.stats ? "What it shows about me" : "Impact & what I learned"}
                </div>
                <div className="space-y-4">
                  {p.impact.map((t, i) => (
                    <p key={i} className="text-[15px] leading-relaxed text-paper/75">{t}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {p.builtWith && (
          <div className="reveal mt-14">
            <div className="mb-3.5 text-[11px] font-bold uppercase tracking-[0.18em] text-paper">
              {p.builtWithLabel ?? "Built with"}
            </div>
            <Chips items={p.builtWith} />
            {p.repo && <Repo repo={p.repo} />}
          </div>
        )}
      </div>
    </section>
  );
}

function EarlierCard({ p }: { p: Project }) {
  return (
    <div className="reveal flex flex-col rounded-2xl border border-white/10 bg-ink2 p-7 transition-transform duration-500 hover:-translate-y-1.5">
      <div className="text-[12px] font-semibold text-terra">{p.no} · {p.cap}</div>
      <h4 className="mt-3 font-serif text-2xl font-medium text-paper">{p.title}</h4>
      <p className="mt-1 text-[12.5px] text-muted">
        {p.meta.map((m) => m.value).join(" · ")}
      </p>
      {p.images?.[0] && (
        <div className="mt-5">
          <Shot img={p.images[0]} />
        </div>
      )}
      <p className="mt-5 text-[13.6px] leading-relaxed text-paper/70">{p.body}</p>
      {p.impact?.map((t, i) => (
        <p key={i} className="mt-2.5 text-[13px] leading-relaxed text-paper/65">{t}</p>
      ))}
      {p.builtWith && (
        <div className="mt-auto pt-5">
          <Chips items={p.builtWith} />
        </div>
      )}
    </div>
  );
}

export default function Projects() {
  const featured = projects.filter((p) => p.kind === "featured");
  const earlier = projects.filter((p) => p.kind === "earlier");

  return (
    <div id="work">
      {/* section intro */}
      <section className="bg-ink2 px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="reveal mb-4 flex items-baseline gap-4">
            <span className="text-[13px] font-semibold text-terra">01–05</span>
            <span className="klabel">Selected work</span>
          </div>
          <h2 className="reveal max-w-3xl font-serif text-[clamp(32px,5.5vw,68px)] font-medium leading-[1.04] tracking-tight text-paper">
            Five projects, built end-to-end to{" "}
            <span className="serif-italic text-terra">solve real problems.</span>
          </h2>
        </div>
      </section>

      {featured.map((p, i) => (
        <FeaturedProject key={p.id} p={p} dark={i % 2 === 0} />
      ))}

      {/* earlier work */}
      <section className="border-t border-white/8 bg-ink2 px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="reveal mb-4 flex items-baseline gap-4">
            <span className="text-[13px] font-semibold text-terra">04–05</span>
            <span className="klabel">Selected earlier work</span>
          </div>
          <h2 className="reveal mb-12 max-w-2xl font-serif text-[clamp(28px,4.6vw,52px)] font-medium leading-[1.06] tracking-tight text-paper">
            Two more projects that built my foundation.
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {earlier.map((p) => (
              <EarlierCard key={p.id} p={p} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
