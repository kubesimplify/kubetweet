const { Router } = require("express");
const getRefreshClient = require("../utils/TwitterApi/refreshClient");
const router = Router();

router.get("/", async (req, res) => {
  const refreshedClient = await getRefreshClient();

  // Take the Reply and Tweet Id from request
  const { replyText } = req.query;
  const { targetTweetId } = req.query;

  // Rwply with TweetId
  try {
    const { data } = await refreshedClient.v2.reply(replyText, targetTweetId);
    res.send(data);
  } catch (error) {
    res.status(400).send(error.data.detail);
  }
});

module.exports = router;
