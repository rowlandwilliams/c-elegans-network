import { useEffect, useMemo, useState } from "react";
import { NodeTooltip,} from "./Tooltip/NodeTooltip/NodeTooltip";
import { throttle } from "lodash";

import { drawGraph } from "./utils/plot";
import { LinkTooltip } from "./Tooltip/LinkTooltip/LinkTooltip";

const width = window.innerWidth;
const height = window.innerHeight;

const initialNodeTooltipState = {
  mouseCoords: [],
  data: null,
};

const initialLinkTooltipState = {
  mouseCoords: [],
  data: null,
};

export const NetworkGraph = () => {
  const [nodeIsHovered, setNodeIsHovered] = useState(false);
  const [nodeTooltipData, setNodeTooltipData] = useState(
    initialNodeTooltipState
  );

  const [linkIsHovered, setLinkIsHovered] = useState(false);
  const [linkTooltipData, setLinkTooltipData] = useState(
    initialLinkTooltipState
  );

  const debounceSetNodeTooltipMouse = useMemo(
    () => throttle(setNodeTooltipData, 10),
    [setNodeTooltipData]
  );

  const debounceSetLinkTooltipMouse = useMemo(
    () => throttle(setLinkTooltipData, 10),
    [setLinkTooltipData]
  );

  useEffect(() => {
    drawGraph(
      width,
      height,
      setNodeIsHovered,
      debounceSetNodeTooltipMouse,
      setLinkIsHovered,
      debounceSetLinkTooltipMouse
    );
  }, [debounceSetNodeTooltipMouse, debounceSetLinkTooltipMouse]);

  return (
    <div className="relative w-full h-screen">
      <svg width={width} height={height} id="network-svg">
        <g id="links"></g>
        <g id="nodes"></g>
      </svg>
      <NodeTooltip
        nodeIsHovered={nodeIsHovered}
        tooltipData={nodeTooltipData}
      />
      <LinkTooltip
        linkIsHovered={linkIsHovered}
        tooltipData={linkTooltipData}
      />
    </div>
  );
};
