import classNames from "classnames";
import { nodeColorScale } from "../../utils/scales";
import { TooltipTriangle } from "../TooltipTriangle/TooltipTriangle";

interface TooltipData {
  mouseCoords: [] | number[];
  data: any;
}

interface Props {
  nodeIsHovered: boolean;
  tooltipData: TooltipData;
}

const tooltipYOffset = 20;

export const NodeTooltip = ({ nodeIsHovered, tooltipData }: Props) => {
  const getColor = (nodeIsHovered: boolean) => {
    return nodeIsHovered
      ? nodeColorScale(tooltipData.data.nConnections)
      : "black";
  };

  return (
    <div
      className={classNames(
        "absolute transform flex pointer-events-none bg-white p-4 border border-gray-200 shadow-md -translate-x-1/2 -translate-y-full rounded",
        {
          hidden: !nodeIsHovered,
        }
      )}
      style={{
        left: tooltipData.mouseCoords[0],
        top: tooltipData.mouseCoords[1] + -tooltipYOffset,
      }}
    >
      <div className="flex flex-col items-center">
        <div className="text-xs font-medium">Node</div>
        <div
          className="text-white rounded-full p-2 w-10 h-10 flex justify-center items-center border border-gray-400 font-medium"
          style={{
            backgroundColor: getColor(nodeIsHovered),
          }}
        >
          {tooltipData.data?.id}
        </div>
        <div className="text-sm pt-2">
          {tooltipData.data?.nConnections} connections
        </div>
      </div>

      <TooltipTriangle />
    </div>
  );
};
