"use client";
import { useGSAP } from "@gsap/react";
import { View } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";
import Scene from "./Hero/Scene";
import ChessEffects from "@/components/ChessEffects";
import { useStore } from "./hooks/useStore";
import { useMediaQuery } from "./hooks/useMediaQuery";
import Index from "./FreeFall/Index";
import Carousel from "./Carousel/Carousel";
import Footer from "./Footer/Footer";
import InfoSection from "./InfoSection/InfoSection";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function Home() {
  const headingText = useRef(null);
  const subHeadingText = useRef();
  const subHeadingText2 = useRef();
  const compText = useRef();
  const heading2Ref = useRef();

  const heroRef = useRef();
  const heroScene = useRef();

  const insideLineRef = useRef();

  const ready = useStore((state) => state.introLoaded);
  const isDesktop = useMediaQuery("(min-width: 768px)", true);

  useGSAP(
    () => {
      if (!ready && isDesktop) return;

      const headingSplit = SplitText.create(headingText.current, {
        type: "lines",
        //   mask: "lines",
      });

      const subHeadingSplit = SplitText.create(subHeadingText.current, {
        type: "lines",
        mask: "lines",
      });
      const subHeadingSplit2 = SplitText.create(subHeadingText2.current, {
        type: "lines",
        mask: "lines",
      });

      const heading2Text = SplitText.create(heading2Ref.current, {
        type: "chars",
      });

      const compTextSplit = SplitText.create(compText.current, {
        type: "lines",
        mask: "lines",
      });

      const intoTl = gsap.timeline({});
      intoTl
        .set(heroRef.current, { opacity: 1 })
        .from(headingSplit.lines, {
          //   y: 150,
          scale: 2,
          delay: 0.3,
          opacity: 0,
          stagger: 0.4,
          ease: "power1.out",
        })
        .from(subHeadingSplit.lines, {
          y: 30,
          opacity: 0,
        })
        .from(
          subHeadingSplit2.lines,
          {
            y: 30,
            opacity: 0,
          }
          // "<"
        );

      const scrollTl = gsap.timeline(
        {
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom bottom",
            //   markers: true,
            scrub: 1,
          },
        },
        1
      );

      scrollTl
        .fromTo(
          "html",
          { backgroundColor: "#fff5e1" },
          { backgroundColor: "#d6c3a3", overwrite: "auto" }
        )
        .from(heading2Text.chars, {
          y: 45,
          scale: 1.3,
          rotate: -25,
          opacity: 0,
          stagger: 0.05,
          ease: "back.out(3)",
          duration: 0.6,
          delay: 1,
        })
        .from(compTextSplit.lines, {
          y: 30,
          opacity: 0,
          stagger: 0.2,
          ease: "power1.out",
        });

      const innerLineTl = gsap.timeline({ repeat: -1 });

      innerLineTl
        .fromTo(
          insideLineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: "top top",
            duration: 1.1,
            ease: "linear",
          }
        )
        .to(insideLineRef.current, {
          scaleY: 0,
          ease: "linear",
          transformOrigin: "bottom bottom",

          duration: 1.1,
        });
    },

    { dependencies: [ready, isDesktop] }
  );

  return (
    <>
      <section
        ref={heroRef}
        className="relative opacity-0 hero px-4 first:pt-10 md:px-6 "
      >
        {/* <ChessEffects /> */}
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center">
          {/* Hero Section */}
          {isDesktop && (
            <View
              ref={heroScene}
              className="sticky top-0 w-screen h-screen z-50 -mt-[100vh] hidden md:block pointer-events-none"
            >
              <Scene />
            </View>
          )}
          <div className="relative grid h-screen place-items-center">
            <div className="grid auto-rows-min place-items-center text-center">
              <h1
                ref={headingText}
                className="text-7xl font-black uppercase leading-[.8] text-[#2F2F2F] md:text-[9rem] lg:text-[11rem]"
              >
                Think. Move. Win.
              </h1>
              <div
                ref={subHeadingText}
                className="mt-12 uppercase text-5xl font-semibold text-[#4B3621] lg:text-6xl"
              >
                16 pieces. Infinite possibilities.
              </div>
              <div
                ref={subHeadingText2}
                className="text-2xl mb-12 font-normal text-[#4B3621]"
              >
                Elevate your game. Every piece, a work of art — where strategy
                meets elegance.
              </div>

              <div className="absolute bottom-22 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 mt-12">
                <div className="relative h-16 w-[2px] bg-[#FAF9F6]">
                  <div
                    ref={insideLineRef}
                    className="absolute bottom-0 h-full w-full bg-[#333333] origin-top"
                  />
                </div>

                <p className="uppercase text-[#4B3621] font-semibold">
                  Discover More
                </p>
              </div>
            </div>
          </div>

          {/* Side Text + Image */}
          <div className="relative  grid h-screen items-center gap-4 md:grid-cols-2">
            <img
              src="/your-image.png"
              alt="side visual"
              className="w-full md:hidden"
            />
            <div>
              <h2
                ref={heading2Ref}
                className="text-6xl font-black uppercase text-[#2F2F2F] lg:text-8xl"
              >
                <div className="leading-[.95]">The Art</div>
                <div className="leading-[.95]">of Strategy</div>
              </h2>
              <div
                ref={compText}
                className="mt-4 max-w-xl text-xl font-normal text-[#4B3621]"
              >
                From the weight of each piece to the balance of the board. Built
                to inspire players and honor the game. Strategy, elegance, and
                precision crafted into every detail.
              </div>
            </div>
          </div>
        </div>
      </section>

      <Index />

      <Carousel />

      <InfoSection />

      <Footer />
    </>
  );
}
