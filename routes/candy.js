const express = require("express");

const candyController = require("../controller/candy");

const router = express.Router();

router.get("/get-candy", candyController.getCandy);

router.put("/put-candy/:id/:amount", candyController.putCandy);

router.post("/add-candy", candyController.postCandy);

module.exports = router;
