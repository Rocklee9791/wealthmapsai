// components/VantaBackground.jsx
'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import FOG from 'vanta/dist/vanta.fog.min';

export default function VantaBackground() {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
    if (!vantaEffect && vantaRef.current) {
      setVantaEffect(
        FOG({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          minHeight: 200.0,
          minWidth: 200.0,
          highlightColor: 0xe0ffff,  // Light Cyan (glow of sunlight on water)
midtoneColor: 0x00ced1,    // Dark Turquoise (clean ocean water)
lowlightColor: 0x4682b4,   // Steel Blue (depth and contrast)
baseColor: 0xf0ffff  ,      // Azure (very light blue background)
    // Light Goldenrod Yellow

          blurFactor: 0.5,
          speed: 1.0,
          zoom: 1.0,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div
  ref={vantaRef}
  style={{
    position: 'fixed',
    width: '100%',
    height: '100%',
    zIndex: 0, // ✅ Puts the Vanta background behind everything
    top: 0,
    left: 0,
    pointerEvents: 'none', // ✅ Prevents interference with clicks
  }}
/>
  );
}
