const express = require("express");
const router = express.Router();
const controller = require("../controllers/folderController");

router.get("/", controller.getTree);
router.post("/", controller.create);
router.put("/:id", controller.rename);
router.delete("/:id", controller.deleteItem);

module.exports = router;
