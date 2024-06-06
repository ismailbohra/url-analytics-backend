const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const URL = require("./model/url.model");
const urlRoute = require("./routes/url.route");
const userRoute = require("./routes/user.route");
const cors = require("cors");

app.use(express.json());
app.use(express.static("./public"));
app.use(cors());

mongoose.connect(process.env.DB_URL).then(() => {
  console.log("DB connected Successfully");
  app.listen(PORT, () => {
    console.log(`Server Running on PORT ${PORT}`);
  });
});

app.use("/url", urlRoute);
app.use("/user", userRoute);

const useragent = require("express-useragent");

app.use(useragent.express());

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  let ipAddress =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    "0.0.0.0/0";
  const deviceType = req.useragent.isMobile
    ? "Mobile"
    : req.useragent.isDesktop
    ? "Desktop"
    : "Unknown";
  if (ipAddress.substr(0, 7) === "::ffff:") {
    ipAddress = ipAddress.substr(7);
  }

  const referer = req.headers['referer']?req.headers['referer']:"Unknown";
  const timestamp = new Date().toISOString();
  console.log(ipAddress, deviceType,referer);
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        history: {
          ipaddress: ipAddress,
          deviceType: deviceType,
          timestamp: timestamp,
          referer:referer
        },
      },
    }
  );
  if (!entry) return res.status(400).json({ error: "internal server error" });
  res.redirect(entry.redirect);
});
