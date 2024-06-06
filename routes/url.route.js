const express = require("express");
const {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  handleGetAllURL,
  handleDelete
} = require("../controller/url");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, handleGenerateNewShortURL);
router.post("/all", auth, handleGetAllURL);

router.get("/:id", auth, handleGetAnalytics);
router.delete("/:id", auth, handleDelete);

module.exports = router;
