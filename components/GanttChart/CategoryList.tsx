import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { Machine } from "./types";

interface CategoryListProps {
	machines: Machine[];
	height: number;
	axisHeight: number;
	barHeight: number;
	barMargin: number;
}

export const CategoryList: React.FC<CategoryListProps> = ({
	machines,
	height,
	axisHeight,
	barHeight,
	barMargin,
}) => {
	return (
		<View style={[styles.categoryColumn, { height, paddingTop: axisHeight }]}>
			{machines.map((machine: Machine, index: number) => {
				const isEvenRow = index % 2 === 0;
				const rowHeight = (barHeight + barMargin) * 3; // Three rows per machine

				return (
					<View
						key={`categories-${machine.machine_id}`}
						style={[
							styles.categoryGroup,
							{ height: rowHeight },
							isEvenRow ? styles.alternateRow : null,
						]}
					>
						{/* First row - Status */}
						<View
							style={[styles.categoryRow, { height: barHeight + barMargin }]}
						>
							<ThemedText style={styles.categoryText}>Status</ThemedText>
						</View>

						{/* Second row - Manufacturing */}
						<View
							style={[styles.categoryRow, { height: barHeight + barMargin }]}
						>
							<ThemedText style={styles.categoryText}>OF</ThemedText>
						</View>

						{/* Third row - Maintenance */}
						<View
							style={[styles.categoryRow, { height: barHeight + barMargin }]}
						>
							<ThemedText style={styles.categoryText}>Cycles</ThemedText>
						</View>
					</View>
				);
			})}
		</View>
	);
};

const styles = StyleSheet.create({
	categoryColumn: {
		borderRightWidth: 1,
		borderColor: "#ccc",
		width: 70,
	},
	categoryGroup: {
		borderBottomWidth: 1,
		borderBottomColor: "#eee",
	},
	categoryRow: {
		justifyContent: "center",
		paddingLeft: 8,
		borderTopWidth: 1,
		borderTopColor: "#f0f0f0",
	},
	categoryText: {
		fontSize: 10,
		color: "#666",
	},
	alternateRow: {
		backgroundColor: "#f9f9f9",
	},
});
