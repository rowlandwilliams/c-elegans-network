import { extent } from "d3-array";
import { scaleLinear, scaleSequential } from "d3-scale";
import { interpolateRdPu } from "d3-scale-chromatic";
import { graphData } from "../data/graphData";

const { links, nodes } = graphData;

export const opacityScale = scaleLinear()
  .domain(extent(links.map((link) => link.weight)) as any)
  .range([0.1, 1]);

export const radiusScale = scaleLinear()
  .domain(extent(nodes.map((node) => node.nConnections)) as any)
  .range([2, 20]);

export const linkWidthScale = scaleLinear()
  .domain(extent(links.map((link) => link.weight)) as any)
  .range([1, 8]);

export const nodeColorScale = scaleSequential(interpolateRdPu).domain(
  extent(nodes.map((node) => node.nConnections)) as any
);
