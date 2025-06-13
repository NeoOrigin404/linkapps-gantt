import React from "react";
import {
	StyleSheet,
	View,
	TouchableOpacity,
	Modal,
	Dimensions,
	ScrollView,
} from "react-native";
import { ThemedText } from "../ThemedText";
import { WorkOrder } from "./types";
import { format, parseISO } from "date-fns";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

interface WorkOrderTooltipProps {
	workOrder: WorkOrder | null;
	visible: boolean;
	onClose: () => void;
}

export const WorkOrderTooltip: React.FC<WorkOrderTooltipProps> = ({
	workOrder,
	visible,
	onClose,
}) => {
	if (!workOrder) return null;

	// Format dates for display
	const formatDate = (dateString: string) => {
		return format(parseISO(dateString), "MMM dd, yyyy HH:mm");
	};

	return (
		<Modal
			visible={visible}
			transparent={true}
			animationType="fade"
			onRequestClose={onClose}
		>
			<View style={styles.modalOverlay}>
				<View style={styles.modalContainer}>
					<View style={styles.tooltipHeader}>
						<ThemedText style={styles.tooltipTitle}>
							{workOrder.wo_no}
						</ThemedText>
						<TouchableOpacity onPress={onClose} style={styles.closeButton}>
							<ThemedText style={styles.closeButtonText}>×</ThemedText>
						</TouchableOpacity>
					</View>

					<ScrollView style={styles.tooltipScrollView}>
						<View style={styles.tooltipContent}>
							<View style={styles.tooltipRow}>
								<ThemedText style={styles.tooltipLabel}>ERP:</ThemedText>
								<ThemedText style={styles.tooltipValue}>
									{workOrder.erp_no}
								</ThemedText>
							</View>

							<View style={styles.tooltipRow}>
								<ThemedText style={styles.tooltipLabel}>Operation:</ThemedText>
								<ThemedText style={styles.tooltipValue}>
									{workOrder.erp_op}
								</ThemedText>
							</View>

							<View style={styles.tooltipRow}>
								<ThemedText style={styles.tooltipLabel}>
									Planned Start:
								</ThemedText>
								<ThemedText style={styles.tooltipValue}>
									{formatDate(workOrder.wo_plan_utc_date_start)}
								</ThemedText>
							</View>

							<View style={styles.tooltipRow}>
								<ThemedText style={styles.tooltipLabel}>
									Planned End:
								</ThemedText>
								<ThemedText style={styles.tooltipValue}>
									{formatDate(workOrder.wo_plan_utc_date_end)}
								</ThemedText>
							</View>

							{workOrder.wo_real_utc_date_start && (
								<View style={styles.tooltipRow}>
									<ThemedText style={styles.tooltipLabel}>
										Actual Start:
									</ThemedText>
									<ThemedText style={styles.tooltipValue}>
										{formatDate(workOrder.wo_real_utc_date_start)}
									</ThemedText>
								</View>
							)}

							{workOrder.wo_real_utc_date_end && (
								<View style={styles.tooltipRow}>
									<ThemedText style={styles.tooltipLabel}>
										Actual End:
									</ThemedText>
									<ThemedText style={styles.tooltipValue}>
										{formatDate(workOrder.wo_real_utc_date_end)}
									</ThemedText>
								</View>
							)}

							<View style={styles.tooltipRow}>
								<ThemedText style={styles.tooltipLabel}>Duration:</ThemedText>
								<ThemedText style={styles.tooltipValue}>
									{workOrder.wo_plan_duration} hours
								</ThemedText>
							</View>

							{workOrder.wo_notes && (
								<View style={styles.tooltipRow}>
									<ThemedText style={styles.tooltipLabel}>Notes:</ThemedText>
									<ThemedText style={styles.tooltipValue}>
										{workOrder.wo_notes}
									</ThemedText>
								</View>
							)}

							{workOrder.wo_comment && (
								<View style={styles.tooltipRow}>
									<ThemedText style={styles.tooltipLabel}>Comments:</ThemedText>
									<ThemedText style={styles.tooltipValue}>
										{workOrder.wo_comment}
									</ThemedText>
								</View>
							)}
						</View>
					</ScrollView>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modalOverlay: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		justifyContent: "center",
		alignItems: "center",
	},
	modalContainer: {
		backgroundColor: "white",
		borderRadius: 12,
		width:
			SCREEN_WIDTH < 768
				? Math.max(300, Math.min(SCREEN_WIDTH * 0.95, 500)) // Mobile with min width
				: SCREEN_WIDTH < 1024
					? Math.min(SCREEN_WIDTH * 0.8, 500) // Tablet
					: Math.min(SCREEN_WIDTH * 0.6, 700), // Desktop
		maxHeight:
			SCREEN_WIDTH < 768
				? SCREEN_HEIGHT * 0.8 // Mobile
				: SCREEN_WIDTH < 1024
					? Math.min(SCREEN_HEIGHT * 0.85, 720) // Tablet
					: Math.min(SCREEN_HEIGHT * 0.9, 800), // Desktop
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	tooltipHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderBottomWidth: 1,
		borderBottomColor: "#eee",
		padding:
			SCREEN_WIDTH < 768
				? 12 // Mobile
				: SCREEN_WIDTH < 1024
					? 14 // Tablet
					: 16, // Desktop
		backgroundColor: "#f5f5f5",
		borderTopLeftRadius: 12,
		borderTopRightRadius: 12,
	},
	tooltipTitle: {
		fontWeight: "bold",
		fontSize:
			SCREEN_WIDTH < 768
				? 16 // Mobile
				: SCREEN_WIDTH < 1024
					? 17 // Tablet
					: 18, // Desktop
	},
	closeButton: {
		width:
			SCREEN_WIDTH < 768
				? 28 // Mobile
				: SCREEN_WIDTH < 1024
					? 30 // Tablet
					: 32, // Desktop
		height:
			SCREEN_WIDTH < 768
				? 28 // Mobile
				: SCREEN_WIDTH < 1024
					? 30 // Tablet
					: 32, // Desktop
		borderRadius:
			SCREEN_WIDTH < 768
				? 14 // Mobile
				: SCREEN_WIDTH < 1024
					? 15 // Tablet
					: 16, // Desktop
		backgroundColor: "#ddd",
		justifyContent: "center",
		alignItems: "center",
	},
	closeButtonText: {
		fontSize:
			SCREEN_WIDTH < 768
				? 20 // Mobile
				: SCREEN_WIDTH < 1024
					? 22 // Tablet
					: 24, // Desktop
		lineHeight:
			SCREEN_WIDTH < 768
				? 22 // Mobile
				: SCREEN_WIDTH < 1024
					? 24 // Tablet
					: 26, // Desktop
		textAlign: "center",
	},
	tooltipScrollView: {
		maxHeight:
			SCREEN_WIDTH < 768
				? SCREEN_HEIGHT * 0.6 // Mobile
				: SCREEN_WIDTH < 1024
					? Math.min(SCREEN_HEIGHT * 0.65, 600) // Tablet
					: Math.min(SCREEN_HEIGHT * 0.7, 700), // Desktop
	},
	tooltipContent: {
		padding:
			SCREEN_WIDTH < 768
				? 12 // Mobile
				: SCREEN_WIDTH < 1024
					? 14 // Tablet
					: 16, // Desktop
	},
	tooltipRow: {
		flexDirection: "row",
		marginBottom:
			SCREEN_WIDTH < 768
				? 8 // Mobile
				: SCREEN_WIDTH < 1024
					? 10 // Tablet
					: 12, // Desktop
	},
	tooltipLabel: {
		fontWeight: "bold",
		width:
			SCREEN_WIDTH < 768
				? 100 // Mobile
				: SCREEN_WIDTH < 1024
					? 110 // Tablet
					: 120, // Desktop
		fontSize:
			SCREEN_WIDTH < 768
				? 13 // Mobile
				: SCREEN_WIDTH < 1024
					? 13.5 // Tablet
					: 14, // Desktop
	},
	tooltipValue: {
		flex: 1,
		fontSize:
			SCREEN_WIDTH < 768
				? 13 // Mobile
				: SCREEN_WIDTH < 1024
					? 13.5 // Tablet
					: 14, // Desktop
	},
});
