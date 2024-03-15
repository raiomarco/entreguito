import type { commandData } from "@/types/bot";
import { type CommandInteraction, SlashCommandBuilder } from "discord.js";

export const data: commandData = {
	name: "start",
	description: "Starts the queue if it's not already started",
	params: [],
	aliases: [],
	enabled: true,
	category: "adm",
	example: "/bot start",
};

export async function execute(interaction: CommandInteraction) {
	await interaction.reply("WIP!");
}
