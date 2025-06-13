import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { addWeeks, subWeeks, format, startOfWeek, endOfWeek } from "date-fns";
import { fr } from "date-fns/locale";

interface DateRangePickerProps {
	onDateRangeChange?: (startDate: Date, endDate: Date) => void;
}

export default function DateRangePicker({
	onDateRangeChange,
}: DateRangePickerProps) {
	const [currentDate, setCurrentDate] = useState(new Date());

	const startDate = startOfWeek(currentDate, { weekStartsOn: 1 });
	const endDate = endOfWeek(currentDate, { weekStartsOn: 1 });

	const handlePreviousWeek = () => {
		const newDate = subWeeks(currentDate, 1);
		setCurrentDate(newDate);
		if (onDateRangeChange) {
			onDateRangeChange(
				startOfWeek(newDate, { weekStartsOn: 1 }),
				endOfWeek(newDate, { weekStartsOn: 1 }),
			);
		}
	};

	const handleNextWeek = () => {
		const newDate = addWeeks(currentDate, 1);
		setCurrentDate(newDate);
		if (onDateRangeChange) {
			onDateRangeChange(
				startOfWeek(newDate, { weekStartsOn: 1 }),
				endOfWeek(newDate, { weekStartsOn: 1 }),
			);
		}
	};

	return (
		<div className="flex items-center space-x-4">
			<button
				type="button"
				onClick={handlePreviousWeek}
				className="p-2 rounded-full hover:bg-gray-100 transition-colors"
				aria-label="Semaine précédente"
			>
				<ChevronLeftIcon className="h-5 w-5 text-gray-600" />
			</button>

			<div className="text-sm font-medium">
				{format(startDate, "d MMM", { locale: fr })} -{" "}
				{format(endDate, "d MMM yyyy", { locale: fr })}
			</div>

			<button
				type="button"
				onClick={handleNextWeek}
				className="p-2 rounded-full hover:bg-gray-100 transition-colors"
				aria-label="Semaine suivante"
			>
				<ChevronRightIcon className="h-5 w-5 text-gray-600" />
			</button>
		</div>
	);
}
