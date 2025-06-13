import { ViewStyle } from "react-native";

export interface Machine {
	machine_id: number;
	machine_name: string;
	machine_type: string;
	site_id: number;
	grp_id: number;
	status: string;
	last_maintenance_utc: string;
	next_maintenance_utc: string;
	location: string;
	serial_number: string;
	notes: string;
}

export interface ManufacturingOrder {
	of_id: number;
	machine_id: number;
	machine_name: string;
	start_datetime_utc: string;
	end_datetime_utc: string;
	mould_cavities: number;
	quantity_to_do: number;
	quantity_started: number;
	quantity_left: number;
	quantity_produced: number;
	quantity_defective: number;
	part_number: string;
	material: string;
	cycle_time_seconds: number;
	status: string;
	site_id: number;
	grp_id: number;
	notes: string;
}

export interface TimeInterval {
	value: number;
	unit: "minute" | "hour" | "day" | "week" | "month";
	primary: boolean;
}

export interface GanttChartProps {
	startDate: string;
	endDate: string;
	machines: Machine[];
	manufacturingOrders: ManufacturingOrder[];
	machineStatusHistory: MachineStatusHistory[];
	style?: ViewStyle;
	onOrderPress?: (order: ManufacturingOrder) => void;
	onTodayPress?: () => void;
	onStatusPress?: () => void;
	onOFPress?: () => void;
	onCyclesPress?: () => void;
}

export interface MachineStatusHistory {
	history_id: number;
	machine_id: number;
	machine_name: string;
	start_datetime_utc: string;
	end_datetime_utc: string;
	site_id: number;
	grp_id: number;
	notes: string;
}

export const TIME_INTERVALS: TimeInterval[] = [
	{ value: 60, unit: "minute", primary: true },
	// { value: 240, unit: 'minute', primary: true }, // 4 hours
	{ value: 480, unit: "minute", primary: true }, // 8 hours
	{ value: 1, unit: "day", primary: true },
	// { value: 2, unit: 'day', primary: true },
	{ value: 7, unit: "day", primary: true },
	// { value: 14, unit: 'day', primary: true },
	// { value: 30, unit: 'day', primary: true },
	// { value: 60, unit: 'day', primary: true },
	// { value: 180, unit: 'day', primary: true },
];
