import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import Logout from "./Logout";
import Tweet from "./Tweet";
import Retweet from "./Retweet";
import ScheduleTweet from "./ScheduleTweet";

const Home = () => {
  const [method, setMethod] = useState("Tweet");

  const functionality = ["Tweet", "Retweet", "Schedule"];

  return (
    <>
      <Logout />
      <div className=" min-h-[100vh] items-start gap-2 px-[2vw] py-[5vw]  bg-blue-400">
        <div className="mb-8 text-center">
          {functionality.map((feature, i) => (
            <span
              key={i}
              onClick={() => {
                setMethod(feature);
              }}
              style={
                feature === method
                  ? { color: "black", borderBottomColor: "black" }
                  : { color: "#60a5fa" }
              }
              className="m-2 bg-white rounded-lg font-bold p-2 border-b-4 border-white cursor-pointer"
            >
              {feature}
            </span>
          ))}
        </div>
        <div className="lg:flex justify-around">
          <div className="flex gap-2 flex-col border-2 rounded-2xl p-2">
            <h1 className="self-center text-2xl">KubeTweet</h1>
            {method === "Tweet" ? (
              <Tweet />
            ) : method === "Retweet" ? (
              <Retweet />
            ) : (
              <ScheduleTweet />
            )}

            <ToastContainer
              position="top-center"
              autoClose={2500}
              hideProgressBar={false}
              newestOnTop
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable={false}
              pauseOnHover
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
