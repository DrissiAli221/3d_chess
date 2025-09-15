"use client";
import { useEffect } from "react";

export default function ChessEffects() {
  // Create a subtle 8x8 grid that covers the viewport
  const createChessPattern = () => {
    const squares = [];
    const squareSize = 8; // 8vh/vw for responsive squares

    for (let row = 0; row < 12; row++) {
      for (let col = 0; col < 16; col++) {
        const isLight = (row + col) % 2 === 0;
        squares.push(
          <div
            key={`${row}-${col}`}
            className={`chess-square aspect-square absolute transition-all duration-1000 ${
              isLight ? "bg-slate-50/30" : "bg-slate-100/20"
            }`}
            style={{
              width: `${squareSize}vw`,
              height: `${squareSize}vw`,
              top: `${row * squareSize}vw`,
              left: `${col * squareSize}vw`,
            }}
          />
        );
      }
    }
    return squares;
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {/* Subtle chess pattern */}
      {createChessPattern()}

      {/* Optional: Very subtle gradient overlay */}
    </div>
  );
}
