import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MeshDistortMaterial, Float, Torus } from '@react-three/drei';

function MouseTracker({ groupRef }) {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y +=
      (mouse.current.x * 0.3 - groupRef.current.rotation.y) * 0.04;
    groupRef.current.rotation.x +=
      (-mouse.current.y * 0.2 - groupRef.current.rotation.x) * 0.04;
  });

  return null;
}

function FloatingMesh() {
  const groupRef = useRef();
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.18;
      meshRef.current.rotation.z = t * 0.07;
    }
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.12;
    }
  });

  return (
    <group ref={groupRef} position={[2.6, 0, 0]}>
      <MouseTracker groupRef={groupRef} />

      {/* Core icosahedron — custom distorted mesh */}
      <Float speed={1.8} rotationIntensity={0.1} floatIntensity={0.2}>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1.1, 1]} />
          <MeshDistortMaterial
            color="#3b82f6"
            roughness={0.1}
            metalness={0.85}
            distort={0.28}
            speed={1.8}
            transparent
            opacity={0.88}
          />
        </mesh>
      </Float>

      {/* Outer orbital ring 1 */}
      <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.12}>
        <Torus args={[1.85, 0.014, 16, 120]} rotation={[Math.PI / 2.5, 0, 0]}>
          <meshBasicMaterial color="#8b5cf6" transparent opacity={0.5} />
        </Torus>
      </Float>

      {/* Outer orbital ring 2 */}
      <Float speed={1.1} rotationIntensity={0.2} floatIntensity={0.1}>
        <Torus args={[2.3, 0.01, 16, 100]} rotation={[Math.PI / 4, Math.PI / 5, 0]}>
          <meshBasicMaterial color="#60a5fa" transparent opacity={0.28} />
        </Torus>
      </Float>

      {/* Soft glow sphere */}
      <mesh position={[0, 0, -0.8]}>
        <sphereGeometry args={[1.5, 24, 24]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.04} />
      </mesh>
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.5], fov: 44 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1.6} color="#3b82f6" />
      <pointLight position={[-4, -3, 3]} intensity={0.7} color="#8b5cf6" />
      <FloatingMesh />
    </Canvas>
  );
}
