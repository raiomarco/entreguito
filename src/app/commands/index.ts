import type { command } from "@/types/bot";
import { REST, Routes } from "discord.js";

import * as about from "./about";

import * as bot from "./bot";
import * as reload from "./bot/reload";
import * as start from "./bot/start";
import * as stop from "./bot/stop";

import * as packageCmd from "./package";
import * as add from "./package/add";
// import * as remove from "./package/remove";
// import * as list from "./package/list";
// import * as info from "./package/info";
// import * as edit from "./package/edit";
// import * as pause from "./package/pause";
// import * as resume from "./package/resume";
// import * as track from "./package/track";

import * as profile from "./profile";
import * as edit from "./profile/edit";
// import * as info from "./profile/info";

const commands: command[] = [
	about,
	bot,
	packageCmd,
	profile,
	add,
	reload,
	start,
	stop,
	edit,
];

export async function commandLoader(CLIENT_ID: string) {
	if (process.env.REFRESH_CMDS_SKIP)
		return console.log("Skipping command refresh");

	const mainCommands = commands
		.filter((cmd) => cmd.slashData)
		.map((cmd) => cmd.slashData?.toJSON());

	const rest = new REST({ version: "10" }).setToken(
		process.env.DISCORD_TOKEN as string,
	);

	try {
		console.log(
			`Started refreshing ${mainCommands.length} application (/) commands.`,
		);

		const data = (await rest.put(Routes.applicationCommands(CLIENT_ID), {
			body: mainCommands,
		})) as Array<unknown>;

		console.log(
			`Successfully reloaded ${data.length} application (/) commands.`,
		);
	} catch (error) {
		console.error(error);
	}
}
