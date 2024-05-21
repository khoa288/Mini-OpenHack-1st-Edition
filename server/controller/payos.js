const router = require("express").Router();

router.post("/", async (req, res) => {
	console.log(req.body);
	res.json();
});

router.get("/", async (req, res) => {
	console.log(req.body);
	res.json();
});

module.exports = router;
