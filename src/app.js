import "dotenv/config";
import express from "express";
import { VerifyDiscordRequest } from "./utils.js";

// Create an express app
const app = express();
// Get port, or default to 3000
const PORT = process.env.PORT || 3001;
// Parse request body and verifies incoming requests using discord-interactions package
app.use(express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY) }));

// Start the server
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});

app.get("/hisam", (req, res) => {
	res.send("Hello Sam!");
});
