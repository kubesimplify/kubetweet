const { Router } = require("express");
const getRefreshClient = require("../utils/TwitterApi/refreshClient");
const router = Router();

router.get("/", async (req, res) => {
  const refreshedClient = await getRefreshClient();

  // Take the tweet text from request
  const { text } = req.query;

  // tweet with text
  const { data } = await refreshedClient.v2.tweetThread([
    "Hello, lets talk about Twitter!",
    "Twitter is a fantastic social network. Look at this:",
    "This thread is automatically made with twitter-api-v2 :D",
  ]);
  res.send(data);
});

module.exports = router;
