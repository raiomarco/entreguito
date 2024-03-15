import prisma from "@/modules/db";
import type { commandData } from "@/types/bot";
import { packageStatus } from "@prisma/client";
import type { CommandInteraction } from "discord.js";

export const data: commandData = {
	name: "add",
	description: "Add a package to track",
	params: [
		{
			name: "trackCode",
			description: "The code of the package to track",
			type: "STRING",
		},
		{
			name: "company",
			description: "The company of the package to track",
			type: "STRING",
		},
	],
	aliases: [],
	enabled: true,
	category: "packages",
	example: "/package add <trackCode>",
};

export async function execute(interaction: CommandInteraction) {
	// get the trackCode from the interaction
	const trackCode = interaction.options.get("trackCode");
	// get the company from the interaction
	const company = interaction.options.get("company");
	// get the user from the interaction
	const userId = interaction.user.id;

	if (!trackCode) {
		await interaction.reply("You need to provide a trackCode");
		return;
	}

	await prisma.package.create({
		data: {
			user: {
				connectOrCreate: {
					where: {
						id: userId,
					},
					create: {
						id: userId,
					},
				},
			},
			trackCode: trackCode as unknown as string,
			// TODO: Setup proper company validation
			// biome-ignore lint/suspicious/noExplicitAny: Missing proper validation
			company: company as any,
			status: packageStatus.PENDING,
		},
	});

	await interaction.reply("WIP!");
}
