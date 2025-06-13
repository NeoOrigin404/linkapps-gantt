import React from "react";
import { parseISO, differenceInMinutes } from "date-fns";
import { Rect } from "react-native-svg";
import { Machine, MachineStatusHistory } from "./types";

interface StatusBarsProps {
  machines: Machine[];
  machineStatusHistory: MachineStatusHistory[];
  chartConfig: {
    start: Date;
    pixelsPerMinute: number;
    totalWidth: number;
  };
  barHeight: number;
  barMargin: number;
  labelWidth: number;
  minBarWidth: number;
}

export const StatusBars: React.FC<StatusBarsProps> = ({
  machines,
  machineStatusHistory,
  chartConfig,
  barHeight,
  barMargin,
  labelWidth,
  minBarWidth,
}) => {
  return (
    <>
      {machines.map((machine, machineIndex) => {
        // Calculate the base Y position for this machine
        // Each machine has 3 rows, and we want to place status on the first row
        const baseY = machineIndex * (barHeight + barMargin) * 3;
        const statusY = baseY; // First row

        // Filter status history records for this machine
        const machineHistory = machineStatusHistory.filter(
          (record) => record.machine_id === machine.machine_id
        );

        // If no history records, don't display any bars
        if (machineHistory.length === 0) {
          return null;
        }

        // Render bars for each activity period
        return machineHistory.map((record) => {
          const start = parseISO(record.start_datetime_utc);
          const end = parseISO(record.end_datetime_utc);
          const startOffset =
            labelWidth +
            differenceInMinutes(start, chartConfig.start) *
              chartConfig.pixelsPerMinute;

          // Calculate width and ensure minimum width
          let width =
            differenceInMinutes(end, start) * chartConfig.pixelsPerMinute;
          width = Math.max(width, minBarWidth);

          // Get color based on machine status - use a consistent color for activity
          const barColor = "#4CAF50"; // Green for active periods

          return (
            <Rect
              key={`status-${record.history_id}`}
              x={startOffset}
              y={statusY}
              width={width}
              height={barHeight}
              fill={barColor}
              opacity={0.7} // Semi-transparent
              rx={4}
            />
          );
        });
      })}
    </>
  );
};
