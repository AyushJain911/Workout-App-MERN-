import { useState } from "react";
import { useAuthContext } from "./UseAuthContext.js";
import axios from "../axiosConfig.js";

// export const useSignup = () => {
// const [error, setError] = useState(null);
// const [isLoading, setIsLoading] = useState(null);
// const { dispatch } = useAuthContext();

// const signup = async (email, password) => {
//     setIsLoading(true);
//     setError(null);

//     const response = await fetch("http://localhost:3000/api/user/signup", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email, password }),
//     });
//     const json = await response.json();
//     console.log(response);
//     console.log(json);

//     if (!response.ok) {
//     setIsLoading(false);
//     setError(json.msg);
//     }
//     if (response.ok) {
//     // save the user to local storage
//     localStorage.setItem("user", JSON.stringify(json));

//     // update the auth context
//     dispatch({ type: "LOGIN", payload: json });

//     // update loading state
//     setIsLoading(false);
//     }
// };

// return { signup, isLoading, error };
// };

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = (email, password) => {
    setIsLoading(true);
    setError(null);

    axios
      .post("/api/user/signup", { email, password })
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
        console.log(error);
        setIsLoading(false);
        setError(error.response.data.msg);
      })
      .finally(function () {
        setIsLoading(false);
      });
  };

  return { signup, isLoading, error };
};
