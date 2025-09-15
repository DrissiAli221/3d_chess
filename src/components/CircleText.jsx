import clsx from "clsx";

export default function CircleText({
  textColor = "#8B5E3C",
  backgroundColor = "#FAF9F6",
  className,
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 123 123"
      className={clsx("circle-text", className)}
      aria-labelledby="circle-text"
    >
      <title id="circle-text">Play with purpose. Win with elegance</title>
      <path
        fill={backgroundColor}
        d="M122 61.5a61 61 0 11-122 0 61 61 0 01122 0z"
      ></path>
      <svg viewBox="0 0 200 200" className="w-64 h-64">
        <defs>
          <path
            id="circlePath"
            d="M 100, 100
         m -75, 0
         a 75,75 0 1,1 150,0
         a 75,75 0 1,1 -150,0"
          />
        </defs>

        <text
          fill={textColor}
          fontSize="28"
          className="animate-slow origin-center"
        >
          <textPath href="#circlePath" startOffset="0%">
            Play with purpose • Win with elegance •
          </textPath>
        </text>
      </svg>
    </svg>
  );
}
