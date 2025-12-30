'use client';

import { useRef, useMemo, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
// @ts-ignore
import * as random from 'maath/random/dist/maath-random.esm';

export default function StarField(props: any) {
  const ref = useRef<any>();
  const sphereRef = useRef<any>(); // Debug sphere
  const { viewport, camera } = useThree(); // Get exact screen world dimensions

  const count = 4000;
  
  // 1. Generate Data
  const [positions, original] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const original = new Float32Array(count * 3);
    
    // Spread particles across the WHOLE screen width, not just a small sphere
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * viewport.width * 1.5;
      const y = (Math.random() - 0.5) * viewport.height * 1.5;
      const z = (Math.random() - 0.5) * 2; // Shallow depth
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      original[i * 3] = x;
      original[i * 3 + 1] = y;
      original[i * 3 + 2] = z;
    }
    
    return [positions, original];
  }, [viewport]);

  // 2. Physics Loop
  useFrame((state) => {
    if (!ref.current) return;

    const currentPositions = ref.current.geometry.attributes.position.array;
    
    // Convert Mouse (0..1) to World Units (approximate based on camera depth)
    // We assume the particles are roughly at Z=0
    const mouseX = (state.pointer.x * viewport.width) / 2;
    const mouseY = (state.pointer.y * viewport.height) / 2;

    // Move the debug sphere to mouse pos
    if(sphereRef.current) {
        sphereRef.current.position.set(mouseX, mouseY, 0);
    }

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;

      // Current Pos
      const px = currentPositions[ix];
      const py = currentPositions[iy];

      // "Home" Pos
      const hx = original[ix];
      const hy = original[iy];

      // Calculate Distance to Mouse
      const dx = mouseX - px;
      const dy = mouseY - py;
      // We don't care about dz for the push, only 2D plane
      const distSq = dx * dx + dy * dy;
      const dist = Math.sqrt(distSq);

      // --- THE PHYSICS SETTINGS ---
      const forceRadius = 2.5; // HUGE radius (was 0.5)
      const pushStrength = 4.0; // STRONG push (was 0.05)
      const returnSpeed = 0.03; // SLOW liquid return
      // ----------------------------

      if (dist < forceRadius) {
        // Calculate repulsion angle
        const force = (forceRadius - dist) / forceRadius; // 1.0 at center, 0.0 at edge
        const angle = Math.atan2(dy, dx);

        // Push particle away
        // We use -Math.cos to push AWAY. Use +Math.cos to suck IN (Black hole)
        const pushX = Math.cos(angle) * force * pushStrength;
        const pushY = Math.sin(angle) * force * pushStrength;

        currentPositions[ix] -= pushX;
        currentPositions[iy] -= pushY;
      } else {
        // If not being pushed, float back home
        // Linear Interpolation (Lerp) for smooth movement
        currentPositions[ix] += (hx - px) * returnSpeed;
        currentPositions[iy] += (hy - py) * returnSpeed;
      }
    }

    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group>
      {/* THE STARS */}
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#00F0FF"
          size={0.004} // Bigger stars
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>

      {/* DEBUG SPHERE - Shows you where the code thinks your mouse is */}
      {/* DELETE THIS MESH BELOW ONCE IT WORKS */}
      <mesh ref={sphereRef} position={[0,0,0]}>
         <sphereGeometry args={[0.1, 16, 16]} />
         <meshBasicMaterial color="red" wireframe />
      </mesh>
    </group>
  );
}