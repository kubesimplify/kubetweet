const { Router } = require("express");
const getRefreshClient = require("../utils/TwitterApi/refreshClient");
const router = Router();

router.get("/", async (req, res) => {
  const refreshedClient = await getRefreshClient();

  // Take the tweet id from request
  const { id } = req.query;

  try {
    // Delete the tweet
    const { data } = await refreshedClient.v2.deleteTweet(id);
    res.send(data);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
