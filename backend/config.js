const TwitterApi = require("twitter-api-v2").default;
const { createClient } = require("@supabase/supabase-js");

const twitterClient = new TwitterApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
});

const readTwitterClient = new TwitterApi(process.env.BEARER_TOKEN);

const supabase = createClient(
  process.env.SUPABASE_PROJECT_URL,
  process.env.SUPABASE_PROJECT_ANON_API_KEY
);

// twitterAccountId should be userId of the your Twitter account
const twitterAccountId = "1571453190197121025";

// You have to enter the same callback Url which you have enter in Twitter Developer Portal  before accessing below endpoints.
const callbackURL = "http://127.0.0.1:5000/callback";

module.exports = {
  supabase,
  twitterClient,
  readTwitterClient,
  twitterAccountId,
  callbackURL,
};
