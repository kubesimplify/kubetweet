const { Router } = require("express");
const { readTwitterClient } = require("../config");
const getRefreshClient = require("../utils/TwitterApi/refreshClient");
const router = Router();

router.get("/", async (req, res) => {
  const refreshedClient = await getRefreshClient();

  // Take the tweet id from request
  const { id } = req.query;

  const data1 = await readTwitterClient.v2.singleTweet(id);

  // Check if Tweet Exist

  if (data1.data) {
    try {
      // Delete the tweet
      const { data } = await refreshedClient.v2.deleteTweet(id);
      res.send(data);
    } catch (error) {
      res.send(error.data.detail);
    }
  } else {
    res.send("Tweet Does not Exist");
  }
});

module.exports = router;
