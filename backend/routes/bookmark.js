const { Router } = require("express");
const { twitterAccountId } = require("../config");
const getRefreshClient = require("../utils/TwitterApi/refreshClient");
const router = Router();

router.get("/", async (req, res) => {
  const refreshedClient = await getRefreshClient();

  try {
    // Take the tweet id from request
    const { tweet_id } = req.query;

    // Bookmark the tweet
    const data = await client.v2.bookmark(tweet_id);
    res.send(data);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
