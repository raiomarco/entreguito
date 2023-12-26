import { Company, Package, Update, packageStatus } from "@/types";
import axios from "axios";

import mock from "./mock";

export async function trackPackage({
	trackCode,
	cpf,
}: { trackCode: string; cpf: string }): Promise<Package> {
	let data: typeof mock;
	if (trackCode === "DEV") {
		data = mock;
	} else {
		const request = await axios.post(
			"https://icaroexpress.com.br/rastreamento/rastreamento.php",
			{
				tipo: "destinatario",
				cnpj: cpf,
				documento: trackCode,
			},
			{ headers: { "content-type": "application/x-www-form-urlencoded" } },
		);

		data = request.data;
	}

	const updates: Update[] = data.dados.ocorrencias.map((update) => {
		const date = new Date(`${update.data} ${update.hora}`);

		return {
			date: date,
			info: update.evento,
			subStatus: [update.obs],
		};
	});

	const forecast = new Date(data.dados.previsao_entrega);

	return {
		company: Company.ICARO_EXPRESS,
		weight: data.dados.peso,
		trackCode: trackCode,
		status: packageStatus.UNKNOWN,
		history: updates,
		forecast: forecast,
	};
}
