const { Router } = require("express");
const { twitterClient, supabase, callbackURL } = require("../config");
const router = Router();

router.get("/", async (req, res) => {
  // to generate the OAuth2.0 Link with these permissions and get the state and codeverifier token
  const { url, codeVerifier, state } = twitterClient.generateOAuth2AuthLink(
    callbackURL,
    {
      scope: [
        "tweet.read",
        "tweet.write",
        "users.read",
        "offline.access",
        "like.write",
        "follows.write",
      ],
    }
  );

  // store both the code and codeverifier code on supabase database
  const { data, error } = await supabase
    .from("states")
    .update({ statecode: state, code_verifier: codeVerifier })
    .eq("id", "1")
    .single();

  // After authorisation, redirect the user to callback Url to generate access and refresh token
  res.redirect(url);
});

module.exports = router;
