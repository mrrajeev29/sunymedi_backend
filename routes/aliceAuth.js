const router = require("express").Router();
const { Alice,validate } = require("../models/Alice");
const bcrypt = require("bcrypt");
 
router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const alice = await Alice.findOne({ alice: req.body.alice });
		if (alice)
			return res
				.status(409)
				.send({ message: "User with given alice already Exist!" });

		//const salt = await bcrypt.genSalt(Number(6));
		//const hashPassword = await bcrypt.hash(req.body.password, salt);
		//console.log(hashPassword)
		await new Alice({ ...req.body}).save();

		res.status(201).send({ message: "New Alice created successfully" });
	} catch (error) {
		console.log(error)
		res.status(500).send({ message: "Internal Server Error" });
	}
}); 

module.exports = router;