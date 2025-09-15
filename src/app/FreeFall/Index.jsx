"use client";

import { View } from "@react-three/drei";
import { useRef } from "react";
import Scene from "./Scene";

function Index() {
  const freeFallRef = useRef(null);

  return (
    <section
      ref={freeFallRef}
      className="relative free-fall px-4 first:pt-10 md:px-6 h-screen"
    >
      <h2 className="sr-only">Elevate your strategy, refine your game.</h2>

      <View className="absolute top-0 left-0 w-screen h-screen">
        <Scene sentence={"Elevate your strategy refine your game"} />
      </View>
    </section>
  );
}

export default Index;
