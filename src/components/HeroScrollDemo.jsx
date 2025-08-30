"use client";
import { ContainerScroll } from "./ui/container-scroll-animation";

function HeroScrollDemo({ titleComponent, children }) {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black">
              Unleash the power of <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                {titleComponent || "Scroll Animations"}
              </span>
            </h1>
          </>
        }>
        {children || (
          <img
            src={`/linear.webp`}
            alt="hero"
            height={720}
            width={1400}
            className="mx-auto rounded-2xl object-cover h-full object-center"
            draggable={false} />
        )}
      </ContainerScroll>
    </div>
  );
}

export default HeroScrollDemo;
