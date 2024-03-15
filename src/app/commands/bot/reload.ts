import type { commandData } from "@/types/bot";
import { type CommandInteraction, SlashCommandBuilder } from "discord.js";

export const data: commandData = {
	name: "reload",
	description: "Reloads the bot",
	params: [],
	aliases: [],
	enabled: true,
	category: "adm",
	example: "/bot reload",
};

export async function execute(interaction: CommandInteraction) {
	await interaction.reply("WIP!");
}
