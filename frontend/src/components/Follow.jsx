import React, { useRef, useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import { backendUrl } from "../constants/constant";

const Follow = () => {
  const [userId, setUserId] = useState();
  const [username, setUsername] = useState();
  const [previewUserLoading, setPreviewUserLoading] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const [unfollowLoading, setUnfollowLoading] = useState(false);
  const tweetIdRef = useRef();

  const previewUser = () => {
    if (tweetIdRef.current.value.length < 2) {
      toast.warn("Please enter valid UserName!");
      return;
    }
    setPreviewUserLoading(true);
    setUsername("");
    setUserId("");
    const username = tweetIdRef.current.value;
    fetch(`${backendUrl}/userid?username=${username}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setUsername(data.data.name);
          setUserId(data.data.id);
          toast.success("User exist!");
        } else {
          toast.error(data);
        }
      })
      .finally(() => setPreviewUserLoading(false));
  };

  const followUser = () => {
    if (!userId) {
      toast.warn("Please enter correct username");
      return;
    }
    setFollowLoading(true);
    fetch(`${backendUrl}/follow?targetUserId=${userId}`)
      .then((res) => res.text())
      .then((data) => {
        if (data === "true") {
          toast.success(`Followed ${username} Successfully!`);
        }
      })
      .finally(() => setFollowLoading(false));
  };

  

  return (
    <>
      <label>
        Username :{" "}
        <input
          type="text"
          className="p-2 w-56 border-2 border-black rounded-lg"
          ref={tweetIdRef}
        />
        <span onClick={previewUser} className="px-2 cursor-pointer">
          {previewUserLoading ? (
            <ClipLoader color="white" size={20} />
          ) : (
            "Preview"
          )}
        </span>
      </label>

      {username && `Name = ${username}`}

      {followLoading ? (
        <div className="text-center">
          <BeatLoader color="white" />
        </div>
      ) : (
        <button className="button" onClick={followUser}>
          Follow {username ? username : "user"}
        </button>
      )}

      
    </>
  );
};

export default Follow;
