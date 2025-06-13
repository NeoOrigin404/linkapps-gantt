import React from "react";
import { parseISO, differenceInMinutes } from "date-fns";
import { Rect, Text } from "react-native-svg";
import type { ManufacturingOrder, Machine } from "./types";
import { ORDER_STATUS_COLORS } from "./constants";

interface ManufacturingOrderBarsProps {
	machines: Machine[];
	manufacturingOrders: ManufacturingOrder[];
	chartConfig: {
		start: Date;
		pixelsPerMinute: number;
		totalWidth: number;
	};
	barHeight: number;
	barMargin: number;
	labelWidth: number;
	minBarWidth: number;
	onOrderPress: (order: ManufacturingOrder) => void;
}

export const ManufacturingOrderBars: React.FC<ManufacturingOrderBarsProps> = ({
	machines,
	manufacturingOrders,
	chartConfig,
	barHeight,
	barMargin,
	labelWidth,
	minBarWidth,
	onOrderPress,
}) => {
	return (
		<>
			{machines.map((machine, machineIndex) => {
				// Filter orders for this machine
				const machineOrders = manufacturingOrders.filter(
					(order) => order.machine_id === machine.machine_id,
				);

				// Calculate the base Y position for this machine
				// Each machine has 3 rows, and we want to place manufacturing orders on the second row
				const baseY = machineIndex * (barHeight + barMargin) * 3;
				const manufacturingY = baseY + barHeight + barMargin; // Second row

				// Render bars for each order
				return machineOrders.map((order) => {
					const start = parseISO(order.start_datetime_utc);
					const end = parseISO(order.end_datetime_utc);
					const startOffset =
						labelWidth +
						differenceInMinutes(start, chartConfig.start) *
							chartConfig.pixelsPerMinute;

					// Calculate width and ensure minimum width
					let width =
						differenceInMinutes(end, start) * chartConfig.pixelsPerMinute;
					width = Math.max(width, minBarWidth);

					// Get color based on order status
					const barColor =
						ORDER_STATUS_COLORS[
							order.status as keyof typeof ORDER_STATUS_COLORS
						] || ORDER_STATUS_COLORS.default;

					// Format the quantity text
					const quantityText = `${order.quantity_produced}/${order.quantity_to_do}`;

					return (
						<React.Fragment key={`order-${order.of_id}`}>
							<Rect
								x={startOffset}
								y={manufacturingY}
								width={width}
								height={barHeight}
								fill={barColor}
								rx={4}
								onPress={() => onOrderPress(order)}
							/>
							{/* Add the OF number and quantity text */}
							<Text
								x={startOffset + 5}
								y={manufacturingY + barHeight / 2 + 4}
								fill="#000000"
								fontSize={12}
								fontWeight="bold"
							>
								{`${order.part_number} (${quantityText})`}
							</Text>
						</React.Fragment>
					);
				});
			})}
		</>
	);
};
