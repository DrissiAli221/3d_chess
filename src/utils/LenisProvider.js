"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function LenisProvider({ children }) {
  const lenisRef = useRef();

  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);
    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false, // because you’re syncing with gsap.ticker
        duration: 1.5, // default is 1.2 → bump this up (1.5–2) to slow scroll
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true, // ensures smooth scrolling
        smoothTouch: true, // smooth for touch devices too
        syncTouch: true, // keeps touch scroll synced
      }}
    >
      {children}
    </ReactLenis>
  );
}
