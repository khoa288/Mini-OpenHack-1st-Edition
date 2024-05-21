const axios = require("axios");

const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_BASE_URL = `https://api.telegram.org/bot${telegramBotToken}`;

function getTelegramAxiosInstance() {
	return {
		get(method, params) {
			return axios.get(`/${method}`, {
				baseURL: TELEGRAM_BASE_URL,
				params,
			});
		},
		post(method, data) {
			return axios.post(`/${method}`, {
				baseURL: TELEGRAM_BASE_URL,
				data,
			});
		},
	};
}

module.exports = { telegramAxiosInstance: getTelegramAxiosInstance() };
