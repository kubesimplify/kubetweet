import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import { supabase } from "./supabaseClient";
import Home from "./components/Home";

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <>
        {!session ? (
          <Login />
        ) : (
          <Home />
        )}
    </>
  );
}

export default App;
