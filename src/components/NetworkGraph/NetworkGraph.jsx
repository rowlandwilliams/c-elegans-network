// console.log(Object.keys(data));

import { useEffect } from "react";
import { graphData } from "./data/graphData";
import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCenter,
  select,
  extent,
  scaleLinear,
  drag,
  forceCollide,
} from "d3";
import randomColor from "randomcolor";

const { nodes, links } = graphData;

const finalNodes = nodes.map((node) => ({
  id: node,
  nConnections:
    links.filter((link) => link.source === node).length +
    links.filter((link) => link.target === node).length,
}));

console.log(finalNodes);
const colors = nodes.map((node) => randomColor({ luminosity: "bright" }));

const opacityScale = scaleLinear()
  .domain(extent(links.map((link) => link.weight)))
  .range([0.1, 1]);

const radiusScale = scaleLinear()
  .domain(extent(finalNodes.map((node) => node.nConnections)))
  .range([2, 20]);

const width = window.innerWidth;
const height = window.innerHeight;

export const NetworkGraph = () => {
  const drawGraph = () => {
    const nodesGroup = select("#nodes");
    const linksGroup = select("#links");

    const simulation = forceSimulation(finalNodes)
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
      .attr("stroke-width", (d) => Math.sqrt(d.weight))
      .attr("stroke", "grey")
      .attr("stroke-opacity", (d) => opacityScale(d.weight));

    const drawnNodes = nodesGroup
      .append("g")
      .selectAll("circle")
      .data(finalNodes)
      .join("circle")
      .attr("r", (d) => radiusScale(d.nConnections))
      .attr("stroke", "grey")
      .attr("fill", (d, i) => colors[i])
      .call(
        drag().on("start", dragstarted).on("drag", dragged).on("end", dragended)
      );

    function ticked() {
      drawnLinks
        .attr("x1", function (d) {
          return d.source.x;
        })
        .attr("y1", function (d) {
          return d.source.y;
        })
        .attr("x2", function (d) {
          return d.target.x;
        })
        .attr("y2", function (d) {
          return d.target.y;
        });

      drawnNodes
        .attr("cx", function (d) {
          return d.x;
        })
        .attr("cy", function (d) {
          return d.y;
        });
    }

    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    simulation.nodes(finalNodes).on("tick", ticked);

    simulation.force("link").links(links);
  };

  useEffect(() => {
    drawGraph();
  }, []);

  return (
    <svg width={width} height={height} id="network-svg">
      <g id="links"></g>
      <g id="nodes"></g>
    </svg>
  );
};
