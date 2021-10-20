import {
  select,
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCenter,
  forceCollide,
  drag,
} from "d3";
import { graphData } from "./data/graphData";
import {
  dragended,
  dragged,
  dragstarted,
  ticked,
} from "./utils/graph-interactions";
import {
  linkWidthScale,
  nodeColorScale,
  opacityScale,
  radiusScale,
} from "./utils/scales";

const { nodes, links } = graphData;

export const drawGraph = (width, height) => {
  const nodesGroup = select("#nodes");
  const linksGroup = select("#links");

  const simulation = forceSimulation(nodes)
    .force(
      "link",

      forceLink(links)
        .id((d) => d.id)
        .distance(width / 8)
    )
    .force("charge", forceManyBody())
    .force("center", forceCenter(width / 2, height / 2))
    .force(
      "collide",
      forceCollide().radius((d) => radiusScale(d.nConnections) + 5)
    );

  const drawnLinks = linksGroup
    .selectAll("line")
    .data(links)
    .join("line")
    .attr("stroke-width", (d) => linkWidthScale(d.weight))
    .attr("stroke", "grey")
    .attr("stroke-opacity", (d) => opacityScale(d.weight));

  const drawnNodes = nodesGroup
    .append("g")
    .selectAll("circle")
    .data(nodes)
    .join("circle")
    .attr("r", (d) => radiusScale(d.nConnections))
    .attr("stroke", "grey")
    .attr("fill", (d) => nodeColorScale(d.nConnections))
    .call(
      drag().on("start", dragstarted).on("drag", dragged).on("end", dragended)
    );

  simulation.nodes(nodes).on("tick", () => ticked(drawnLinks, drawnNodes));

  simulation.force("link").links(links);
};
