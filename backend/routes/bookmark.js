
const { Router } = require("express");
const getRefreshClient = require("../utils/TwitterApi/refreshClient");
const router = Router();

router.get("/", async (req, res) => {
  const refreshedClient = await getRefreshClient();

  try {
    // Take the tweet id from request
    const { tweet_id } = req.query;

    // bookmark the tweet
    const data = await refreshedClient.v2.bookmark(tweet_id);
    res.send(data);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
