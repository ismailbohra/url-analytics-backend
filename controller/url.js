const shortid = require("shortid");
const URL = require("../model/url.model");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });

  const url = await URL.create({
    userId: req.user,
    redirect: body.url,
    purpose: body.purpose,
    alias: body.alias,
  });

  return res.json({ id: url.shortId });
}
async function handleGetAllURL(req, res) {
  const url = await URL.find({
    userId: req.user,
  });

  return res.json({ status: 1, msg: "Successful", url });
}
async function handleDelete(req, res) {
  try {
    const url = await URL.deleteOne({ _id: req.params.id });

    if (url.deletedCount === 0) {
      return res.status(404).json({ status: 0, msg: "URL not found",id:req.params.id });
    }

    return res.json({ status: 1, msg: "Successful" });
  } catch (error) {
    console.error("Error deleting URL:", error);
    return res.status(500).json({ status: 0, msg: "Internal Server Error" });
  }
}

async function handleGetAnalytics(req, res) {
  const id = req.params.id;
  const result = await URL.findOne({ _id:id });
  return res.json({
    totalClicks: result.history.length,
    analytics: result.history,
  });
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  handleGetAllURL,
  handleDelete,
};
