"use client";
import FloatingPiece from "@/components/FloatingPiece";
import { Center, Environment, View } from "@react-three/drei";
import gsap from "gsap";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useRef, useState } from "react";

function Carousel() {
  const PIECES = ["queen", "king", "bishop"];
  const pieceRef = useRef();
  const [currentPiece, setCurrentPiece] = useState(0);

  function changePiece(index) {
    if (!pieceRef.current) return;

    const nextIndex = (index + PIECES.length) % PIECES.length;

    const tl = gsap.timeline({});
    tl.to(
      pieceRef.current.rotation,
      {
        y:
          index > currentPiece
            ? `-=${Math.PI * 2 * SPIN_CHANGE}`
            : `+=${Math.PI * 2 * SPIN_CHANGE}`,
        ease: "power2.inOut",
        duration: 1,
      },
      0
    ).to({}, { onStart: () => setCurrentPiece(nextIndex) }, 0.5);
    // setCurrentPiece(nextIndex);
  }

  const SPIN_CHANGE = 2;

  function ArrowButton({ direction }) {
    return (
      <button
        onClick={() =>
          changePiece(
            direction === "left" ? currentPiece - 1 : currentPiece + 1
          )
        }
        className="size-12 rounded-full border-2 border-white bg-white/10 p-3 opacity-85 ring-white md:size-16 lg:size-20"
      >
        {direction === "left" ? (
          <ArrowLeft className="size-12" />
        ) : (
          <ArrowRight className="size-12" />
        )}
        <span className="sr-only">
          {direction === "right" ? "Next Piece" : "Previous Piece"}
        </span>
      </button>
    );
  }

  return (
    <section className="relative py-12 grid h-screen bg-white text-white overflow-hidden justify-center grid-rows-[auto,4fr,auto]">
      <div className="absolute inset-0 pointer-events-none bg-[#333333] opacity-50" />

      <h2 className="relative text-4xl text-center font-bold">
        Choose Your Style
      </h2>

      <div className="flex items-center justify-center gap-4">
        {/* Left */}
        <ArrowButton direction="left" />
        {/* Piece */}
        <View className="h-[75vmin] aspect-square min-h-40">
          <group ref={pieceRef}>
            <Center key={PIECES[currentPiece]} position={[0, 0, 1]}>
              <FloatingPiece
                //   ref={pieceRef}
                //   key={PIECES[currentPiece]}
                piece={PIECES[currentPiece]}
                floatIntensity={0.3}
              />
            </Center>
          </group>

          <Environment
            files={"/hdr/lobby.hdr"}
            // environmentIntensity={0.7}
            // environmentRotation={[-5, 1, 2]}
          />
          <directionalLight intensity={1} position={[0, 1, 1]} />
        </View>
        {/* Right */}
        <ArrowButton direction="right" />
      </div>
    </section>
  );
}

export default Carousel;
