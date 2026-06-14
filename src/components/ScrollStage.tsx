import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import Steps from "./Steps";
import { steps } from "../content";
import { useReducedMotion } from "../lib/useReducedMotion";

/**
 * The pinned 3D stage. A very tall section provides the scroll "runway";
 * the inner viewport is sticky so the canvas stays put while we map scroll
 * position → progress (0→1) that drives the camera and the step text.
 */
export default function ScrollStage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const progress = useRef(0); // smoothed, read per-frame by the Scene
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const el = sectionRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const total = el.offsetHeight - window.innerHeight;
        const target =
          total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
        // lerp toward target for buttery motion (instant if reduced-motion)
        progress.current += (target - progress.current) * (reduced ? 1 : 0.1);

        const idx = Math.min(
          steps.length - 1,
          Math.floor(progress.current * steps.length)
        );
        setActive((a) => (a === idx ? a : Math.max(0, idx)));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: "440vh" }}
      aria-label="What I bring — an interactive overview"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <Canvas
          dpr={[1, 2]}
          gl={{ antialias: true, powerPreference: "high-performance" }}
          camera={{ position: [8.5, 5.5, 11], fov: 42, near: 0.1, far: 100 }}
          frameloop={reduced ? "demand" : "always"}
        >
          <Suspense fallback={null}>
            <Scene progress={progress} reduced={reduced} />
          </Suspense>
        </Canvas>

        {/* HTML overlay */}
        <Steps active={active} />

        <div className="pointer-events-none absolute left-0 right-0 top-7 mx-auto flex max-w-6xl items-center justify-between px-6 md:px-10">
          <span className="klabel">What I bring</span>
          <span className="klabel hidden sm:block">Scroll to explore</span>
        </div>

        {/* subtle vignette so text stays legible over the scene */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 60%, transparent 40%, rgba(27,27,29,0.55) 100%)",
          }}
        />
      </div>
    </section>
  );
}
