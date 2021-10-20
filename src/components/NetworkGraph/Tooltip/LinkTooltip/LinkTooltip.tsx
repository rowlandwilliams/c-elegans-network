import classNames from "classnames";
import { graphData } from "../../data/graphData";
import { nodeColorScale } from "../../utils/scales";
import { TooltipTriangle } from "../TooltipTriangle/TooltipTriangle";

interface TooltipData {
  mouseCoords: [] | number[];
  data: any;
}

interface Props {
  linkIsHovered: boolean;
  tooltipData: TooltipData;
}

const tooltipYOffset = 20;

const { nodes } = graphData;

export const LinkTooltip = ({ linkIsHovered, tooltipData }: Props) => {
  const getSourceColor = (linkIsHovered: boolean) => {
    return linkIsHovered
      ? nodeColorScale(
          nodes.filter((node) => node.id === tooltipData.data.source.id)[0]
            .nConnections
        )
      : "black";
  };

  const getTargetColor = (linkIsHovered: boolean) => {
    return linkIsHovered
      ? nodeColorScale(
          nodes.filter((node) => node.id === tooltipData.data.target.id)[0]
            .nConnections
        )
      : "black";
  };

  return (
    <div
      className={classNames(
        "absolute transform flex pointer-events-none bg-white p-4 border border-gray-200 shadow-md -translate-x-1/2 -translate-y-full rounded",
        {
          hidden: !linkIsHovered,
        }
      )}
      style={{
        left: tooltipData.mouseCoords[0],
        top: tooltipData.mouseCoords[1] + -tooltipYOffset,
      }}
    >
      <div>
        <div className="flex items-center">
          <div
            className="text-white rounded-full p-2 w-10 h-10 flex justify-center items-center border border-gray-400 font-medium"
            style={{ backgroundColor: getSourceColor(linkIsHovered) }}
          >
            {tooltipData.data?.source.id}
          </div>
          <div className="w-10 h-1 bg-gray-200 mx-1"></div>
          <div
            className="text-white rounded-full p-2 w-10 h-10 flex justify-center items-center border border-gray-400 font-medium"
            style={{ backgroundColor: getTargetColor(linkIsHovered) }}
          >
            {tooltipData.data?.target.id}
          </div>
        </div>
        <div className="text-xs text-center pt-2">
          Weight: {tooltipData.data?.weight}
        </div>
      </div>

      <TooltipTriangle />
    </div>
  );
};
