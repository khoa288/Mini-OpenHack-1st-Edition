const NodeCache = require("node-cache");
const { telegramAxiosInstance } = require("../axios/telegram");

const sessionCache = new NodeCache({ stdTTL: 300 }); // Session timeout set to 5 minutes

function sendMessage(messageObject, messageText) {
	return telegramAxiosInstance.get("sendMessage", {
		params: {
			chat_id: messageObject.chat.id,
			text: messageText,
		},
	});
}

async function handleMessage(messageObject) {
	const messageText = messageObject.text || "";
	const chatId = messageObject.chat.id;
	const session = sessionCache.get(chatId) || {};

	if (messageText.charAt(0) === "/") {
		const command = messageText.substr(1);
		switch (command) {
			case "start":
				sessionCache.del(chatId); // Clear session for a fresh start
				return sendMessage(messageObject, "Welcome!");
			case "payment":
				session.state = "awaitingAmount";
				sessionCache.set(chatId, session);
				return sendMessage(messageObject, "Please enter the NFTs amount:");
			default:
				return sendMessage(messageObject, "Coming soon...");
		}
	} else {
		switch (session.state) {
			case "awaitingAmount":
				session.amount = messageText;
				session.state = "awaitingWallet";
				sessionCache.set(chatId, session);
				return sendMessage(
					messageObject,
					"Please enter your Ethereum wallet address:"
				);
			case "awaitingWallet":
				session.wallet = messageText;
				session.state = "paymentLinkGenerated";
				sessionCache.set(chatId, session);
				const paymentLink = `http://example.com/pay?amount=${session.amount}&wallet=${session.wallet}`;
				return sendMessage(
					messageObject,
					`Here is your payment link: ${paymentLink}`
				);
			default:
				return sendMessage(messageObject, "Invalid message");
		}
	}
}

async function telegramHandler(body) {
	if (body) {
		const messageObject = body.message;
		await handleMessage(messageObject);
	}
}

module.exports = { telegramHandler };
