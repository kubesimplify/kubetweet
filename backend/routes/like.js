const { Router } = require("express");
const { twitterAccountId } = require("../config");
const getRefreshClient = require("../utils/TwitterApi/refreshClient");
const router = Router();

router.get("/", async (req, res) => {
  const refreshedClient = await getRefreshClient();

  try {
    // Take the tweet id from request
    const { id } = req.query;

    // Like the tweet
    const data = await refreshedClient.v2.like(twitterAccountId, id);
    res.send(data);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
