const express = require("express");

require("dotenv").config();

const telegramRouter = require("./controller/telegram");
const payosRouter = require("./controller/payos");

// Initialize Express app.
const app = express();
app.use(express.json());

// Telegram route
app.use("/telegram", telegramRouter);
app.use("/payos", payosRouter);

// Default route for unmatched routes
app.all("*", (req, res) => {
	res.status(404).json({ message: "Route not found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({ message: "Internal server error" });
});

module.exports = app;
