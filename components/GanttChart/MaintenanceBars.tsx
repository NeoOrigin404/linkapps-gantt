import React from "react";
import { parseISO, differenceInMinutes } from "date-fns";
import { Rect } from "react-native-svg";
import { Machine } from "./types";

// This is a placeholder component - you'll need to define the actual maintenance data structure
interface Maintenance {
  id: number;
  machine_id: number;
  start_date: string;
  end_date: string;
  type: string;
  status: string;
}

interface MaintenanceBarsProps {
  machines: Machine[];
  maintenanceEvents: Maintenance[]; // Replace with your actual data type
  chartConfig: {
    start: Date;
    pixelsPerMinute: number;
    totalWidth: number;
  };
  barHeight: number;
  barMargin: number;
  labelWidth: number;
  minBarWidth: number;
  onMaintenancePress: (maintenance: Maintenance) => void;
}

export const MaintenanceBars: React.FC<MaintenanceBarsProps> = ({
  machines,
  maintenanceEvents,
  chartConfig,
  barHeight,
  barMargin,
  labelWidth,
  minBarWidth,
  onMaintenancePress,
}) => {
  // This is a placeholder implementation
  // You'll need to implement the actual rendering based on your maintenance data
  return (
    <>
      {machines.map((machine, machineIndex) => {
        // Calculate the base Y position for this machine
        // Each machine has 3 rows, and we want to place maintenance on the third row
        const baseY = machineIndex * (barHeight + barMargin) * 3;
        const maintenanceY = baseY + (barHeight + barMargin) * 2; // Third row

        // Filter maintenance events for this machine
        const machineMaintenanceEvents = maintenanceEvents.filter(
          (event) => event.machine_id === machine.machine_id
        );

        // Render bars for each maintenance event
        return machineMaintenanceEvents.map((event) => {
          const start = parseISO(event.start_date);
          const end = parseISO(event.end_date);
          const startOffset =
            labelWidth +
            differenceInMinutes(start, chartConfig.start) *
              chartConfig.pixelsPerMinute;

          // Calculate width and ensure minimum width
          let width =
            differenceInMinutes(end, start) * chartConfig.pixelsPerMinute;
          width = Math.max(width, minBarWidth);

          // Get color based on maintenance type/status
          const barColor = getMaintenanceColor(event.type, event.status);

          return (
            <Rect
              key={`maintenance-${event.id}`}
              x={startOffset}
              y={maintenanceY}
              width={width}
              height={barHeight}
              fill={barColor}
              rx={4}
              onPress={() => onMaintenancePress(event)}
            />
          );
        });
      })}
    </>
  );
};

// Helper function to determine color based on maintenance type and status
const getMaintenanceColor = (type: string, status: string) => {
  // Implement your color logic here
  if (type === "Preventive") {
    return "#8BC34A"; // Light Green
  } else if (type === "Corrective") {
    return "#FF5722"; // Deep Orange
  } else {
    return "#9E9E9E"; // Grey
  }
};
