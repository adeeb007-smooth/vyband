'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

export default function Terrain() {
  const ref = useRef<any>();
  
  // 1. GENERATE GRID (100x100 = 10,000 dots)
  const count = 100;
  const { positions, originalColors } = useMemo(() => {
    const positions = new Float32Array(count * count * 3);
    const colors = new Float32Array(count * count * 3);
    
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        const index = (i * count + j) * 3;
        
        // Grid Spacing (0.3 spreads them out nicely)
        const x = (i - count / 2) * 0.3;
        const z = (j - count / 2) * 0.3;
        const y = 0;

        positions[index] = x;
        positions[index + 1] = y;
        positions[index + 2] = z;

        // --- HIGH VISIBILITY COLORS ---
        // Default: Light Grey (Visible on black)
        colors[index] = 0.6;
        colors[index + 1] = 0.6;
        colors[index + 2] = 0.6;
      }
    }
    return { positions, originalColors: colors };
  }, []);

  // 2. ANIMATION LOOP
  useFrame((state) => {
    if (!ref.current) return;

    const positions = ref.current.geometry.attributes.position.array;
    const colors = ref.current.geometry.attributes.color.array;
    const t = state.clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        const index = (i * count + j) * 3;
        const x = positions[index];
        const z = positions[index + 2];

        // Wave Movement
        let y = Math.sin(x * 0.5 + t) * 0.5; // Big wave
        y += Math.sin(z * 2 + t * 2) * 0.2;  // Small ripple
        
        // Mouse Interaction
        // Multiply by 15 to cover the whole screen width
        const mouseX = state.pointer.x * 15; 
        const mouseY = state.pointer.y * -15; // Z depth inverted
        
        const dist = Math.sqrt((x - mouseX) ** 2 + (z - mouseY) ** 2);
        
        // If mouse is close (Distance < 4)
        if (dist < 4) {
            const force = (4 - dist);
            y += force * 0.8; // Lift dot up
            
            // Turn BRIGHT CYAN
            colors[index] = 0;     // R
            colors[index+1] = 1;   // G
            colors[index+2] = 1;   // B
        } else {
            // Fade back to Grey
            // We use lerp for smooth color fading if we wanted, 
            // but for now instant switch is cleaner for performance
            colors[index] = 0.4;
            colors[index+1] = 0.4; 
            colors[index+2] = 0.4; 
        }

        positions[index + 1] = y;
      }
    }
    
    // Update GPU
    ref.current.geometry.attributes.position.needsUpdate = true;
    ref.current.geometry.attributes.color.needsUpdate = true;
  });

  return (
    // Lower it slightly (y = -2) so "NOVA" floats above it
    <group rotation={[0, 0, 0]} position={[0, -2, 0]}> 
      <Points ref={ref} stride={3} frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={positions.length / 3}
            array={originalColors}
            itemSize={3}
          />
        </bufferGeometry>
        {/* BIGGER SIZE = EASIER TO SEE */}
        <PointMaterial
          size={0.06} 
          vertexColors
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}