import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import Logout from "./Logout";
import Tweet from "./Tweet";
import Retweet from "./Retweet";
import ScheduleTweet from "./ScheduleTweet";
import Thread from "./Thread";
import Follow from "./Follow";
import Reply from "./Reply";

const Home = () => {
  const [method, setMethod] = useState("Tweet");

  const featureComponent = [
    { name: "Tweet", component: <Tweet /> },
    { name: "Retweet", component: <Retweet /> },
    { name: "Schedule", component: <ScheduleTweet /> },
    { name: "Thread", component: <Thread /> },
    { name: "Follow", component: <Follow /> },
    { name: "Reply", component: <Reply /> },
  ];

  return (
    <>
      <Logout />
      <div className=" min-h-[100vh] items-start gap-2 px-[2vw] py-[5vw] bg-blue-400">
        <div className="mb-1 justify-center mt-10 flex flex-wrap">
          {featureComponent.map((feature, i) => (
            <span
              key={i}
              onClick={() => {
                setMethod(feature.name);
              }}
              style={
                feature.name === method
                  ? { color: "black", borderBottomColor: "black" }
                  : { color: "#60a5fa" }
              }
              className="m-2 text-sm bg-white rounded-lg font-bold p-2 border-b-4 border-white cursor-pointer"
            >
              {feature.name}
            </span>
          ))}
        </div>

        <div className="flex justify-center ">
          <div className=" border-2 rounded-2xl p-2 max-w-2xl">
            <h1 className="text-center mb-2 text-2xl">KubeTweet</h1>

            {featureComponent.map((feature) => (
              <div
                key={feature.name}
                className={
                  feature.name === method ? " flex flex-col gap-2" : "hidden"
                }
              >
                {feature.component}
              </div>
            ))}

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
