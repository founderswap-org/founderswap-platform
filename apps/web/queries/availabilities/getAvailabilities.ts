import {
	type Availabilities,
	getFirstAndLastDay,
} from "@/utils/getNextWeekDays";
import type { TypedSupabaseClient } from "@/utils/types";

export async function getAvailabilities(
	supabase: TypedSupabaseClient,
	days: Availabilities,
	userId: string,
) {
	const { firstDay, lastDay } = getFirstAndLastDay(days);

	const { data } = await supabase
		.from("availabilities")
		.select("*")
		.eq("user_id", userId)
		.gte("slot", firstDay.toISOString())
		.lte("slot", lastDay.toISOString())
		.throwOnError();

	if (!data) {
		throw new Error("No data found");
	}

	return data;
}
