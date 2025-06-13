import React from "react";
import { parseISO, differenceInMinutes } from "date-fns";
import { Rect, G } from "react-native-svg";
import { WorkOrder } from "./types";
import { WO_TYPE_COLORS } from "./constants";

interface WorkOrderBarsProps {
  workOrders: WorkOrder[];
  chartConfig: {
    start: Date;
    pixelsPerMinute: number;
    totalWidth: number;
  };
  barHeight: number;
  barMargin: number;
  labelWidth: number;
  minBarWidth: number;
  onWorkOrderPress: (workOrder: WorkOrder) => void;
}

export const WorkOrderBars: React.FC<WorkOrderBarsProps> = ({
  workOrders,
  chartConfig,
  barHeight,
  barMargin,
  labelWidth,
  minBarWidth,
  onWorkOrderPress,
}) => {
  return (
    <>
      {workOrders.map((wo, index) => {
        const start = parseISO(wo.wo_plan_utc_date_start);
        const end = parseISO(wo.wo_plan_utc_date_end);
        const startOffset =
          labelWidth +
          differenceInMinutes(start, chartConfig.start) *
            chartConfig.pixelsPerMinute;

        // Calculate width and ensure minimum width
        let width =
          differenceInMinutes(end, start) * chartConfig.pixelsPerMinute;
        width = Math.max(width, minBarWidth);

        const y = index * (barHeight + barMargin);

        // Get color based on work order type
        const barColor =
          WO_TYPE_COLORS[wo.wo_type_id] || WO_TYPE_COLORS.default;

        return (
          <Rect
            key={wo.wo_id}
            x={startOffset}
            y={y}
            width={width}
            height={barHeight}
            fill={barColor}
            rx={4}
            onPress={() => onWorkOrderPress(wo)}
          />
        );
      })}
    </>
  );
};
