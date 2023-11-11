import { useState } from "react";
import { useAuthContext } from "./UseAuthContext.js";
import axios from "../axiosConfig.js";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = (email, password) => {
    setIsLoading(true);
    setError(null);

    axios
      .post("/api/user/login", { email, password })
      .then(function (response) {
        // console.log(response);
        const res = response.data;

        if (response) {
          // save the user to local storage
          localStorage.setItem("user", JSON.stringify(res));

          // update the auth context
          dispatch({ type: "LOGIN", payload: res });
        }
      })
      .catch(function (error) {
        // console.log(error);
        setIsLoading(false);
        setError(error.response.data.msg);
      })
      .finally(function () {
        setIsLoading(false);
      });
  };

  return { login, isLoading, error };
};
