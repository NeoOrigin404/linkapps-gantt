import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Platform } from "react-native";
import { ThemedText } from "../ThemedText";
import { format, addDays, parse, subDays } from "date-fns";
import { Ionicons } from "@expo/vector-icons";
import type { DateTimePickerEvent } from "@react-native-community/datetimepicker";

// Only import DateTimePicker for native platforms
let DateTimePicker: React.ComponentType<any> | null = null;
if (Platform.OS !== "web") {
	DateTimePicker = require("@react-native-community/datetimepicker").default;
}

interface DateRangePickerProps {
	startDate: Date;
	onDateChange: (newStartDate: Date) => void;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
	startDate,
	onDateChange,
}) => {
	const [showPicker, setShowPicker] = useState(false);
	const endDate = addDays(startDate, 7);

	const handleDateChange = (
		event: DateTimePickerEvent,
		selectedDate?: Date,
	) => {
		setShowPicker(Platform.OS === "ios");
		if (selectedDate) {
			onDateChange(selectedDate);
		}
	};

	const handleWebDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const dateString = event.target.value;
		if (dateString) {
			// Parse the date from the input value (YYYY-MM-DD format)
			const newDate = parse(dateString, "yyyy-MM-dd", new Date());
			onDateChange(newDate);
		}
	};

	const toggleDatePicker = () => {
		setShowPicker(!showPicker);
	};

	const handlePreviousWeek = () => {
		const newDate = subDays(startDate, 7);
		onDateChange(newDate);
	};

	const handleNextWeek = () => {
		const newDate = addDays(startDate, 7);
		onDateChange(newDate);
	};

	// Format date for the web input (YYYY-MM-DD)
	const webInputDate = format(startDate, "yyyy-MM-dd");

	return (
		<View style={styles.container}>
			<View style={styles.dateDisplay}>
				<ThemedText style={styles.label}>Date Range:</ThemedText>

				<View style={styles.navigationContainer}>
					<TouchableOpacity
						onPress={handlePreviousWeek}
						style={styles.navigationButton}
					>
						<Ionicons name="chevron-back" size={24} color="#666" />
					</TouchableOpacity>

					{Platform.OS === "web" ? (
						// Web-specific date input
						<input
							type="date"
							value={webInputDate}
							onChange={handleWebDateChange}
							style={{
								padding: 8,
								borderRadius: 4,
								border: "1px solid #ccc",
								fontSize: 14,
								marginLeft: 8,
								marginRight: 8,
							}}
						/>
					) : (
						// Native platform button to open the picker
						<TouchableOpacity
							onPress={toggleDatePicker}
							style={styles.dateButton}
						>
							<ThemedText style={styles.dateText}>
								{format(startDate, "MMM d, yyyy")} -{" "}
								{format(endDate, "MMM d, yyyy")}
							</ThemedText>
						</TouchableOpacity>
					)}

					<TouchableOpacity
						onPress={handleNextWeek}
						style={styles.navigationButton}
					>
						<Ionicons name="chevron-forward" size={24} color="#666" />
					</TouchableOpacity>
				</View>
			</View>

			{/* Display the date range for web */}
			{Platform.OS === "web" && (
				<ThemedText style={styles.rangeText}>
					Selected range: {format(startDate, "MMM d, yyyy")} -{" "}
					{format(endDate, "MMM d, yyyy")}
				</ThemedText>
			)}

			{/* Native date picker (only shown when needed) */}
			{Platform.OS !== "web" && showPicker && DateTimePicker && (
				<DateTimePicker
					value={startDate}
					mode="date"
					display="default"
					onChange={handleDateChange}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginBottom: 10,
	},
	dateDisplay: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	label: {
		fontSize: 14,
		fontWeight: "500",
	},
	navigationContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	navigationButton: {
		padding: 4,
		borderRadius: 4,
	},
	dateButton: {
		padding: 8,
		backgroundColor: "#f0f0f0",
		borderRadius: 4,
		marginHorizontal: 8,
	},
	dateText: {
		fontSize: 14,
	},
	rangeText: {
		marginTop: 4,
		fontSize: 12,
		color: "#666",
	},
});
