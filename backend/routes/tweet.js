const { Router } = require("express");
const getRefreshClient = require("../utils/TwitterApi/refreshClient");
const router = Router();

router.get("/", async (req, res) => {
  const refreshedClient = await getRefreshClient();

  // Take the tweet text from request
  const { text } = req.query;

  // tweet with text
  const { data } = await refreshedClient.v2.tweet(text);
  res.send(data);
});

module.exports = router;
