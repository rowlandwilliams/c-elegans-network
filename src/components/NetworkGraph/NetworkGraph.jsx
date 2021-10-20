import { useEffect } from "react";

import { drawGraph } from "./plot";

const width = window.innerWidth;
const height = window.innerHeight;

export const NetworkGraph = () => {
  useEffect(() => {
    drawGraph(width, height);
  }, []);

  return (
    <svg width={width} height={height} id="network-svg">
      <g id="links"></g>
      <g id="nodes"></g>
    </svg>
  );
};
