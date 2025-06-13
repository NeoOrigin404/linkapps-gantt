import React from "react";
import { Line, Text as SvgText, Rect } from "react-native-svg";
import { differenceInMinutes, format } from "date-fns";

interface CurrentTimeIndicatorProps {
  chartConfig: {
    start: Date;
    pixelsPerMinute: number;
    totalWidth: number;
  };
  chartDimensions: {
    contentHeight: number;
  };
  labelWidth: number;
  axisHeight: number;
}

export const CurrentTimeIndicator: React.FC<CurrentTimeIndicatorProps> = ({
  chartConfig,
  chartDimensions,
  labelWidth,
  axisHeight,
}) => {
  const now = new Date();

  // Calculate position based on current time
  const minutesSinceStart = differenceInMinutes(now, chartConfig.start);
  const xPosition =
    labelWidth + minutesSinceStart * chartConfig.pixelsPerMinute;

  // Only show if the current time is within the chart range
  if (xPosition < labelWidth || xPosition > chartConfig.totalWidth) {
    return null;
  }

  // Format the current time for display
  const timeLabel = format(now, "HH:mm");

  return (
    <>
      {/* Background for the time label */}
      <Rect
        x={xPosition - 20}
        y={5}
        width={40}
        height={20}
        fill="#ff5722"
        rx={2}
      />

      {/* Time label */}
      <SvgText
        x={xPosition}
        y={20}
        fill="#ffffff"
        fontSize={11}
        fontWeight="bold"
        textAnchor="middle"
      >
        {timeLabel}
      </SvgText>

      {/* Vertical line */}
      <Line
        x1={xPosition}
        y1={axisHeight}
        x2={xPosition}
        y2={axisHeight + chartDimensions.contentHeight}
        stroke="#ff5722"
        strokeWidth={2}
        strokeDasharray="4,4"
      />
    </>
  );
};
