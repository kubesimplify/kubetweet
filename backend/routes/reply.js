const { Router } = require("express");
const getRefreshClient = require("../utils/TwitterApi/refreshClient");
const router = Router();

router.get("/", async (req, res) => {
  const refreshedClient = await getRefreshClient();

  // Take the User Id from request
  const { replyText } = req.query;
  const { targetTweetId } = req.query;

  // follow with UserId
  try {
    const { data } = await refreshedClient.v2.reply(replyText, targetTweetId);
    res.send(data);
  } catch (error) {
    console.log(error);
    res.send(error.data.detail);
  }
});

module.exports = router;
