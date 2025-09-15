"use client";
import FloatingPiece from "@/components/FloatingPiece";
import {
  Cloud,
  Clouds,
  Environment,
  OrbitControls,
  Text,
} from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function ThreeText({ sentence, color = "white" }) {
  const words = sentence.toUpperCase().split(" ");
  const isDesktop = useMediaQuery("(min-width: 950px)", true);
  const material = new THREE.MeshLambertMaterial();

  return (
    <>
      {words.map((word, index) => (
        <Text
          key={index}
          scale={isDesktop ? 1.2 : 0.5}
          color={color}
          material={material}
          font="/fonts/array/Array-Regular.woff"
          fontWeight={900}
          anchorX={"center"}
          anchorY={"middle"}
          characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ!,"
        >
          {word}
        </Text>
      ))}
    </>
  );
}

function Scene({ sentence }) {
  const groupRef = useRef(null);
  const pieceRef = useRef(null);
  const cloud1Ref = useRef(null);
  const cloud2Ref = useRef(null);
  const cloudGroupRef = useRef(null);
  const wordsRef = useRef(null);

  const ANGLE = 75 * (Math.PI / 180); // Convert degrees to radians

  const getXPosition = (distance) => distance * Math.cos(ANGLE);
  const getYPosition = (distance) => distance * Math.sin(ANGLE);

  const getXYPosition = (distance) => {
    return { x: getXPosition(distance), y: getYPosition(-1 * distance) };
  };

  useGSAP(() => {
    if (
      !cloud1Ref.current ||
      !cloud2Ref.current ||
      !cloudGroupRef.current ||
      !wordsRef.current ||
      !pieceRef
    )
      return;

    gsap.set(cloudGroupRef.current.position, { z: 10 });
    gsap.set(pieceRef.current.position, { ...getXYPosition(-4) });

    gsap.set(
      wordsRef.current.children.map((word) => word.position),
      { ...getXYPosition(7), z: 2 }
    );

    gsap.to(pieceRef.current.rotation, {
      y: Math.PI * 2,
      duration: 1.7,
      repeat: -1,
      ease: "none",
    });

    //Infinite cloud
    const DISTANCE = 15;
    const DURATION = 6;

    gsap.set([cloud1Ref.current.position, cloud2Ref.current.position], {
      ...getXYPosition(DISTANCE),
    });

    gsap.to(cloud1Ref.current.position, {
      x: `+=${getXPosition(DISTANCE * -2)}`,
      y: `+=${getYPosition(DISTANCE * 2)}`,
      ease: "none",
      repeat: -1,
      duration: DURATION,
    });

    gsap.to(cloud2Ref.current.position, {
      x: `+=${getXPosition(DISTANCE * -2)}`,
      y: `+=${getYPosition(DISTANCE * 2)}`,
      ease: "none",
      delay: DURATION / 2,
      repeat: -1,
      duration: DURATION,
    });

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".free-fall",
        pin: true,
        start: "top top",
        end: "+=1900",
        // markers: true,
        scrub: 1.5,
      },
    });

    scrollTl
      .to(
        "html",
        { backgroundColor: "#c0f0f5", overwrite: "auto", duration: 0.1 },
        0
      )
      .to(
        cloudGroupRef.current.position,
        {
          z: 0,
          duration: 0.3,
        },
        0
      )
      .to(
        pieceRef.current.position,
        {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: "back.out(1.7)",
        },
        "-=0.25"
      )
      .to(
        wordsRef.current.children.map((word) => word.position),
        {
          keyframes: [
            { x: 0, y: 0, z: -2 },
            { ...getXYPosition(-7), z: -7 },
          ],
          stagger: 0.5,
        },
        0
      )
      .to(pieceRef.current.position, {
        ...getXYPosition(4),
        duration: 0.5,
        ease: "back.in(1.7)",
      })
      .to(cloudGroupRef.current.position, {
        z: 13,
        duration: 0.7,
      })
      .to("html", { backgroundColor: "#EDE6D6", overwrite: "auto" }, "-=.1");
  });

  return (
    <group ref={groupRef}>
      <group rotation={[0, 0, 0.5]}>
        <FloatingPiece
          ref={pieceRef}
          rotationIntensity={0.7}
          floatIntensity={3}
          speed={3}
          piece="queen"
        >
          <pointLight intensity={30} color={"skyblue"} />
        </FloatingPiece>
      </group>
      <Clouds ref={cloudGroupRef}>
        <Cloud ref={cloud1Ref} bounds={[10, 10, 2]} />
        <Cloud ref={cloud2Ref} bounds={[10, 10, 2]} />
      </Clouds>
      <group ref={wordsRef}>
        {sentence && <ThreeText sentence={sentence} color="#2F2F2F" />}
      </group>
      {/* <OrbitControls /> */}
      <ambientLight intensity={6} color={"#6ca0dc"} />
      <Environment files={"/hdr/sky.hdr"} intensity={0.5} />
    </group>
  );
}

export default Scene;
