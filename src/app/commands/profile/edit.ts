import prisma from "@/modules/db";
import type { commandData } from "@/types/bot";
import { type CommandInteraction, SlashCommandBuilder } from "discord.js";

export const data: commandData = {
	name: "edit",
	description: "Edit your profile",
	params: [
		{
			name: "cpf",
			description: "your CPF, used by some companies to track your package",
			type: "STRING",
		},
	],
	aliases: [],
	enabled: true,
	category: "packages",
	example: "/package add <trackCode>",
};

export async function execute(interaction: CommandInteraction) {
	// get the cpf from the interaction
	const cpf = interaction.options.get("cpf");
	// get the user from the interaction
	const userId = interaction.user.id;

	if (!cpf) {
		await interaction.reply("You need to provide a CPF");
		return;
	}

	await prisma.user.upsert({
		where: { id: userId },
		update: { cpf: cpf as unknown as string },
		create: { id: userId, cpf: cpf as unknown as string },
	});

	await interaction.reply("User edited successfully!");
}
