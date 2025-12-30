'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function Cube() {
  const meshRef = useRef<any>();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta;
      meshRef.current.rotation.y += delta;
    }
  });

  return (
    <mesh ref={meshRef} scale={2}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#00F0FF" wireframe />
    </mesh>
  );
}