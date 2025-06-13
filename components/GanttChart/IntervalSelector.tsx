import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { ThemedText } from "../ThemedText";
import { TimeInterval } from "./types";

interface IntervalSelectorProps {
	selectedInterval: TimeInterval;
	onIntervalChange: (interval: TimeInterval) => void;
	onTodayPress: () => void;
	onStatusPress: () => void;
	onOFPress: () => void;
	onCyclesPress: () => void;
	intervals: TimeInterval[];
}

export const IntervalSelector: React.FC<IntervalSelectorProps> = ({
	selectedInterval,
	onIntervalChange,
	onTodayPress,
	onStatusPress,
	onOFPress,
	onCyclesPress,
	intervals,
}) => {
	return (
		<View style={styles.intervalSelector}>
			<View style={styles.intervalSelectorRow}>
				<ThemedText style={styles.intervalLabel}>Time Interval:</ThemedText>
			</View>
			<View style={styles.intervalButtons}>
				<TouchableOpacity style={styles.todayButton} onPress={onTodayPress}>
					<ThemedText style={styles.todayButtonText}>Now</ThemedText>
				</TouchableOpacity>
				{intervals
					.filter((interval) => interval.primary)
					.map((interval) => {
						const isSelected =
							interval.value === selectedInterval.value &&
							interval.unit === selectedInterval.unit;

						// Format the interval label
						let label;
						if (interval.unit === "minute") {
							label =
								interval.value < 60
									? `${interval.value}m`
									: `${interval.value / 60}h`;
						} else if (interval.unit === "hour") {
							label = `${interval.value}h`;
						} else if (interval.unit === "day") {
							label =
								interval.value === 1
									? "1d"
									: interval.value === 7
										? "1w"
										: interval.value === 14
											? "2w"
											: interval.value === 30
												? "1m"
												: interval.value === 60
													? "2m"
													: interval.value === 180
														? "6m"
														: `${interval.value}d`;
						}

						return (
							<TouchableOpacity
								key={`${interval.value}-${interval.unit}`}
								style={[
									styles.intervalButton,
									isSelected && styles.selectedIntervalButton,
								]}
								onPress={() => onIntervalChange(interval)}
							>
								<ThemedText
									style={[
										styles.intervalButtonText,
										isSelected && styles.selectedIntervalButtonText,
									]}
								>
									{label}
								</ThemedText>
							</TouchableOpacity>
						);
					})}
			</View>
			<View style={styles.actionButtons}>
				<TouchableOpacity style={styles.actionButton} onPress={onStatusPress}>
					<ThemedText style={styles.actionButtonText}>Status</ThemedText>
				</TouchableOpacity>
				<TouchableOpacity style={styles.actionButton} onPress={onOFPress}>
					<ThemedText style={styles.actionButtonText}>OF</ThemedText>
				</TouchableOpacity>
				<TouchableOpacity style={styles.actionButton} onPress={onCyclesPress}>
					<ThemedText style={styles.actionButtonText}>Cycles</ThemedText>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	intervalSelector: {
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: "#eee",
		backgroundColor: "#fff",
		position: "sticky",
		top: 0,
		zIndex: 1000,
	},
	intervalSelectorRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 5,
	},
	intervalLabel: {
		fontSize: 12,
	},
	todayButton: {
		backgroundColor: "#2196F3",
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 15,
	},
	todayButtonText: {
		color: "#fff",
		fontSize: 12,
		fontWeight: "bold",
	},
	intervalButtons: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 5,
		marginBottom: 10,
	},
	intervalButton: {
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderRadius: 15,
		backgroundColor: "#f0f0f0",
	},
	selectedIntervalButton: {
		backgroundColor: "#2196F3",
	},
	intervalButtonText: {
		fontSize: 12,
	},
	selectedIntervalButtonText: {
		color: "#fff",
	},
	actionButtons: {
		flexDirection: "row",
		gap: 5,
	},
	actionButton: {
		flex: 1,
		backgroundColor: "#4CAF50",
		paddingVertical: 4,
		paddingHorizontal: 8,
		borderRadius: 12,
		alignItems: "center",
		maxWidth: 80,
	},
	actionButtonText: {
		color: "#fff",
		fontSize: 11,
		fontWeight: "bold",
	},
});
