"use client";

import { Center, Float, OrbitControls } from "@react-three/drei";
// import { Model } from "./Pieces";
import { forwardRef } from "react";
import { Model } from "./Model2";

const FloatingPiece = forwardRef((props, ref) => {
  const {
    piece = "king",
    speed = 1.5,
    rotationIntensity = 1,
    floatIntensity = 1,
    floatingRange = [-0.1, 0.1],
    children,
    ...rest
  } = props;

  return (
    <group ref={ref} {...rest}>
      <Float
        speed={speed}
        rotationIntensity={rotationIntensity}
        floatIntensity={floatIntensity}
        floatingRange={floatingRange}
      >
        {children}
        <Center>
          {/* <Model scale={0.2} /> */}
          <Model piece={piece} scale={0.45} />
        </Center>
      </Float>
    </group>
  );
});

FloatingPiece.displayName = "FloatingPiece";

export default FloatingPiece;
