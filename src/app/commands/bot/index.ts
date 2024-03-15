import type { command, commandData } from "@/types/bot";
import { type CommandInteraction, SlashCommandBuilder } from "discord.js";

import * as reloadCmd from "./reload";
import * as startCmd from "./start";
import * as stopCmd from "./stop";

const subCommands: command[] = [reloadCmd, startCmd, stopCmd];

export const data: commandData = {
	name: "bot",
	description: "Bot related commands",
	params: [],
	aliases: [],
	enabled: true,
	category: "adm",
	example: "/bot <subcommand>",
};

export async function execute(interaction: CommandInteraction) {
	await interaction.reply("You need to specify a subcommand!");
}

const slashData = new SlashCommandBuilder()
	.setName(data.name)
	.setDescription(data.description);

for (const cmd of subCommands) {
	slashData.addSubcommand((subCmd) => {
		subCmd.setName(cmd.data.name).setDescription(cmd.data.description);

		for (const param of cmd.data.params) {
			subCmd.addStringOption((option) => {
				option.setName(param.name).setDescription(param.description);

				return option;
			});
		}

		return subCmd;
	});
}

export { slashData };
