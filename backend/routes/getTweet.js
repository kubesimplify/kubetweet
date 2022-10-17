const {Router} = require("express");
const { readTwitterClient } = require("../config");
const router = Router();

router.get("/",async (req, res) => {
  const { id } = req.query;
  // const id = "1573134820435447808"
  const data = await readTwitterClient.v2.singleTweet(id);
  res.send(data);
});

module.exports = router;
