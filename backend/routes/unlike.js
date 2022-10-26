const { Router } = require("express");
const { twitterAccountId } = require("../config");
const getRefreshClient = require("../utils/TwitterApi/refreshClient");
const router = Router();

router.get("/", async (req, res) => {
  const refreshedClient = await getRefreshClient();

  try {
    // Take the tweet id from request
    const { id } = req.query;

    // Unlike the tweet
    const data = await refreshedClient.v2.unlike(twitterAccountId, id);

    if (data.data.liked == false) {
      res.send(true);
    } else {
      res.send(false);
    }
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
