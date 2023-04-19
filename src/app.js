import "dotenv/config";
import express from "express";
import {
	ButtonStyleTypes,
	InteractionResponseType,
	InteractionType,
	MessageComponentTypes,
} from "discord-interactions";
import { VerifyDiscordRequest } from "./utils.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Parse request body and verifies incoming requests using discord-interactions package
app.use(express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY) }));

// Start the server
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});

// IMPORTANT ENDPOINT:
app.get("/hisam", (req, res) => {
	res.send("Hello Sam!");
});

// ACTUAL ENDPOINT:
app.post("/interactions", async function (req, res) {
	// Interaction type and data
	const { type, id, data } = req.body;

	// Handle verification requests
	if (type === InteractionType.PING) {
		return res.send({ type: InteractionResponseType.PONG });
	}

	// Handle command requests
	if (type === InteractionType.APPLICATION_COMMAND) {
		const { name, options } = data;

		// Starting with a test command to try and get this HTTP request working
		if (type === InteractionType.APPLICATION_COMMAND) {
			const { name } = data;

			// "test" command
			if (name === "test") {
				// Send a message into the channel where command was triggered from
				return res.send({
					type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
					data: {
						// Fetches a random emoji to send from a helper function
						content: "This is a test poop poop poop",
					},
				});
			}
		}

		// this is the slash command /message, it will render a couple of buttons
		if (name === "message") {
			// we send the response back to the bot, which is why we need custom_ids to find the buttons later
			return res.send({
				type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
				data: {
					content: "What did you expect to happen? That I would send a message?",
					components: [
						{
							type: MessageComponentTypes.ACTION_ROW, // this is type 1
							components: [
								{
									type: MessageComponentTypes.BUTTON, // this is type 2
									label: "Well.. yes?",
									style: ButtonStyleTypes.PRIMARY,
									custom_id: `yes_button_${id}`,
								},
								{
									type: MessageComponentTypes.BUTTON,
									label: "Of course not!",
									style: ButtonStyleTypes.DANGER,
									custom_id: `no_button_${id}`,
								},
							],
						},
					],
				},
			});
		}
	}
	if (type === InteractionType.MESSAGE_COMPONENT) {
		const componentId = data.custom_id; // this is the custom_id we set in the buttons
		if (componentId.startsWith("yes_button_")) {
			// do something
			try {
				res.send({
					type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
					data: {
						content: "You clicked the button!",
					},
				});
			} catch (error) {
				console.log(error);
			}
		}
		if (componentId.startsWith("no_button_")) {
			// do something else
			try {
				res.send({
					type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
					data: {
						content: "You clicked the button!",
					},
				});
			} catch (error) {
				console.log(error);
			}
		}
	}
});
