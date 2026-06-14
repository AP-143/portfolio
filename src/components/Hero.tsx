import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import HeroScene from "./HeroScene";
import { site } from "../content";
import { useReducedMotion } from "../lib/useReducedMotion";

export default function Hero() {
  const reduced = useReducedMotion();
  const [show3d, setShow3d] = useState(false);

  useEffect(() => {
    setShow3d(!reduced && window.innerWidth >= 768);
  }, [reduced]);

  return (
    <header className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden">
      {/* living 3D backdrop */}
      <div className="pointer-events-none absolute inset-0">
        {show3d && (
          <Canvas
            dpr={[1, 1.6]}
            camera={{ position: [0, 0, 16], fov: 46, near: 0.1, far: 100 }}
            gl={{ antialias: true, powerPreference: "high-performance" }}
          >
            <Suspense fallback={null}>
              <HeroScene />
            </Suspense>
          </Canvas>
        )}
        <div className="dotgrid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_30%_45%,#000,transparent_75%)]" />
        {/* readability gradients: keep the left text column on near-solid ink */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, #1b1b1d 0%, rgba(27,27,29,0.92) 34%, rgba(27,27,29,0.4) 62%, transparent 88%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-40"
          style={{ background: "linear-gradient(0deg, #1b1b1d, transparent)" }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 md:px-10">
        <p className="eyebrow">{site.eyebrow}</p>
        <h1 className="mt-6 font-serif text-[clamp(46px,9vw,118px)] font-medium leading-[0.98] tracking-tight text-paper">
          {site.nameLead}{" "}
          <span className="serif-italic text-terra">{site.nameAccent}</span>
        </h1>
        <p className="mt-7 max-w-xl text-[clamp(16px,2vw,20px)] leading-relaxed text-paper/75">
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
            className="rounded-full border border-white/15 bg-ink/40 px-6 py-3 text-sm font-medium text-paper backdrop-blur-sm transition-colors hover:border-white/40"
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

      <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
        <span className="klabel">Scroll</span>
        <span className="h-10 w-px overflow-hidden bg-white/20">
          <span className="block h-full w-full animate-[drop_2s_cubic-bezier(.22,.65,.18,1)_infinite] bg-terra" />
        </span>
      </div>

      <style>{`@keyframes drop{0%{transform:translateY(-100%)}60%,100%{transform:translateY(100%)}}`}</style>
    </header>
  );
}
