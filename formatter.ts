export const isArray = (ary: unknown[]) => {
	const getType = {};
	return ary && getType.toString.call(ary) === "[object Array]";
};

export const isEmptyAry = (obj: unknown[]) => {
	if (!isArray(obj)) throw new Error("The obj are not array");

	return obj.length === 0;
};

export const isSet = (obj: any): boolean => {
	return obj !== undefined && obj !== null && !isNaN(obj);
};

export const isAllSet = (...arg: unknown[]): boolean => {
	if (arg.length === 0) false;
	const hasntSettle = arg.filter((v) => !isSet(v));
	return isEmptyAry(hasntSettle);
};

export const isNumberInRange = (
	target,
	begin: number,
	end: number,
	option?: { includeBoundary?: boolean }
): boolean => {
	if (option?.includeBoundary) {
		begin--;
		end++;
	}
	return begin < target && target < end;
};
