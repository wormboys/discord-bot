import "dotenv/config";
import { DiscordRequest } from "./utils.js";

async function createCommands() {
	const appId = process.env.APP_ID;

	// There are two endpoints we can use to register commands, global and guild.
	// Global commands are available for every guild that adds the bot.
	const globalEndpoint = `applications/${appId}/commands`;
	// const guildEndpoint = `applications/${appId}/guilds/${guildId}/commands`;

	const commands = [
		// can we automate this?
		{
			name: "test",
			description: "Simple test command",
			type: 1,
		},
		{
			name: "message",
			description: "Send a message, with buttons",
			type: 1,
		},
	];

	try {
		// Send HTTP request with bot token
		const res = await DiscordRequest(globalEndpoint, {
			method: "PUT",
			body: commands,
		});
		console.log(await res.json());
	} catch (err) {
		console.error("Error installing commands: ", err);
	}
}

async function getAllCommands() {
	const appId = process.env.APP_ID;
	const globalEndpoint = `applications/${appId}/commands`;

	try {
		// Send HTTP request with bot token
		const res = await DiscordRequest(globalEndpoint, {
			method: "GET",
		});
		console.log(await res.json());
	} catch (err) {
		console.error("Error getting commands: ", err);
	}
}

async function deleteCommand(commandId) {
	const appId = process.env.APP_ID;
	const globalEndpoint = `applications/${appId}/commands/${commandId}`;

	try {
		// Send HTTP request with bot token
		const res = await DiscordRequest(globalEndpoint, {
			method: "DELETE",
		});
		console.log(await res.json());
	} catch (err) {
		console.error("Error deleting commands: ", err);
	}
}

createCommands();
