import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/config.js";
import { useAuthContext } from "./useAuthContext.js";

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch, user } = useAuthContext();

  const signup = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);

    try {
      //signup
      const res = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      console.log(res.user);

      if (!res) {
        throw new Error("could not complete signup");
      }

      //add display name to user
      await res.user.updateProfile({ displayName });

      //login action dispatch
      dispatch({ type: "LOGIN", payload: res.user });

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { error, isPending, signup };
};
