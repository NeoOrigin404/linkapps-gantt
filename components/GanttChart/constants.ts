import { Dimensions } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// Chart dimensions and styling constants
export const AXIS_HEIGHT = 40;
export const BAR_HEIGHT = 30;
export const BAR_MARGIN = 4;

// Base width for different screen sizes
export const getLabelWidth = (screenWidth: number): number => {
	if (screenWidth <= 300) return 60;
	if (screenWidth <= 768) return 80;
	if (screenWidth <= 1024) return 100;
	return 120;
};

// Initial label width based on initial screen width
export const LABEL_WIDTH = getLabelWidth(SCREEN_WIDTH);

export const MIN_BAR_WIDTH = 20;
export const INTERVAL_SELECTOR_HEIGHT = 50;
export const BOTTOM_PADDING = 20;

// Define colors for different manufacturing order statuses
export const ORDER_STATUS_COLORS = {
	Completed: "#4CAF50", // Green
	"In Progress": "#2196F3", // Blue
	Scheduled: "#FFC107", // Amber
	Delayed: "#F44336", // Red
	default: "#757575", // Grey for unknown statuses
};
