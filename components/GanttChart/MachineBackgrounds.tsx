import React from "react";
import { Rect } from "react-native-svg";
import { Machine } from "./types";

interface MachineBackgroundsProps {
  machines: Machine[];
  chartConfig: {
    totalWidth: number;
  };
  barHeight: number;
  barMargin: number;
}

export const MachineBackgrounds: React.FC<MachineBackgroundsProps> = ({
  machines,
  chartConfig,
  barHeight,
  barMargin,
}) => {
  return (
    <>
      {machines
        .map((machine, index) => {
          const isEvenRow = index % 2 === 0;
          const rowHeight = (barHeight + barMargin) * 3; // Three rows per machine
          const y = index * rowHeight;

          if (isEvenRow) {
            return (
              <Rect
                key={`row-bg-${machine.machine_id}`}
                x={0}
                y={y}
                width={chartConfig.totalWidth}
                height={rowHeight}
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
