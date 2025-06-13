import React, { useState, useEffect, useCallback } from "react";
import { Image, StyleSheet, Platform, ScrollView } from "react-native";
import { GanttChart } from "../../components/GanttChart/GanttChart";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { parseISO, format, addDays } from "date-fns";
import { DateRangePicker } from "@/components/GanttChart/DateRangePicker";
import { SearchBar } from "@/components/GanttChart/SearchBar";
// Import the data
import machinesData from "@/machines.json";
import manufacturingOrdersData from "@/ordres_de_fabrication.json";
import machineStatusHistoryData from "@/machine_status_history.json";

export default function HomeScreen() {
	// State for selected date range
	const [selectedStartDate, setSelectedStartDate] = useState<Date>(new Date());
	// State for search query
	const [searchQuery, setSearchQuery] = useState("");

	// Calculate end date (always 7 days after start date)
	const selectedEndDate = addDays(selectedStartDate, 7);

	// Format dates for the GanttChart component
	const formattedStartDate = selectedStartDate.toISOString();
	const formattedEndDate = selectedEndDate.toISOString();

	// Initialize with a default date range on component mount
	useEffect(() => {
		// Find earliest manufacturing order date to set as initial date
		if (manufacturingOrdersData && manufacturingOrdersData.length > 0) {
			let earliestStart = parseISO(
				manufacturingOrdersData[0].start_datetime_utc,
			);

			manufacturingOrdersData.forEach((order) => {
				const startDate = parseISO(order.start_datetime_utc);
				if (startDate < earliestStart) {
					earliestStart = startDate;
				}
			});

			// Set the initial date to the earliest order date
			setSelectedStartDate(earliestStart);
		}
	}, []);

	// Handle date change from the picker
	const handleDateChange = (newStartDate: Date) => {
		setSelectedStartDate(newStartDate);
	};

	// Handle search query change
	const handleSearch = (query: string) => {
		setSearchQuery(query);
	};

	// Handle "Today" button press
	const handleTodayPress = useCallback(() => {
		// Set the selected date to current time
		const now = new Date();
		// Set the start date to 3.5 days before now to center the current time
		const startDate = new Date(now);
		startDate.setDate(startDate.getDate() - 3.5);
		setSelectedStartDate(startDate);
	}, []);

	return (
		<ScrollView>
			<ThemedView style={styles.ganttContainer}>
				<ThemedText type="subtitle" style={{ marginBottom: 16 }}>
					Manufacturing Schedule
				</ThemedText>

				{/* Date Range Picker */}
				<DateRangePicker
					startDate={selectedStartDate}
					onDateChange={handleDateChange}
				/>

				{/* Search Bar */}
				<SearchBar onSearch={handleSearch} />

				<GanttChart
					startDate={formattedStartDate}
					endDate={formattedEndDate}
					machines={machinesData}
					manufacturingOrders={manufacturingOrdersData}
					machineStatusHistory={machineStatusHistoryData}
					style={styles.ganttChart}
					onTodayPress={handleTodayPress}
				/>
			</ThemedView>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	titleContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	stepContainer: {
		gap: 8,
		marginBottom: 8,
	},
	reactLogo: {
		height: 178,
		width: 290,
		bottom: 0,
		left: 0,
		position: "absolute",
	},
	// Add new styles for Gantt chart
	ganttContainer: {
		flex: 1,
		padding: 16,
	},
	ganttChart: {
		marginTop: 16,
	},
});
