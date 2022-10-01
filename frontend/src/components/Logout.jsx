import React from "react";
import { toast, ToastContainer } from "react-toastify";
import { supabase } from "../supabaseClient";

const Logout = () => {
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error(error);
    } else {
      toast.success("Successfully Logged Out!");
      console.log("logged out");
    }
  };

  return (
    <>
      <button
        onClick={handleLogout}
        className=" absolute border px-6 py-2 m-2 right-1"
      >
        Logout
      </button>
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
    </>
  );
};

export default Logout;
