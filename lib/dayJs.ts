import dayjs from "dayjs";

export function YYYYMMDD(date: string | Date) {
	return dayjs(date).format("YYYY-MM-DD");
}
