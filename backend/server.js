const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { supabase, twitterClient } = require("./config");

const app = express();
const port = 5000;

// Api can be only accessible from these origins
// after deployment, add the Deployed frontend Url here
const whitelist = [
  "http://localhost:5000",
  "http://127.0.0.1:5000",
  "http://localhost:3000",
];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/auth", require("./routes/auth"));
app.use("/callback", require("./routes/callback"));
app.use("/tweet", require("./routes/tweet"));
app.use("/like", require("./routes/like"));
app.use("/retweet", require("./routes/retweet"));
app.use("/getTweet", require("./routes/getTweet"));
app.use("/schedule", require("./routes/schedule"));
app.use("/thread", require("./routes/createThread"));
app.use("/follow", require("./routes/follow"));
app.use("/reply", require("./routes/reply"));
app.use("/unfollow", require("./routes/unfollow"));
app.use("/userid", require("./routes/userid"));
app.use("/unlike", require("./routes/unlike"));
app.use("/unbookmark", require("./routes/unbookmark"));
app.use("/deleteTweet", require("./routes/deleteTweet"));
app.use("/bookmark", require("./routes/bookmark.js"));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
