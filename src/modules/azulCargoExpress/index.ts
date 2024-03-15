import axios from "axios";
import * as cheerio from "cheerio";
import * as chrono from "chrono-node";

import { Company, type Package, type Update, packageStatus } from "@/types";

import fs from "node:fs";
import path from "node:path";

const company = Company.AZUL;

enum statusSource {
	DELIVERED = "Entrega Realizada",
	OUT_FOR_DELIVERY = "Saiu para Entrega",
	DESTINATION = "Base de Destino",
	IN_TRANSIT = "Trânsito",
	PREPARATION = "Preparação",
}

const statusMap = {
	[statusSource.DELIVERED]: packageStatus.DELIVERED,
	[statusSource.OUT_FOR_DELIVERY]: packageStatus.IN_TRANSIT,
	[statusSource.DESTINATION]: packageStatus.IN_TRANSIT,
	Trânsito: packageStatus.IN_TRANSIT,
	Preparação: packageStatus.PENDING,
};

export async function trackPackage({
	trackCode,
}: { trackCode: string }): Promise<Package> {
	let $: cheerio.CheerioAPI;
	if (trackCode === "DEV") {
		// load html from local ./index.html file for development
		const file = fs.readFileSync(path.resolve(__dirname, "mock.html"), "utf8");

		$ = cheerio.load(file);
	} else {
		const request = await axios.post(
			"https://www.azulcargoexpress.com.br/Rastreio/Rastreio/Rastrear",
			{
				Awbs: [trackCode],
				BuscarRastreioPor: "awb",
			},
			{ headers: { "content-type": "application/x-www-form-urlencoded" } },
		);

		$ = cheerio.load(request.data);
	}

	// const estados = [
	// 	...$("div.dadosDetalhados.detalhadoNormal")
	// 		.children(".titulo")
	// 		.map((i, el) => {
	// 			const status = el.attribs.class.trim().split(" ").includes("sucesso");

	// 			const text = $(el).text().trim().replace(/\s\s+/g, " ");

	// 			return {
	// 				title: text,
	// 				status: status,
	// 			};
	// 		}),
	// ];

	const updates: Update[] = [
		...$("div.dadosDetalhados.detalhadoNormal")
			.children()
			.not(".titulo")
			.map((i, el) => {
				const date = $(el)
					.find(".dataStatus > p")
					.text()
					.trim()
					.replace(/\s\s+/g, " ");
				const parsedDate = chrono.pt.parseDate(date);

				const title = $(el)
					.find(".tituloDescricao")
					.text()
					.trim()
					.replace(/\s\s+/g, " ");

				const volumes = $(el)
					.find("div.descricaoStatus > p:nth-child(3)")
					.text()
					.trim()
					.replace(/\s\s+/g, " ")
					.split(" ")[1];

				return {
					info: title,
					date: parsedDate,
					subStatus: [volumes],
				};
			}),
	];

	const [, origem, , destino] = [
		...$("div.dadosOrigemDestino")
			.first()
			.children()
			.map((i, el) => {
				const text = $(el).text().trim().replace(/\s\s+/g, " ");

				return text;
			}),
	];

	const data = [
		...$(" div.infoDetalhadas")
			.find("div.grupoInformacao")
			.map((i, el) => {
				if (i === 0) return null;

				const label = $(el)
					.children()
					.first()
					.text()
					.trim()
					.replace(/\s\s+/g, " ");
				const data = $(el)
					.children()
					.last()
					.text()
					.trim()
					.replace(/\s\s+/g, " ")
					.replace(" copiar", "");

				return {
					label: label,
					data: data,
				};
			}),
	];

	const forecast = chrono.pt.parseDate(
		$("p.previsaoEntrega > span").first().text().trim().replace(/\s\s+/g, " "),
	);

	const status =
		statusMap[
			data.find((d) => d.label.includes("Status"))?.data as statusSource
		];

	const weight = data.find((d) => d.label.includes("Peso"))?.data;

	return {
		trackCode: trackCode,
		origin: origem,
		destination: destino,
		status: status,
		history: updates,
		forecast: forecast,
		company: company,
		weight: weight,
	};
}
