'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Terrain from './Terrain';

export default function Scene() {
  return (
    // CHANGED: Added 'bg-red-600' and 'z-50' to force it to be visible
    <div className="absolute top-0 left-0 w-full h-full bg-red-600 z-0">
      <Canvas 
        camera={{ position: [0, 4, 8], fov: 55 }}
        eventSource={typeof window !== 'undefined' ? document.body : undefined}
      >
        <Suspense fallback={null}>
          <Terrain />
        </Suspense>
      </Canvas>
    </div>
  );
}