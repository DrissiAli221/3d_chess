"use client";

import FloatingPiece from "@/components/FloatingPiece";
import { useGSAP } from "@gsap/react";
import { Environment, OrbitControls } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useStore } from "../hooks/useStore";

gsap.registerPlugin(ScrollTrigger);

function Scene() {
  const piece1Ref = useRef(null);
  const piece2Ref = useRef(null);
  const piece3Ref = useRef(null);
  const piece4Ref = useRef(null);
  const piece5Ref = useRef(null);
  const piece6Ref = useRef(null);

  const piece1GroupRef = useRef(null);
  const piece2GroupRef = useRef(null);

  const groupRef = useRef(null);
  const FLOATING_SPEED = 1.5;

  const isReady = useStore((state) => state.setIntroLoaded);

  useGSAP(() => {
    if (
      !piece1Ref.current ||
      !piece2Ref.current ||
      !piece3Ref.current ||
      !piece4Ref.current ||
      !piece5Ref.current ||
      !piece6Ref.current ||
      !piece1GroupRef.current ||
      !piece2GroupRef.current ||
      !groupRef.current
    )
      return;

    isReady();

    gsap.set(piece1Ref.current.position, { x: -1.5, y: 0, z: 0 });
    gsap.set(piece1Ref.current.rotation, { x: 0, y: 0, z: -0.3 });

    gsap.set(piece2Ref.current.position, { x: 1.5, y: 0, z: 0 });
    gsap.set(piece2Ref.current.rotation, { x: 0, y: 0, z: 0.3 });

    gsap.set(piece3Ref.current.position, { x: 0, y: 5, z: 2 });
    gsap.set(piece4Ref.current.position, { x: 2, y: 4, z: 2 });
    gsap.set(piece5Ref.current.position, { x: 0, y: -5, z: 0 });
    gsap.set(piece6Ref.current.position, { x: 0, y: -3, z: 0.5 });

    const introTl = gsap.timeline({
      defaults: {
        duration: 3,
        ease: "back.out(1)",
      },
    });

    introTl
      .from(piece2GroupRef.current.position, { y: -5, x: 1 }, 0)
      .from(piece2GroupRef.current.rotation, { z: 3 }, 0)

      .from(piece1GroupRef.current.position, { y: 5, x: 1 }, 0)
      .from(piece1GroupRef.current.rotation, { z: 3 }, 0);

    const scrollTl = gsap.timeline({
      defaults: { duration: 2 },
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        // markers: true,
      },
    });

    scrollTl
      // group rotate
      .to(groupRef.current.rotation, { y: Math.PI * 2 })
      // Piece 1 (King)
      .to(piece1Ref.current.position, { x: -0.2, y: 0.7, z: -1.5 }, 0)
      .to(piece1Ref.current.rotation, { z: 0.3 }, 0)
      // Piece 2 (Queen)
      .to(piece2Ref.current.position, { x: 1, y: -0.2, z: -1 }, 0)
      .to(piece2Ref.current.rotation, { z: 0 }, 0)
      // Piece 3 (Pawn)
      .to(piece3Ref.current.position, { x: -0.3, y: -0.5, z: -1 }, 0)
      .to(piece3Ref.current.rotation, { z: -0.1 }, 0)
      // Piece 4 (Rook)
      .to(piece4Ref.current.position, { x: 0, y: -0.3, z: 0.5 }, 0)
      .to(piece4Ref.current.rotation, { z: 0.3 }, 0)
      // Piece 5 (Bishop)
      .to(piece5Ref.current.position, { x: 0.3, y: 0.5, z: -0.5 }, 0)
      .to(piece5Ref.current.rotation, { z: -0.25 }, 0)
      // Piece 5 (Knight)
      .to(piece6Ref.current.position, { x: 1.5, y: 0.5, z: -1.7 }, 0)
      .to(piece6Ref.current.rotation, { z: 0.2, y: 0.5 }, 0)
      // Group translation
      .to(
        groupRef.current.position,
        { x: 1, duration: 3, ease: "sine.inOut" },
        1.3
      );
  });

  return (
    <group ref={groupRef}>
      <group ref={piece1GroupRef}>
        <FloatingPiece
          piece="king"
          ref={piece2Ref}
          floatSpeed={FLOATING_SPEED}
        />
      </group>

      <group ref={piece2GroupRef}>
        <FloatingPiece
          piece="queen"
          ref={piece1Ref}
          floatSpeed={FLOATING_SPEED}
        />
      </group>

      <FloatingPiece piece="pawn" ref={piece3Ref} floatSpeed={FLOATING_SPEED} />
      <FloatingPiece piece="rook" ref={piece4Ref} floatSpeed={FLOATING_SPEED} />
      <FloatingPiece
        piece="bishop"
        ref={piece5Ref}
        floatSpeed={FLOATING_SPEED}
      />
      <FloatingPiece
        piece="knight"
        ref={piece6Ref}
        floatSpeed={FLOATING_SPEED}
      />

      {/* <OrbitControls /> */}
      <Environment files={"/hdr/lobby.hdr"} intensity={1.5} />
    </group>
  );
}

export default Scene;
