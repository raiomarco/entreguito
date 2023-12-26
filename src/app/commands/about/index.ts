import { commandData } from "@/types/bot";
import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export const data: commandData = {
	name: "about",
	description: "Replies with information about the bot",
	params: [],
	aliases: ["info"],
	enabled: true,
	category: "util",
	example: "/about",
};

export const slashData = new SlashCommandBuilder()
	.setName(data.name)
	.setDescription(data.description);

export async function execute(interaction: CommandInteraction) {
	await interaction.reply("Track your ordered packages with me :D");
}
