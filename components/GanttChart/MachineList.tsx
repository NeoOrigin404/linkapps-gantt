import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { Machine } from "./types";

interface MachineListProps {
	machines: Machine[];
	height: number;
	axisHeight: number;
	barHeight: number;
	barMargin: number;
}

export const MachineList: React.FC<MachineListProps> = ({
	machines,
	height,
	axisHeight,
	barHeight,
	barMargin,
}) => {
	return (
		<View style={[styles.labelsColumn, { height, paddingTop: axisHeight }]}>
			{machines.map((machine: Machine, index: number) => {
				const isEvenRow = index % 2 === 0;
				const rowHeight = (barHeight + barMargin) * 3; // Three rows per machine
				const statusColor = getStatusColor(machine.status);

				return (
					<View
						key={`machine-group-${machine.machine_id}`}
						style={[
							styles.machineGroup,
							{ height: rowHeight },
							isEvenRow ? styles.alternateRow : null,
							{ backgroundColor: `${statusColor}30` },
						]}
					>
						<View style={styles.machineInfo}>
							<ThemedText style={styles.labelText}>
								{machine.machine_name}
							</ThemedText>
							<ThemedText style={styles.labelDetailText}>
								{machine.machine_type}
							</ThemedText>
						</View>
					</View>
				);
			})}
		</View>
	);
};

// Helper function to get color based on machine status
const getStatusColor = (status: string) => {
	switch (status) {
		case "Operational":
			return "#4CAF50"; // Green
		case "Under Maintenance":
			return "#FFC107"; // Amber
		case "Idle":
			return "#2196F3"; // Blue
		case "Under Upgrade":
			return "#9C27B0"; // Purple
		default:
			return "#757575"; // Grey
	}
};

const styles = StyleSheet.create({
	labelsColumn: {
		borderRightWidth: 1,
		borderColor: "#ccc",
		width: 110,
	},
	machineGroup: {
		justifyContent: "center",
		paddingLeft: 8,
		borderBottomWidth: 1,
		borderBottomColor: "#eee",
	},
	machineInfo: {
		paddingLeft: 8,
	},
	labelText: {
		fontSize: 12,
		lineHeight: 16,
		fontWeight: "bold",
	},
	labelDetailText: {
		fontSize: 10,
		lineHeight: 14,
		color: "#666",
		marginTop: 4,
	},
	alternateRow: {
		backgroundColor: "#f9f9f9",
	},
});
