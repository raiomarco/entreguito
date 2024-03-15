import type { CommandInteraction, SlashCommandBuilder } from "discord.js";

export type commandData = {
	name: string;
	description: string;
	params: { name: string; description: string; type: string }[];
	aliases: string[];
	enabled: boolean;
	category: string;
	example: string;
};

export type command = {
	data: commandData;
	execute: (interaction: CommandInteraction) => void;
	slashData?: SlashCommandBuilder;
};
