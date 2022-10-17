const { Router } = require("express");
const { twitterAccountId } = require("../config");
const getRefreshClient = require("../utils/TwitterApi/refreshClient");
const router = Router();

router.get("/", async (req, res) => {
  const refreshedClient = await getRefreshClient();

  // Take the TweetId from the request and Retweet the tweet
  try {
    const { id } = req.query;
    const { data } = await refreshedClient.v2.retweet(twitterAccountId, id);
    res.send(data);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
