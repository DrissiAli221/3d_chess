import CircleText from "@/components/CircleText";
import Logo from "@/components/Logo";
import React from "react";

function Footer() {
  return (
    <section className="min-h-screen w-screen overflow-hidden bg-[#FAF9F6] text-[#333333] ">
      <h2 className="grid w-full gap-[3vw] py-10 text-center font-black uppercase leading-[.7]">
        <div className="text-[30.75vw]">every</div>
        <div className="grid gap-[3vw] text-[34vw] md:flex md:text-[12.62vw]">
          <span className="inline-block max-md:text-[39vw]">move</span>
          <span className="inline-block">a</span>
          <span className="inline-block max-md:text-[40vw]">work</span>
        </div>
        <div className="grid gap-[3vw] text-[32vw] md:flex md:text-[11vw]">
          <div className="text-[27.25vw]">of</div>
          <div className="text-[27.25vw]">art</div>
        </div>
      </h2>

      <footer className="text-[#FAF9F6] bg-[#333333] ">
        <div className="relative mx-auto flex w-full max-w-4xl justify-center px-4">
          <Logo width="200" height="200" />
        <div className="absolute right-25 top-0 size-28 origin-center -translate-y-14 md:size-48 md:-translate-y-28">   
            <CircleText/>
        </div>
        </div>

      </footer>
    </section>
  );
}

export default Footer;
