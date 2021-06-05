// 1. Count Employees Number by Factory // => [ {name: 'BR1', count: 4}, ... ]
// 2. Count Factories Number by Employee // => [ {employee: 'John', count: 2}, ... ]
// 3. Order employees list by alphabetical order // =>   { name: "BR2", employees: ["Jessie", "John", "Karen"] }

import { isEmptyAry } from "./formatter";

type Factory = {
	name: string;
	employees: string[];
};

type EmployeeInFactories = {
	employee: string;
	count: number;
};

export const factories: Factory[] = [
	{ name: "BR1", employees: ["John", "Alice", "Bob", "Jessie", "Karen"] },
	{ name: "BR2", employees: ["Jessie", "Karen", "John"] },
	{ name: "BR3", employees: ["Miles", "Eric", "Henry", "Bob"] },
	{ name: "BR4", employees: [] },
];

export class FactoriesHelper {
	constructor(private factories: Factory[]) {}

	countEmployeesByFactory() {
		return this.factories.map((factory) => ({
			name: factory.name,
			count: factory.employees.length,
		}));
	}

	countFactoriesByEmployee(): EmployeeInFactories[] {
		let employeeStore: Record<string, number> = {};

		this.factories.forEach(({ employees }) => {
			if (isEmptyAry(employees)) return;
			employees.forEach((employee) => {
				if (!employeeStore[employee]) employeeStore[employee] = 1;
				else employeeStore[employee]++;
			});
		});

		return Object.keys(employeeStore).map((key) => ({
			employee: key,
			count: employeeStore[key],
		}));
	}

	sortEmployeeByAlphabetical(factory: Factory): Factory {
		const newOrder = factory.employees.sort((a, b) => a.localeCompare(b));

		return { name: factory.name, employees: newOrder };
	}
}
