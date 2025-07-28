const express = require("express");
const {getPostByTag} = require("../controllers/tagController");

const router = express.Router();

router.get("/:tag", getPostByTag);


module.exports = router;