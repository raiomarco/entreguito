import { command, commandData } from "@/types/bot";
import { CommandInteraction, SlashCommandBuilder } from "discord.js";

const subCommands: command[] = [];

export const data: commandData = {
	name: "profile",
	description: "Profile related commands",
	params: [],
	aliases: ["user"],
	enabled: true,
	category: "user",
	example: "/profile <subcommand>",
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
