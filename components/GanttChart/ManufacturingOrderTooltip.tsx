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
import { ManufacturingOrder } from "./types";
import { format, parseISO } from "date-fns";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

interface ManufacturingOrderTooltipProps {
	order: ManufacturingOrder | null;
	visible: boolean;
	onClose: () => void;
}

export const ManufacturingOrderTooltip: React.FC<
	ManufacturingOrderTooltipProps
> = ({ order, visible, onClose }) => {
	if (!order) return null;

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
			<TouchableOpacity
				style={styles.modalOverlay}
				activeOpacity={1}
				onPress={onClose}
			>
				<TouchableOpacity
					activeOpacity={1}
					onPress={(e) => e.stopPropagation()}
				>
					<View style={styles.modalContainer}>
						<View style={styles.tooltipHeader}>
							<ThemedText style={styles.tooltipTitle}>
								{order.part_number}
							</ThemedText>
							<TouchableOpacity onPress={onClose} style={styles.closeButton}>
								<ThemedText style={styles.closeButtonText}>×</ThemedText>
							</TouchableOpacity>
						</View>

						<ScrollView style={styles.tooltipScrollView}>
							<View style={styles.tooltipContent}>
								<View style={styles.tooltipRow}>
									<ThemedText style={styles.tooltipLabel}>Machine:</ThemedText>
									<ThemedText style={styles.tooltipValue}>
										{order.machine_name}
									</ThemedText>
								</View>

								<View style={styles.tooltipRow}>
									<ThemedText style={styles.tooltipLabel}>Status:</ThemedText>
									<View style={styles.statusContainer}>
										<View
											style={[
												styles.statusDot,
												{ backgroundColor: getStatusColor(order.status) },
											]}
										/>
										<ThemedText style={styles.tooltipValue}>
											{order.status}
										</ThemedText>
									</View>
								</View>

								<View style={styles.tooltipRow}>
									<ThemedText style={styles.tooltipLabel}>Start:</ThemedText>
									<ThemedText style={styles.tooltipValue}>
										{formatDate(order.start_datetime_utc)}
									</ThemedText>
								</View>

								<View style={styles.tooltipRow}>
									<ThemedText style={styles.tooltipLabel}>End:</ThemedText>
									<ThemedText style={styles.tooltipValue}>
										{formatDate(order.end_datetime_utc)}
									</ThemedText>
								</View>

								<View style={styles.tooltipRow}>
									<ThemedText style={styles.tooltipLabel}>Material:</ThemedText>
									<ThemedText style={styles.tooltipValue}>
										{order.material}
									</ThemedText>
								</View>

								<View style={styles.tooltipRow}>
									<ThemedText style={styles.tooltipLabel}>Quantity:</ThemedText>
									<ThemedText style={styles.tooltipValue}>
										{order.quantity_produced} / {order.quantity_to_do} (
										{order.quantity_defective} defective)
									</ThemedText>
								</View>

								<View style={styles.tooltipRow}>
									<ThemedText style={styles.tooltipLabel}>
										Cycle Time:
									</ThemedText>
									<ThemedText style={styles.tooltipValue}>
										{order.cycle_time_seconds} seconds
									</ThemedText>
								</View>

								<View style={styles.tooltipRow}>
									<ThemedText style={styles.tooltipLabel}>Cavities:</ThemedText>
									<ThemedText style={styles.tooltipValue}>
										{order.mould_cavities}
									</ThemedText>
								</View>

								{order.notes && (
									<View style={styles.tooltipRow}>
										<ThemedText style={styles.tooltipLabel}>Notes:</ThemedText>
										<ThemedText style={styles.tooltipValue}>
											{order.notes}
										</ThemedText>
									</View>
								)}
							</View>
						</ScrollView>
					</View>
				</TouchableOpacity>
			</TouchableOpacity>
		</Modal>
	);
};

// Helper function to get color based on order status
const getStatusColor = (status: string) => {
	switch (status) {
		case "Completed":
			return "#4CAF50"; // Green
		case "In Progress":
			return "#2196F3"; // Blue
		case "Scheduled":
			return "#FFC107"; // Amber
		case "Delayed":
			return "#F44336"; // Red
		default:
			return "#757575"; // Grey
	}
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
					? Math.min(SCREEN_WIDTH * 0.8, 600) // Tablet
					: Math.min(SCREEN_WIDTH * 0.6, 800), // Desktop
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
	statusContainer: {
		flexDirection: "row",
		alignItems: "center",
		flex: 1,
	},
	statusDot: {
		width:
			SCREEN_WIDTH < 768
				? 8 // Mobile
				: SCREEN_WIDTH < 1024
					? 9 // Tablet
					: 10, // Desktop
		height:
			SCREEN_WIDTH < 768
				? 8 // Mobile
				: SCREEN_WIDTH < 1024
					? 9 // Tablet
					: 10, // Desktop
		borderRadius:
			SCREEN_WIDTH < 768
				? 4 // Mobile
				: SCREEN_WIDTH < 1024
					? 4.5 // Tablet
					: 5, // Desktop
		marginRight:
			SCREEN_WIDTH < 768
				? 6 // Mobile
				: SCREEN_WIDTH < 1024
					? 7 // Tablet
					: 8, // Desktop
	},
});
