
"use client";

import React from 'react';

const EightBitPanda: React.FC<{ className?: string }> = ({ className }) => {
  const pixelSize = 10; // Size of each "pixel"
  const pandaWidth = 16 * pixelSize; // 16 pixels wide
  const pandaHeight = 18 * pixelSize; // 18 pixels high

  // Simplified 8-bit panda design
  // Using a simple array of strings, where 'B' is black, 'W' is white, ' ' is transparent
  const pandaArt = [
    "    BBBBBB    ", // Row 0
    "   BBWWWWBB   ", // Row 1
    "  BBWWWWWWBB  ", // Row 2
    " BBWWBBWWBBBB ", // Row 3 (Eyes area)
    "BBWWBBWWWWWWBB", // Row 4
    "BBWWWWWWWWWWBB", // Row 5
    "BBWWBBBBWWWWBB", // Row 6 (Nose/mouth hint)
    "BBWWBBBBWWWWBB", // Row 7
    " BWWBBBBWWBB  ", // Row 8
    " BBBBBBBBBBB  ", // Row 9 (Body start)
    " BBBBBBBBBBB  ",
    "BBBBBBBBBBBBBB",
    "BWWBBBBBBBBWWB", // Arms
    "BWWBBBBBBBBWWB",
    "BWWBBBBBBBBWWB",
    " BBBBBBBBBBBB ",
    "  BBBBBBBBBB  ",
    "   BBBBBBBB   ",
  ];

  return (
    <svg
      width={pandaWidth}
      height={pandaHeight}
      viewBox={`0 0 ${pandaWidth} ${pandaHeight}`}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      shapeRendering="crispEdges" // Ensures sharp pixel edges
    >
      <title>8-bit Panda</title>
      <desc>A pixel art representation of a panda.</desc>
      {/* Background fill (optional, can be transparent) */}
      {/* <rect width="100%" height="100%" fill="hsl(var(--background))" /> */}

      {pandaArt.map((row, y) =>
        row.split('').map((char, x) => {
          let fill = "transparent";
          if (char === 'B') {
            fill = "hsl(var(--foreground))"; // Black pixel using foreground theme color
          } else if (char === 'W') {
            fill = "hsl(var(--background))"; // White pixel using background theme color (for contrast within black areas)
            // If you want a purer white for 'W' against any background:
            // fill = "#FFFFFF"; 
            // However, using theme colors ensures it adapts better to light/dark mode if the panda is on a colored bg.
            // For this panda, since it's mostly black and white, using background for white parts on a foreground 'B' works well.
          }
          
          if (fill !== "transparent") {
            return (
              <rect
                key={`pixel-${y}-${x}`}
                x={x * pixelSize}
                y={y * pixelSize}
                width={pixelSize}
                height={pixelSize}
                fill={fill}
              />
            );
          }
          return null;
        })
      )}
    </svg>
  );
};

export default EightBitPanda;
