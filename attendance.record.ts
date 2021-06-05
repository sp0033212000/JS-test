// 4. Count total hours worked in 1 day ? // => 39
// 5. Make a function that take as parameters dayTime and return number of employee working // howManyEmployeeByTime(time) => int
// 6. How many days of work needed to done all tasks ? // => 1 day = 9:00 to 00:00 between 00:00 and 09:00 doesnt count.

import { diffTime, getTime } from "./time.helper";

interface EmployeeType {
	id: number;
	name: TimeType;
	work_begin: string;
	work_end: string;
}

interface Employee {
	id: number;
	name: string;
	type: number;
}

interface Task {
	id: number;
	title: string;
	duration: number;
}

type TimeType = "FullTime" | "MidTime" | "HalfTime";

export const employeeType: EmployeeType[] = [
	{ id: 1, name: "FullTime", work_begin: "09:00:00", work_end: "17:00:00" },
	{ id: 2, name: "MidTime", work_begin: "12:00:00", work_end: "21:00:00" },
	{ id: 3, name: "HalfTime", work_begin: "20:00:00", work_end: "00:00:00" },
];

export const employees = [
	{ id: 1, name: "Alice", type: 2 },
	{ id: 2, name: "Bob", type: 3 },
	{ id: 3, name: "John", type: 2 },
	{ id: 4, name: "Karen", type: 1 },
	{ id: 5, name: "Miles", type: 3 },
	{ id: 6, name: "Henry", type: 1 },
];

export const tasks = [
	{ id: 1, title: "task01", duration: 60 },
	{ id: 2, title: "task02", duration: 120 },
	{ id: 3, title: "task03", duration: 180 },
	{ id: 4, title: "task04", duration: 360 },
	{ id: 5, title: "task05", duration: 30 },
	{ id: 6, title: "task06", duration: 220 },
	{ id: 7, title: "task07", duration: 640 },
	{ id: 8, title: "task08", duration: 250 },
	{ id: 9, title: "task09", duration: 119 },
	{ id: 10, title: "task10", duration: 560 },
	{ id: 11, title: "task11", duration: 340 },
	{ id: 12, title: "task12", duration: 45 },
	{ id: 13, title: "task13", duration: 86 },
	{ id: 14, title: "task14", duration: 480 },
	{ id: 15, title: "task15", duration: 900 },
];

export class AttendanceRecord {
	constructor(
		private employeeType: EmployeeType[],
		private employees: Employee[],
		private tasks: Task[]
	) {}

	getTotalWorkedHour() {
		let total = 0;
		this.employeeType.forEach(({ name, work_begin, work_end }) => {
			const beginAt = getTime(work_begin);
			const endAt = getTime(work_end);
			const employeeInTime = this.howManyEmployeeByTime(name);
			total += diffTime(beginAt, endAt).hour * employeeInTime;
		});

		return total;
	}

	getEmployeeTypeId(type: TimeType) {
		return this.employeeType.find(({ name }) => name === type)?.id;
	}

	howManyEmployeeByTime(type: TimeType): number {
		const typeId = this.getEmployeeTypeId(type);
		const employeeInTime = this.employees.filter(({ type }) => type === typeId);
		return employeeInTime.length;
	}

	howManyDaysNeeded(): number {
		const totalTaskHour = this.tasks.reduce<number>((prev, curr) => {
			return prev + curr.duration;
		}, 0);
		const totalWorkedMinuteInDay = this.getTotalWorkedHour() * 60;
		console.log(totalTaskHour, totalWorkedMinuteInDay);

		return totalTaskHour / totalWorkedMinuteInDay;
	}
}

export const newAttendance = new AttendanceRecord(
	employeeType,
	employees,
	tasks
);
