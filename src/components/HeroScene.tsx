import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const TERRA = "#C4502D";

/**
 * Hero backdrop — a slowly rotating 3D constellation/network of glowing nodes
 * connected by faint terracotta lines. Deliberately different from the
 * architectural "city" used in the pinned beats scene.
 */
export default function HeroScene() {
  const group = useRef<THREE.Group>(null);

  const { nodePositions, linePositions, accentPositions, count } = useMemo(() => {
    const N = 140;
    const nodes: THREE.Vector3[] = [];
    let s = 13;
    const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
    for (let i = 0; i < N; i++) {
      nodes.push(
        new THREE.Vector3((rnd() - 0.5) * 19, (rnd() - 0.5) * 11, (rnd() - 0.5) * 16)
      );
    }
    const nodePositions = new Float32Array(N * 3);
    nodes.forEach((n, i) => {
      nodePositions[i * 3] = n.x;
      nodePositions[i * 3 + 1] = n.y;
      nodePositions[i * 3 + 2] = n.z;
    });

    // connect nearby nodes -> constellation web
    const segs: number[] = [];
    const TH = 3.3;
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        if (nodes[i].distanceTo(nodes[j]) < TH) {
          segs.push(nodes[i].x, nodes[i].y, nodes[i].z, nodes[j].x, nodes[j].y, nodes[j].z);
        }
      }
    }
    const linePositions = new Float32Array(segs);

    const acc: number[] = [];
    for (let i = 0; i < N; i += 9) acc.push(nodes[i].x, nodes[i].y, nodes[i].z);
    const accentPositions = new Float32Array(acc);

    return { nodePositions, linePositions, accentPositions, count: N };
  }, []);

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.04;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  return (
    <>
      <color attach="background" args={["#1b1b1d"]} />
      <fog attach="fog" args={["#1b1b1d", 11, 30]} />
      <group ref={group}>
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
          </bufferGeometry>
          <lineBasicMaterial color={TERRA} transparent opacity={0.3} depthWrite={false} />
        </lineSegments>

        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
          </bufferGeometry>
          <pointsMaterial
            color="#d2d2d8"
            size={0.07}
            sizeAttenuation
            transparent
            opacity={0.8}
            depthWrite={false}
          />
        </points>

        <points key={count}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[accentPositions, 3]} />
          </bufferGeometry>
          <pointsMaterial
            color={TERRA}
            size={0.2}
            sizeAttenuation
            transparent
            opacity={0.95}
            depthWrite={false}
          />
        </points>
      </group>
    </>
  );
}
