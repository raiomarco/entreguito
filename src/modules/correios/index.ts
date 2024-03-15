// https://api.linketrack.com/track/json?user=teste&token=1abcd00b2731640e886fb41a8a9671ad1434c599dbaa0a0de9a5aa619f29a83f&codigo=NL983534892BR

import { type Package, Update, packageStatus } from "@/types";
import axios from "axios";

import mock from "./mock";

export async function trackPackage({
	trackCode,
}: { trackCode: string }): Promise<Package> {
	let data: typeof mock;
	if (trackCode === "DEV") {
		data = mock;
	} else {
		const request = await axios.get(
			`https://api.linketrack.com/track/json?user=teste&token=1abcd00b2731640e886fb41a8a9671ad1434c599dbaa0a0de9a5aa619f29a83f&codigo=${trackCode}`,
		);

		data = request.data;
	}

	return {};
}
