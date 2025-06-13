import React from "react";
import { Rect } from "react-native-svg";
import { WorkOrder } from "./types";

interface WorkOrderBackgroundsProps {
  workOrders: WorkOrder[];
  chartConfig: {
    totalWidth: number;
  };
  barHeight: number;
  barMargin: number;
}

export const WorkOrderBackgrounds: React.FC<WorkOrderBackgroundsProps> = ({
  workOrders,
  chartConfig,
  barHeight,
  barMargin,
}) => {
  return (
    <>
      {workOrders
        .map((_, index) => {
          if (index % 2 === 0) {
            return (
              <Rect
                key={`row-bg-${index}`}
                x={0}
                y={index * (barHeight + barMargin)}
                width={chartConfig.totalWidth}
                height={barHeight + barMargin}
                fill="#f9f9f9"
              />
            );
          }
          return null;
        })
        .filter(Boolean)}
    </>
  );
};
