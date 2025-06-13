import React, {
	useCallback,
	useMemo,
	useState,
	useRef,
	useEffect,
} from "react";
import { StyleSheet, View, Dimensions, ScrollView } from "react-native";
import Svg, { G } from "react-native-svg";
import { parseISO, differenceInMinutes, isWithinInterval } from "date-fns";
import {
	GanttChartProps,
	TimeInterval,
	ManufacturingOrder,
	MachineStatusHistory,
} from "./types";
import { TIME_INTERVALS } from "./types";
import { IntervalSelector } from "./IntervalSelector";
import { MachineList } from "./MachineList";
import { TimeGrid } from "./TimeGrid";
import { ManufacturingOrderBars } from "./ManufacturingOrderBars";
import { MachineBackgrounds } from "./MachineBackgrounds";
import { ManufacturingOrderTooltip } from "./ManufacturingOrderTooltip";
import { MaintenanceBars } from "./MaintenanceBars";
import {
	AXIS_HEIGHT,
	BAR_HEIGHT,
	BAR_MARGIN,
	LABEL_WIDTH,
	MIN_BAR_WIDTH,
	INTERVAL_SELECTOR_HEIGHT,
	BOTTOM_PADDING,
	getLabelWidth,
} from "./constants";
import { CategoryList } from "./CategoryList";
import { StatusBars } from "./StatusBars";
import { CurrentTimeIndicator } from "./CurrentTimeIndicator";
import machineStatusHistoryData from "@/machine_status_history.json";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export const GanttChart: React.FC<GanttChartProps> = ({
	startDate,
	endDate,
	machines,
	manufacturingOrders,
	machineStatusHistory,
	style,
	onOrderPress,
	onTodayPress,
}) => {
	// State for selected time interval
	const [selectedInterval, setSelectedInterval] = useState<TimeInterval>(
		TIME_INTERVALS[2], // Default to 1 day
	);

	// State for screen dimensions
	const [dimensions, setDimensions] = useState({
		width: SCREEN_WIDTH,
		labelWidth: getLabelWidth(SCREEN_WIDTH),
	});

	// Update dimensions when screen size changes
	useEffect(() => {
		const subscription = Dimensions.addEventListener("change", ({ window }) => {
			setDimensions({
				width: window.width,
				labelWidth: getLabelWidth(window.width),
			});
		});

		return () => subscription.remove();
	}, []);

	// State for tooltip
	const [tooltipVisible, setTooltipVisible] = useState(false);
	const [selectedOrder, setSelectedOrder] = useState<ManufacturingOrder | null>(
		null,
	);

	// Reference to the scroll view for programmatic scrolling
	const scrollViewRef = useRef<ScrollView>(null);

	// Handle manufacturing order click
	const handleOrderPress = useCallback(
		(order: ManufacturingOrder) => {
			setSelectedOrder(order);
			setTooltipVisible(true);

			// Call external handler if provided
			if (onOrderPress) {
				onOrderPress(order);
			}
		},
		[onOrderPress],
	);

	// Close tooltip
	const handleCloseTooltip = useCallback(() => {
		setTooltipVisible(false);
	}, []);

	// Handle status button press
	const handleStatusPress = useCallback(() => {
		console.log("Status button pressed");
		// TODO: Implement status view logic
	}, []);

	// Handle OF button press
	const handleOFPress = useCallback(() => {
		console.log("OF button pressed");
		// TODO: Implement OF view logic
	}, []);

	// Handle cycles button press
	const handleCyclesPress = useCallback(() => {
		console.log("Cycles button pressed");
		// TODO: Implement cycles view logic
	}, []);

	// Calculate chart dimensions dynamically based on machines
	const chartDimensions = useMemo(() => {
		// Calculate the height needed for all machines (3 rows per machine)
		const contentHeight = machines.length * (BAR_HEIGHT + BAR_MARGIN) * 3;

		// Total chart height includes:
		// - Content height for all machines (with 3 rows each)
		// - Axis height for time labels
		// - Bottom padding for scrolling
		const totalHeight = contentHeight + AXIS_HEIGHT + BOTTOM_PADDING;

		return {
			contentHeight,
			totalHeight,
		};
	}, [machines.length]);

	// Filter data based on the selected date range
	const filteredData = useMemo(() => {
		const start = parseISO(startDate);
		const end = parseISO(endDate);

		// Filter manufacturing orders that fall within the date range
		const filteredOrders = manufacturingOrders.filter((order) => {
			const orderStart = parseISO(order.start_datetime_utc);
			const orderEnd = parseISO(order.end_datetime_utc);

			// Include orders that:
			// 1. Start within the range, or
			// 2. End within the range, or
			// 3. Span across the entire range (start before and end after)
			return (
				isWithinInterval(orderStart, { start, end }) ||
				isWithinInterval(orderEnd, { start, end }) ||
				(orderStart <= start && orderEnd >= end)
			);
		});

		// Filter machine status history records that fall within the date range
		const filteredHistory = machineStatusHistory.filter((record) => {
			const recordStart = parseISO(record.start_datetime_utc);
			const recordEnd = parseISO(record.end_datetime_utc);

			// Same logic as for orders
			return (
				isWithinInterval(recordStart, { start, end }) ||
				isWithinInterval(recordEnd, { start, end }) ||
				(recordStart <= start && recordEnd >= end)
			);
		});

		return {
			filteredOrders,
			filteredHistory,
		};
	}, [startDate, endDate, manufacturingOrders, machineStatusHistory]);

	// Calculate chart dimensions and time range
	const chartConfig = useMemo(() => {
		const start = parseISO(startDate);
		const end = parseISO(endDate);
		const totalMinutes = differenceInMinutes(end, start);

		// Calculate pixels per minute based on selected interval
		let pixelsPerMinute;

		if (selectedInterval.unit === "minute") {
			// For minute intervals, show more detail
			pixelsPerMinute = SCREEN_WIDTH / (selectedInterval.value * 24); // Show 24 intervals
		} else if (selectedInterval.unit === "hour") {
			// For hour intervals, show a reasonable number of hours
			pixelsPerMinute = SCREEN_WIDTH / (selectedInterval.value * 60 * 12); // Show 12 hours
		} else if (selectedInterval.unit === "day") {
			if (selectedInterval.value === 7) {
				// Special case for 1 week: show exactly 7 days
				pixelsPerMinute = SCREEN_WIDTH / (60 * 24 * 10);
			} else {
				// For other day intervals, show a reasonable number of days
				pixelsPerMinute = SCREEN_WIDTH / (selectedInterval.value * 60 * 24 * 3); // Show 3 days
			}
		} else {
			// Default fallback
			pixelsPerMinute = SCREEN_WIDTH / totalMinutes;
		}

		// Calculate the width based on the selected date range
		const rangeWidth = totalMinutes * pixelsPerMinute;

		// For the 1-week interval, limit the width to exactly fit the 7 days
		const totalWidth =
			selectedInterval.unit === "day" && selectedInterval.value === 7
				? SCREEN_WIDTH + LABEL_WIDTH // Just enough for the screen plus labels
				: Math.max(rangeWidth, SCREEN_WIDTH) + LABEL_WIDTH + 100; // Normal padding for other intervals

		return {
			start,
			end,
			totalMinutes,
			pixelsPerMinute,
			totalWidth,
		};
	}, [startDate, endDate, selectedInterval]);

	// Function to scroll to today's date and call the external handler
	const handleTodayPress = useCallback(() => {
		// Scroll to today's position
		if (scrollViewRef.current) {
			const now = new Date();
			const minutesSinceStart = differenceInMinutes(now, chartConfig.start);
			const xPosition = minutesSinceStart * chartConfig.pixelsPerMinute;

			// Calculate the scroll position to center the current time
			// Take into account the total width of the chart and the visible area
			const visibleWidth = dimensions.width - dimensions.labelWidth;
			const scrollPosition = Math.max(0, xPosition - visibleWidth / 2);

			// Ensure we don't scroll past the end of the chart
			const maxScroll = chartConfig.totalWidth - visibleWidth;
			const finalScrollPosition = Math.min(scrollPosition, maxScroll);

			// Scroll to position
			scrollViewRef.current.scrollTo({
				x: finalScrollPosition,
				y: 0,
				animated: true,
			});
		}

		// Call the external handler if provided
		if (onTodayPress) {
			onTodayPress();
		}
	}, [chartConfig, dimensions, onTodayPress]);

	return (
		<View style={[styles.container, style]}>
			<IntervalSelector
				selectedInterval={selectedInterval}
				onIntervalChange={setSelectedInterval}
				onTodayPress={handleTodayPress}
				onStatusPress={handleStatusPress}
				onOFPress={handleOFPress}
				onCyclesPress={handleCyclesPress}
				intervals={TIME_INTERVALS}
			/>

			<View
				style={[styles.chartContent, { height: chartDimensions.totalHeight }]}
			>
				{/* Machine names column (fixed) */}
				<MachineList
					machines={machines}
					height={chartDimensions.totalHeight}
					axisHeight={AXIS_HEIGHT}
					barHeight={BAR_HEIGHT}
					barMargin={BAR_MARGIN}
				/>

				{/* Category column (fixed) */}
				<CategoryList
					machines={machines}
					height={chartDimensions.totalHeight}
					axisHeight={AXIS_HEIGHT}
					barHeight={BAR_HEIGHT}
					barMargin={BAR_MARGIN}
				/>

				{/* Scrollable timeline */}
				<View style={styles.chartWrapper}>
					<ScrollView
						horizontal
						ref={scrollViewRef}
						contentContainerStyle={{
							width: chartConfig.totalWidth,
							paddingBottom: BOTTOM_PADDING,
						}}
						showsHorizontalScrollIndicator={true}
						scrollEventThrottle={16}
						directionalLockEnabled={true}
						bounces={false}
					>
						<Svg
							width={chartConfig.totalWidth}
							height={chartDimensions.totalHeight}
							preserveAspectRatio="xMinYMin slice"
						>
							{/* Draw machine backgrounds first (at the back) */}
							<G y={AXIS_HEIGHT}>
								<MachineBackgrounds
									machines={machines}
									chartConfig={chartConfig}
									barHeight={BAR_HEIGHT}
									barMargin={BAR_MARGIN}
								/>
							</G>

							{/* Draw time grid lines above backgrounds */}
							<TimeGrid
								startDate={startDate}
								endDate={endDate}
								selectedInterval={selectedInterval}
								chartConfig={chartConfig}
								chartDimensions={chartDimensions}
								labelWidth={dimensions.labelWidth}
								axisHeight={AXIS_HEIGHT}
							/>

							{/* Draw status bars (first row) */}
							<G y={AXIS_HEIGHT}>
								<StatusBars
									machines={machines}
									machineStatusHistory={filteredData.filteredHistory}
									chartConfig={chartConfig}
									barHeight={BAR_HEIGHT}
									barMargin={BAR_MARGIN}
									labelWidth={dimensions.labelWidth}
									minBarWidth={MIN_BAR_WIDTH}
								/>
							</G>

							{/* Draw manufacturing order bars (second row) */}
							<G y={AXIS_HEIGHT}>
								<ManufacturingOrderBars
									machines={machines}
									manufacturingOrders={filteredData.filteredOrders}
									chartConfig={chartConfig}
									barHeight={BAR_HEIGHT}
									barMargin={BAR_MARGIN}
									labelWidth={dimensions.labelWidth}
									minBarWidth={MIN_BAR_WIDTH}
									onOrderPress={handleOrderPress}
								/>
							</G>

							{/* Draw maintenance bars (third row) */}
							<G y={AXIS_HEIGHT}>
								<MaintenanceBars
									machines={machines}
									maintenanceEvents={[]} // Replace with filtered maintenance data when available
									chartConfig={chartConfig}
									barHeight={BAR_HEIGHT}
									barMargin={BAR_MARGIN}
									labelWidth={dimensions.labelWidth}
									minBarWidth={MIN_BAR_WIDTH}
									onMaintenancePress={() => {}} // Replace with actual handler
								/>
							</G>

							{/* Draw current time indicator on top of everything */}
							<CurrentTimeIndicator
								chartConfig={chartConfig}
								chartDimensions={chartDimensions}
								labelWidth={dimensions.labelWidth}
								axisHeight={AXIS_HEIGHT}
							/>
						</Svg>
					</ScrollView>

					{/* Tooltip Modal */}
					<ManufacturingOrderTooltip
						order={selectedOrder}
						visible={tooltipVisible}
						onClose={handleCloseTooltip}
					/>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
	},
	chartContent: {
		flexDirection: "row",
	},
	chartWrapper: {
		flex: 1,
		position: "relative", // For absolute positioning of tooltip
	},
});
