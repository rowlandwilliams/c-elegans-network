import {
  select,
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCenter,
  forceCollide,
  drag,
} from "d3";
import { graphData } from "../data/graphData";
import { dragended, dragged, dragstarted, ticked } from "./graph-interactions";
import {
  linkWidthScale,
  nodeColorScale,
  opacityScale,
  radiusScale,
} from "./scales";

const { nodes, links } = graphData;

export const drawGraph = (
  width,
  height,
  setNodeIsHovered,
  debounceSetNodeTooltipMouse,
  setLinkIsHovered,
  debounceSetLinkTooltipMouse
) => {
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
    .attr("stroke-opacity", (d) => opacityScale(d.weight))
    .on("mouseenter", (event, d) => {
      debounceSetLinkTooltipMouse({
        mouseCoords: [event.pageX, event.pageY],
        data: d,
      });
      setLinkIsHovered(true);
      select(event.currentTarget)
        .transition()
        .duration(150)
        .style("stroke", "red");
    })
    .on("mousemove", (event, d) => {
      debounceSetLinkTooltipMouse({
        mouseCoords: [event.pageX, event.pageY],
        data: d,
      });
    })
    .on("mouseleave", (event, d) => {
      setLinkIsHovered(false);
      select(event.currentTarget)
        .transition()
        .duration(150)
        .style("stroke", "grey");
    });

  const drawnNodes = nodesGroup
    .append("g")
    .selectAll("circle")
    .data(nodes)
    .join("circle")
    .attr("r", (d) => radiusScale(d.nConnections))
    .attr("stroke", "grey")
    .attr("fill", (d) => nodeColorScale(d.nConnections))
    .call(
      drag()
        .on("start", (event, d) => dragstarted(event, d, simulation))
        .on("drag", (event, d) => dragged(event, d))
        .on("end", (event, d) => dragended(event, d, simulation))
    )
    .on("mouseenter", (event, d) => {
      debounceSetNodeTooltipMouse({
        mouseCoords: [event.pageX, event.pageY],
        data: d,
      });
      setNodeIsHovered(true);
      select(event.currentTarget)
        .transition()
        .duration(150)
        .style("fill", "white");
    })
    .on("mousemove", (event, d) => {
      debounceSetNodeTooltipMouse({
        mouseCoords: [event.pageX, event.pageY],
        data: d,
      });
    })
    .on("mouseleave", (event, d) => {
      setNodeIsHovered(false);
      select(event.currentTarget)
        .transition()
        .duration(150)
        .style("fill", nodeColorScale(d.nConnections));
    });

  simulation.nodes(nodes).on("tick", () => ticked(drawnLinks, drawnNodes));

  simulation.force("link").links(links);
};
