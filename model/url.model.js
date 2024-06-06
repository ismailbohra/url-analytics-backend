const mongoose = require("mongoose");
const shortid = require("shortid");

const UrlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      unique: true,
      default: shortid.generate,
    },
    userId: {
      type: String,
      required:true
    },
    history: [
      {
        ipaddress: { type: String },
        timestamp: { type: String },
        deviceType:{ type: String },
        referer:{ type: String }
      },
    ],
    redirect: {
      type: String,
      required: true,
    },
    purpose: {
      type: String,
      default: "general",
    },
    alias: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Url = mongoose.model("Url", UrlSchema);

module.exports = Url;
