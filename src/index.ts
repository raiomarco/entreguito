import "dotenv/config";

import { commandLoader } from "@/app/commands";
import { Client, GatewayIntentBits } from "discord.js";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on("ready", () => {
	console.log(`Logged in as ${client.user?.tag}!`);

	commandLoader(client.user?.id as string);
});

client.on("interactionCreate", async (interaction) => {
	if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName === "ping") {
		await interaction.reply("Pong!");
	}

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({
				content: "There was an error while executing this command!",
				ephemeral: true,
			});
		} else {
			await interaction.reply({
				content: "There was an error while executing this command!",
				ephemeral: true,
			});
		}
	}
});

client.login(process.env.DISCORD_TOKEN);

// import { trackPackage as trackPackageAzul } from "./modules/azulCargoExpress";
// import { trackPackage as trackPackageSedex } from "./modules/correios";
// import { trackPackage as trackPackageIcaro } from "./modules/icaroExpress";

// async function main() {
// 	const dataIcaro = await trackPackageIcaro({
// 		trackCode: "DEV",
// 		cpf: "07509854539",
// 	});
// 	const dataSedex = await trackPackageSedex({ trackCode: "DEV" });
// 	// const dataAzul = await trackPackageAzul({ trackCode: "DEV" });

// 	console.log(dataIcaro);
// 	console.log(dataSedex);
// }

// main();
