import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { WorkOrder } from "./types";

interface WorkOrderListProps {
	workOrders: WorkOrder[];
	height: number;
	axisHeight: number;
	barHeight: number;
	barMargin: number;
}

export const WorkOrderList: React.FC<WorkOrderListProps> = ({
	workOrders,
	height,
	axisHeight,
	barHeight,
	barMargin,
}) => {
	return (
		<View style={[styles.labelsColumn, { height, paddingTop: axisHeight }]}>
			{workOrders.map((wo: WorkOrder, index: number) => (
				<View
					key={`label-${wo.wo_id}`}
					style={[
						styles.labelContainer,
						{ height: barHeight + barMargin },
						index % 2 === 0 ? styles.alternateRow : null,
					]}
				>
					<ThemedText style={styles.labelText}>{wo.wo_no}</ThemedText>
					<View style={styles.labelDetails}>
						<ThemedText style={styles.labelDetailText}>
							ERP: {wo.erp_no}
						</ThemedText>
						<ThemedText style={styles.labelDetailText}>
							OP: {wo.erp_op}
						</ThemedText>
					</View>
				</View>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	labelsColumn: {
		borderRightWidth: 1,
		borderColor: "#ccc",
		width: 110,
	},
	labelContainer: {
		justifyContent: "center",
		paddingLeft: 8,
		width: 70,
	},
	labelText: {
		fontSize: 12,
		lineHeight: 16,
		fontWeight: "bold",
	},
	labelDetails: {
		flexDirection: "row",
		gap: 4,
	},
	labelDetailText: {
		fontSize: 10,
		lineHeight: 14,
		color: "#666",
	},
	alternateRow: {
		backgroundColor: "#f9f9f9",
	},
});
