import { commandData } from "@/types/bot";
import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export const data: commandData = {
	name: "stop",
	description: "Stop the queue if it's running",
	params: [],
	aliases: [],
	enabled: true,
	category: "adm",
	example: "/bot stop",
};

export async function execute(interaction: CommandInteraction) {
	await interaction.reply("WIP!");
}
