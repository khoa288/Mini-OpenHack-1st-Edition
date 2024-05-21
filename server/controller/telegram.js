const router = require("express").Router();
const { telegramHandler } = require("../handler/telegram");

router.post("/", async (req, res) => {
	console.log(req.body);
	res.send(await telegramHandler(req.body));
});

router.get("/", async (req, res) => {
	console.log(req.body);
	res.send(await telegramHandler(req.body));
});

module.exports = router;
