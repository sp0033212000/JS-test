import { isAllSet, isNumberInRange } from "./formatter";

interface Time {
	hour: number;
	minute: number;
	second: number;
}

export const getTime = (time: string): Time => {
	const timeRegex = /(^(?:2[0-3]|[01][0-9])):([0-5][0-9]):([0-5][0-9])$/;
	const timeMatch = timeRegex.exec(time);
	const hour = parseInt(timeMatch[1], 10);
	const minute = parseInt(timeMatch[2], 10);
	const second = parseInt(timeMatch[3], 10);

	if (!isAllSet(hour, minute, second))
		throw new Error("The time format must match 'hh:mm:ss'");
	if (!isNumberInRange(hour, 0, 24, { includeBoundary: true }))
		throw new Error("The hour is 24 hour system");
	if (!isNumberInRange(minute, 0, 60, { includeBoundary: true }))
		throw new Error("The minute must between 0 to 60");
	if (!isNumberInRange(second, 0, 60, { includeBoundary: true }))
		throw new Error("The second must between 0 to 60");

	return {
		hour,
		minute,
		second,
	};
};

export const diffTime = (beginAt: Time, endAt: Time): Time => {
	let hour = endAt.hour - beginAt.hour;
	let minute = endAt.minute - beginAt.minute;
	let second = endAt.second - beginAt.second;

	if (second < 0) {
		minute--;
		second += 60;
	}

	if (minute < 0) {
		hour--;
		minute += 60;
	}

	if (hour < 0) {
		hour += 24;
	}

	return {
		hour,
		minute,
		second,
	};
};
