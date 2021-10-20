import classNames from "classnames";


export const TooltipTriangle = () => {
  return (
    <>
      <div
        className={classNames(
          "absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-full w-3 h-3 opacity-10"
        )}
        style={{
          borderLeft: "14px solid transparent",
          borderRight: "14px solid transparent",
          borderTop: "14px solid grey",
        }}
      ></div>
      <div
        className={classNames(
          "absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-full w-3 h-3"
        )}
        style={{
          borderLeft: "12px solid transparent",
          borderRight: "12px solid transparent",
          borderTop: "12px solid white",
        }}
      ></div>
    </>
  );
};
