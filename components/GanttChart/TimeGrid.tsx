import React from "react";
import { Line, Text as SvgText, Rect } from "react-native-svg";
import {
  parseISO,
  format,
  addMinutes,
  addHours,
  addDays,
  differenceInMinutes,
} from "date-fns";
import { TimeInterval } from "./types";

interface TimeGridProps {
  startDate: string;
  endDate: string;
  selectedInterval: TimeInterval;
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

export const TimeGrid: React.FC<TimeGridProps> = ({
  startDate,
  endDate,
  selectedInterval,
  chartConfig,
  chartDimensions,
  labelWidth,
  axisHeight,
}) => {
  const gridLines = [];
  const timeLabels = [];

  // Parse start and end dates
  const start = parseISO(startDate);
  const end = parseISO(endDate);

  // Determine the main interval step size based on selected interval
  let intervalStep: number;
  let intervalUnit: "minutes" | "hours" | "days";
  let timeFormat: string;
  let hourSubdivisions: number = 1; // Number of 1-hour subdivisions to show

  if (selectedInterval.unit === "minute") {
    // Special handling for minute intervals that represent hours
    if (selectedInterval.value === 480) {
      // 8 hours in minutes
      intervalStep = 8;
      intervalUnit = "hours";
      timeFormat = "HH:mm";
      hourSubdivisions = 8; // Show 8 hourly subdivisions
    } else if (selectedInterval.value === 240) {
      // 4 hours in minutes
      intervalStep = 4;
      intervalUnit = "hours";
      timeFormat = "HH:mm";
      hourSubdivisions = 4; // Show 4 hourly subdivisions
    } else {
      intervalStep = selectedInterval.value;
      intervalUnit = "minutes";
      timeFormat = "HH:mm";
      // For minute intervals, calculate how many hourly subdivisions to show
      hourSubdivisions = Math.floor(60 / selectedInterval.value);
    }
  } else if (selectedInterval.unit === "hour") {
    intervalStep = selectedInterval.value;
    intervalUnit = "hours";
    timeFormat = "HH:mm";
    hourSubdivisions = selectedInterval.value; // For hour intervals, use the interval step
  } else if (selectedInterval.unit === "day") {
    intervalStep = selectedInterval.value;
    intervalUnit = "days";
    timeFormat = "MMM d";
    hourSubdivisions = intervalStep * 24; // For days, use 24 hours per day
  } else {
    // Default to hours
    intervalStep = 1;
    intervalUnit = "hours";
    timeFormat = "HH:mm";
  }

  // Calculate the number of main intervals
  let currentTime = new Date(start);
  let i = 0;

  while (currentTime <= end) {
    // Calculate x position for this time point
    const minutesSinceStart = differenceInMinutes(currentTime, start);
    const x = labelWidth + minutesSinceStart * chartConfig.pixelsPerMinute;

    // Only add grid lines and labels if they're within the visible area
    if (x >= labelWidth && x <= chartConfig.totalWidth) {
      // Add main vertical grid line
      gridLines.push(
        <Line
          key={`grid-${i}`}
          x1={x}
          y1={axisHeight}
          x2={x}
          y2={chartDimensions.contentHeight + axisHeight}
          stroke="#a0a0a0" // Darker color for main lines
          strokeWidth={1}
        />
      );

      // Add subdivision lines - always use 1-hour subdivisions
      // Only add subdivisions if there's enough space between main intervals
      if (hourSubdivisions > 1) {
        const subDivisionStep = 60; // Always 1 hour (60 minutes)

        for (let j = 1; j < hourSubdivisions; j++) {
          // Calculate the time for this subdivision
          const subTime = addMinutes(currentTime, j * subDivisionStep);

          // Skip if we've gone past the end date
          if (subTime > end) break;

          // Calculate x position for this subdivision
          const subMinutesSinceStart = differenceInMinutes(subTime, start);
          const subX =
            labelWidth + subMinutesSinceStart * chartConfig.pixelsPerMinute;

          // Only add if within visible area
          if (subX >= labelWidth && subX <= chartConfig.totalWidth) {
            gridLines.push(
              <Line
                key={`subgrid-${i}-${j}`}
                x1={subX}
                y1={axisHeight}
                x2={subX}
                y2={chartDimensions.contentHeight + axisHeight}
                stroke="#e0e0e0" // Lighter color for subdivision lines
                strokeWidth={0.5} // Thinner lines for subdivisions
                strokeDasharray="2,2" // Dashed line for subdivisions
              />
            );
          }
        }
      }

      // Add a background rectangle for the label
      timeLabels.push(
        <Rect
          key={`label-bg-${i}`}
          x={x - 25}
          y={5}
          width={50}
          height={20}
          fill="#ffffff"
          rx={2}
        />
      );

      // Then add the text on top
      timeLabels.push(
        <SvgText
          key={`label-${i}`}
          x={x}
          y={20}
          fill="#333"
          fontSize={11}
          fontWeight="bold"
          textAnchor="middle"
        >
          {format(currentTime, timeFormat)}
        </SvgText>
      );
    }

    // Move to the next main interval
    if (intervalUnit === "minutes") {
      currentTime = addMinutes(currentTime, intervalStep);
    } else if (intervalUnit === "hours") {
      currentTime = addHours(currentTime, intervalStep);
    } else if (intervalUnit === "days") {
      currentTime = addDays(currentTime, intervalStep);
    }

    i++;
  }

  return (
    <>
      {gridLines}
      {timeLabels}
    </>
  );
};
