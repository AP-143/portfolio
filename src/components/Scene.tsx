import { useLayoutEffect, useMemo, useRef, type MutableRefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Grid, Line } from "@react-three/drei";
import * as THREE from "three";

const TERRA = "#C4502D";

type Props = {
  progress: MutableRefObject<number>;
  reduced: boolean;
};

const smoothstep = (t: number) => t * t * (3 - 2 * t);

// Camera waypoints — one per identity "beat". The camera pans + zooms through
// the procedural network as scroll progress moves 0 → 1.
const WAYPOINTS: { pos: THREE.Vector3; target: THREE.Vector3 }[] = [
  { pos: new THREE.Vector3(8.5, 5.5, 11), target: new THREE.Vector3(0, 0.6, 0) },
  { pos: new THREE.Vector3(-7, 3.4, 8), target: new THREE.Vector3(-0.5, 1, -1.5) },
  { pos: new THREE.Vector3(4.5, 2.4, 6), target: new THREE.Vector3(0.5, 1.2, -2.2) },
  { pos: new THREE.Vector3(0, 1.9, 4.6), target: new THREE.Vector3(0, 1.25, -1) },
];

// Build a clean isometric grid of "modules" with varied heights.
function useNodes() {
  return useMemo(() => {
    const nodes: { x: number; z: number; h: number; accent: boolean }[] = [];
    const span = 5;
    let seed = 7;
    const rnd = () => {
      seed = (seed * 1103515245 + 12345) & 0x7fffffff;
      return seed / 0x7fffffff;
    };
    for (let x = -span; x <= span; x++) {
      for (let z = -span; z <= span; z++) {
        const r = Math.hypot(x, z);
        if (r < 1.2 || r > span + 0.5) continue; // clear the centre for the focal object
        if (rnd() > 0.62) continue; // sparse
        const h = 0.4 + rnd() * (r < 3 ? 2.4 : 1.2);
        nodes.push({ x: x * 0.92, z: z * 0.92, h, accent: rnd() > 0.86 });
      }
    }
    return nodes;
  }, []);
}

export default function Scene({ progress, reduced }: Props) {
  const { camera } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const terraLightRef = useRef<THREE.PointLight>(null);

  const nodes = useNodes();
  const baseNodes = useMemo(() => nodes.filter((n) => !n.accent), [nodes]);
  const accentNodes = useMemo(() => nodes.filter((n) => n.accent), [nodes]);

  const baseRef = useRef<THREE.InstancedMesh>(null);
  const accentRef = useRef<THREE.InstancedMesh>(null);

  // Light-path lines connecting accent modules to the centre.
  const linePaths = useMemo(
    () =>
      accentNodes.map((n) => [
        [n.x, n.h, n.z],
        [n.x * 0.4, 1.2, n.z * 0.4],
        [0, 1.2, 0],
      ] as [number, number, number][]),
    [accentNodes]
  );

  // An upward "equity curve" off to one side.
  const equityCurve = useMemo<[number, number, number][]>(() => {
    const pts: [number, number, number][] = [];
    let y = 0;
    for (let i = 0; i <= 40; i++) {
      const t = i / 40;
      y += (Math.sin(i * 1.7) * 0.12 + 0.16) * (0.6 + t);
      pts.push([-4.6 + t * 5.2, 0.3 + y * 0.5, -4.4]);
    }
    return pts;
  }, []);

  // Particle field (probabilistic cloud).
  const particles = useMemo(() => {
    const N = 700;
    const arr = new Float32Array(N * 3);
    let s = 99;
    const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
    for (let i = 0; i < N; i++) {
      arr[i * 3] = (rnd() - 0.5) * 22;
      arr[i * 3 + 1] = rnd() * 8;
      arr[i * 3 + 2] = (rnd() - 0.5) * 22;
    }
    return arr;
  }, []);

  // Place instanced modules once.
  useLayoutEffect(() => {
    const dummy = new THREE.Object3D();
    if (baseRef.current) {
      baseNodes.forEach((n, i) => {
        dummy.position.set(n.x, n.h / 2, n.z);
        dummy.scale.set(0.34, n.h, 0.34);
        dummy.updateMatrix();
        baseRef.current!.setMatrixAt(i, dummy.matrix);
      });
      baseRef.current.instanceMatrix.needsUpdate = true;
    }
    if (accentRef.current) {
      accentNodes.forEach((n, i) => {
        dummy.position.set(n.x, n.h / 2, n.z);
        dummy.scale.set(0.36, n.h, 0.36);
        dummy.updateMatrix();
        accentRef.current!.setMatrixAt(i, dummy.matrix);
      });
      accentRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [baseNodes, accentNodes]);

  // Reusable vectors (no per-frame allocations).
  const pos = useRef(new THREE.Vector3()).current;
  const tgt = useRef(new THREE.Vector3()).current;

  useFrame((state, delta) => {
    const p = THREE.MathUtils.clamp(progress.current, 0, 1);

    // ---- camera along the waypoints ----
    const seg = p * (WAYPOINTS.length - 1);
    const i = Math.min(WAYPOINTS.length - 2, Math.floor(seg));
    const f = smoothstep(seg - i);
    pos.lerpVectors(WAYPOINTS[i].pos, WAYPOINTS[i + 1].pos, f);
    tgt.lerpVectors(WAYPOINTS[i].target, WAYPOINTS[i + 1].target, f);

    if (reduced) {
      camera.position.copy(pos);
    } else {
      // gentle parallax breathing
      const t = state.clock.elapsedTime;
      pos.x += Math.sin(t * 0.25) * 0.15;
      pos.y += Math.sin(t * 0.2) * 0.08;
      camera.position.lerp(pos, 0.12);
    }
    camera.lookAt(tgt);

    // ---- focal core: rotate + pulse with progress ----
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.25;
      coreRef.current.rotation.x += delta * 0.12;
      const s = 0.6 + p * 0.5;
      coreRef.current.scale.setScalar(s);
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.4;
      ringRef.current.rotation.x = Math.PI / 2.4;
    }
    if (terraLightRef.current) {
      terraLightRef.current.intensity = 4 + p * 10;
    }
    if (particlesRef.current && !reduced) {
      particlesRef.current.rotation.y += delta * 0.02;
    }
    if (groupRef.current && !reduced) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.04;
    }
  });

  return (
    <>
      <color attach="background" args={["#1b1b1d"]} />
      <fog attach="fog" args={["#1b1b1d", 10, 30]} />

      <ambientLight intensity={0.55} />
      <directionalLight position={[6, 10, 4]} intensity={1.1} color="#cfd2dc" />
      <pointLight ref={terraLightRef} position={[0, 2.4, 0]} color={TERRA} intensity={6} distance={18} />

      <group ref={groupRef}>
        <Grid
          args={[44, 44]}
          position={[0, -0.01, 0]}
          cellSize={0.92}
          cellThickness={0.6}
          cellColor="#2b2b31"
          sectionSize={3.68}
          sectionThickness={1}
          sectionColor="#4a2f26"
          fadeDistance={28}
          fadeStrength={1.4}
          infiniteGrid
          followCamera={false}
        />

        {/* base modules */}
        <instancedMesh ref={baseRef} args={[undefined, undefined, baseNodes.length]} castShadow>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#34343b" roughness={0.7} metalness={0.15} />
        </instancedMesh>

        {/* accent modules */}
        <instancedMesh ref={accentRef} args={[undefined, undefined, accentNodes.length]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={TERRA} emissive={TERRA} emissiveIntensity={0.6} roughness={0.4} />
        </instancedMesh>

        {/* light paths */}
        {linePaths.map((pts, idx) => (
          <Line
            key={idx}
            points={pts}
            color={TERRA}
            lineWidth={1.1}
            transparent
            opacity={0.5}
          />
        ))}

        {/* equity curve */}
        <Line points={equityCurve} color={TERRA} lineWidth={2} transparent opacity={0.85} />

        {/* focal "system" core */}
        <mesh ref={coreRef} position={[0, 1.25, 0]}>
          <icosahedronGeometry args={[0.9, 1]} />
          <meshStandardMaterial
            color="#ECECEC"
            emissive={TERRA}
            emissiveIntensity={0.35}
            wireframe
          />
        </mesh>
        <mesh ref={ringRef} position={[0, 1.25, 0]}>
          <torusGeometry args={[1.5, 0.012, 8, 90]} />
          <meshBasicMaterial color={TERRA} transparent opacity={0.6} />
        </mesh>

        {/* probabilistic particle field */}
        <points ref={particlesRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[particles, 3]} />
          </bufferGeometry>
          <pointsMaterial
            size={0.035}
            color="#9a9aa2"
            transparent
            opacity={0.55}
            sizeAttenuation
            depthWrite={false}
          />
        </points>
      </group>
    </>
  );
}
