import React, { useRef, useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import { backendUrl } from "../constants/constant";

const Retweet = () => {
  const [tweetId, setTweetId] = useState("");
  const [previewTweetText, setPreviewTweetText] = useState("");
  const [retweetLoading, setRetweetLoading] = useState(false);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const [unlikeLoading, setUnlikeLoading] = useState(false);
  const tweetIdRef = useRef();

  const likeTweet = async () => {
    if (tweetIdRef.current.value.length < 5) {
      toast.warn("Please enter valid Tweet ID!");
      return;
    }
    setLikeLoading(true);
    fetch(backendUrl + "/like?id=" + tweetId).then((res)=>res.json())
      .then((res) => {
        if (res.data) {
          toast.success("Tweet Liked!");
        } else if (res.errors) {
          toast.error(res.error.errors[0].message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went Wrong 😔");
      })
      .finally(() => {
        setLikeLoading(false);
      });
  };

  const retweet = async () => {
    if (tweetIdRef.current.value.length < 5) {
      toast.warn("Please enter valid Tweet ID!");
      return;
    }
    setRetweetLoading(true);
    fetch(backendUrl + "/retweet?id=" + tweetId).then((res)=>res.json())
      .then((res) => {
        if (res.retweeted) {
          toast.success("Retweeted Successfully!");
        } else if (res.error) {
          toast.error(res.error.errors[0].message);
        }
      })
      .catch((err) => {
        toast.error("Something went Wrong 😔");
      })
      .finally(() => {
        setRetweetLoading(false);
      });
  };

  const previewTweet = () => {
    if (tweetIdRef.current.value.length < 5) {
      toast.warn("Please enter valid Tweet ID");
      return;
    }
    setPreviewTweetText("");
    setPreviewLoading(true);
    fetch(backendUrl + "/getTweet?id=" + tweetId)
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          setPreviewTweetText(res.data.text);
          toast.success("Tweet exist!");
        } else if (res.errors) {
          toast.error(res.errors[0].detail);
        }
      })
      .catch((err) => {
        toast.error("Something went Wrong 😔");
        console.log(err);
      })
      .finally(() => {
        setPreviewLoading(false);
      });
  };

  const unlikeTweet = async () => {
    if (tweetIdRef.current.value.length < 5) {
      toast.warn("Please enter valid Tweet ID!");
      return;
    }
    setUnlikeLoading(true);
    fetch(backendUrl + "/unlike?id=" + tweetId).then((res)=>res.json())
      .then((res) => {
        if (res.data) {
          toast.success("Tweet Unliked!");
        } else if (res.error) {
          toast.error(res.error.errors[0].message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went Wrong 😔");
      })
      .finally(() => {
        setUnlikeLoading(false);
      });
  };
  return (
    <>
      <label>
        Tweet Id :{" "}
        <input
          type="number"
          className="p-2 w-56 border-2 border-black rounded-lg"
          onChange={(e) => setTweetId(e.target.value)}
          ref={tweetIdRef}
        />
        <span onClick={previewTweet} className="px-2 cursor-pointer">
          {previewLoading ? <ClipLoader color="white" size={20} /> : "Preview"}
        </span>
      </label>

      {previewTweetText}

      {/* Retweet Button */}
      {retweetLoading ? (
        <div className="text-center">
          <BeatLoader color="white" />
        </div>
      ) : (
        <button
          className="button"
          onClick={() => retweet()}
        >
          Retweet Tweet
        </button>
      )}

      {/* Like Button */}
      {likeLoading ? (
        <div className="text-center">
          <BeatLoader color="white" />
        </div>
      ) : (
        <button
          className="button"
          onClick={() => likeTweet()}
        >
          Like Tweet
        </button>
      )}

      {/* unLike Button */}
      {unlikeLoading ? (
        <div className="text-center">
          <BeatLoader color="white" />
        </div>
      ) : (
        <button
          className="button"
          onClick={() => unlikeTweet()}
        >
          Unlike Tweet
        </button>
      )}
    </>
  );
};

export default Retweet;
