import { Simulation, SimulationNodeDatum } from "d3-force";

export const dragstarted = (
  event: any,
  d: any,
  simulation: Simulation<SimulationNodeDatum, undefined>
) => {
  if (!event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
};

export const dragged = (event: any, d: any) => {
  d.fx = event.x;
  d.fy = event.y;
};

export const dragended = (
  event: any,
  d: any,
  simulation: Simulation<SimulationNodeDatum, undefined>
) => {
  if (!event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
};

export const ticked = (drawnLinks: any, drawnNodes: any) => {
  drawnLinks
    .attr("x1", function (d: any) {
      return d.source.x;
    })
    .attr("y1", function (d: any) {
      return d.source.y;
    })
    .attr("x2", function (d: any) {
      return d.target.x;
    })
    .attr("y2", function (d: any) {
      return d.target.y;
    });

  drawnNodes
    .attr("cx", function (d: any) {
      return d.x;
    })
    .attr("cy", function (d: any) {
      return d.y;
    });
};
