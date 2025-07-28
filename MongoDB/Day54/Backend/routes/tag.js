const express = require("express");
const {getPostByTag, getPostByMultipleTags} = require("../controllers/tagController");

const router = express.Router();

router.get("/:tag", getPostByTag);
router.get("", getPostByMultipleTags);


module.exports = router;